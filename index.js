const express = require('express');
const crypto = require('crypto');
const fs = require('fs');
const app = express();
const port = 6969;
const algorithm = 'aes-256-ctr';

const basic = crypto.randomBytes(31);
const iv = crypto.randomBytes(16);
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});
app.get('/login', (req, res) => {
  res.sendFile(__dirname + '/views/login.html');
})

function encrypt(text) {
  let bmorris = crypto.randomBytes(32);
 	let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(bmorris), iv);
 	let encrypted = cipher.update(text);
 	encrypted = Buffer.concat([encrypted, cipher.final()]);
 	return encrypted.toString('hex');
}

app.get('/api/auth', (req, res) => {
 if (req.headers.authorization == "{\"username\": \"bmorris\", \"password\": \"password\"}")
 {
   res.json({
     "access_token":encrypt('bmorris-access-auth:access=admin'),
     "token_type":"bearer",
     "client_id":"757365726E616D653A626D6F72726973",
     "auth_type": "bmorris"
   })
 }
  else 
 {
   res.json({
     "access_token":encrypt('basic-access-auth:access=basic'),
     "token_type":"bearer",
     "client_id":"757365726E616D653A6261736963",
     "auth_type": "basic"
   })
 }
})

app.listen(port, () => {
  console.log(`started on port ${port}`);
});
