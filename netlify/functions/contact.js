// Receives a form submission and forwards it to Web3Forms server-side, attaching
// the access key from the WEB3FORMS_ACCESS_KEY env var. Free spam protection:
// origin allow-list + honeypot + basic email validation. The browser never sees
// the key. Handles JSON submissions (Contact form) and multipart submissions
// (Quote form, which includes a file upload). Runtime: Node 18+ (global fetch).

var ALLOWED_ORIGINS = [
  'https://tabservicesco.netlify.app',
  'https://www.tabservicesco.com',
  'https://tabservicesco.com'
];

var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

exports.handler = async function (event) {
  if (event.httpMethod !== 'POST') {
    return json(405, { success: false, message: 'Method not allowed.' });
  }

  // 1. Origin check (free "domain restriction")
  var origin = header(event, 'origin');
  var referer = header(event, 'referer');
  var fromAllowedSite = ALLOWED_ORIGINS.some(function (o) {
    return origin === o || referer === o || referer.indexOf(o + '/') === 0;
  });
  if (!fromAllowedSite) {
    return json(403, { success: false, message: 'Forbidden.' });
  }

  var accessKey = process.env.WEB3FORMS_ACCESS_KEY;
  if (!accessKey) {
    return json(500, { success: false, message: 'Form is not configured yet. Please email us directly.' });
  }

  var contentType = header(event, 'content-type').toLowerCase();

  // ---- Multipart (Quote form with file upload): inject the key, pass through ----
  if (contentType.indexOf('multipart/form-data') !== -1) {
    var bMatch = header(event, 'content-type').match(/boundary=(?:"([^"]+)"|([^;]+))/i);
    if (!bMatch) return json(400, { success: false, message: 'Invalid submission.' });
    var boundary = (bMatch[1] || bMatch[2]).trim();

    var raw = Buffer.from(event.body || '', event.isBase64Encoded ? 'base64' : 'utf8').toString('latin1');

    // 2. Honeypot — hidden checkbox only a bot would send; fake success, send nothing
    var hp = raw.match(/name="botcheck"\r?\n\r?\n([^\r\n]*)/i);
    if (hp && hp[1].trim() !== '') {
      return json(200, { success: true, message: 'Thank you.' });
    }
    // 3. Require a valid-looking email somewhere in the submission
    if (!/[^\s@"]+@[^\s@"]+\.[^\s@"]+/.test(raw)) {
      return json(400, { success: false, message: 'Please provide a valid email address.' });
    }

    var closing = '--' + boundary + '--';
    var closeIdx = raw.lastIndexOf(closing);
    if (closeIdx === -1) return json(400, { success: false, message: 'Invalid submission.' });
    var keyPart = '--' + boundary + '\r\n'
      + 'Content-Disposition: form-data; name="access_key"\r\n\r\n'
      + accessKey + '\r\n';
    var newBody = raw.slice(0, closeIdx) + keyPart + closing + '\r\n';

    return await forward(header(event, 'content-type'), Buffer.from(newBody, 'latin1'));
  }

  // ---- JSON / urlencoded (Contact form) ----
  var fields;
  try {
    if (contentType.indexOf('application/x-www-form-urlencoded') !== -1) {
      fields = {};
      new URLSearchParams(event.body || '').forEach(function (value, key) { fields[key] = value; });
    } else {
      fields = JSON.parse(event.body || '{}');
    }
  } catch (e) {
    return json(400, { success: false, message: 'Invalid submission.' });
  }

  // 2. Honeypot
  if (fields.botcheck) {
    return json(200, { success: true, message: 'Thank you.' });
  }

  // 3. Basic validation — find an email among the fields (field names vary per form)
  var email = fields.email || fields.Email || '';
  if (!email) {
    for (var k in fields) {
      if (EMAIL_RE.test(String(fields[k]).trim())) { email = fields[k]; break; }
    }
  }
  if (!EMAIL_RE.test(String(email).trim())) {
    return json(400, { success: false, message: 'Please provide a valid email address.' });
  }

  // Client must never set the key itself
  delete fields.access_key;
  var payload = Object.assign({}, fields, { access_key: accessKey });

  return await forward('application/json', JSON.stringify(payload));
};

async function forward(contentType, body) {
  try {
    var res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': contentType, 'Accept': 'application/json' },
      body: body
    });
    var data = await res.json();
    return json(res.status, data);
  } catch (e) {
    return json(502, { success: false, message: 'Could not reach the mail service. Please try again.' });
  }
}

function header(event, name) {
  var h = event.headers || {};
  return h[name] || h[name.toLowerCase()] || h[name.toUpperCase()] || '';
}

function json(statusCode, body) {
  return {
    statusCode: statusCode,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  };
}
