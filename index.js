const express = require('express');
const fs = require('fs');
const app = express();
const port = 6969;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});
app.get('/login', (req, res) => {
  res.sendFile(__dirname + '/views/login.html');
})

app.get('/api/auth', (req, res) => {
 if (req.headers.authorization == "{\"username\": \"bmorris\", \"password\": \"password\"}")
 {
   res.json({
     "access_token":"Yi5tb3JyaXM6cGFzc3dvcmQ",
     "token_type":"bearer",
     "client_id":"757365726E616D653A626D6F72726973",
     "auth_type": "bmorris"
   })
 }
  else 
 {
   res.json({
     "access_token":"YmFzaWM6YmFzaWNhY2Nlc3M",
     "token_type":"bearer",
     "client_id":"757365726E616D653A6261736963",
     "auth_type": "basic"
   })
 }
})

app.listen(port, () => {
  console.log(`started on port ${port}`);
});
