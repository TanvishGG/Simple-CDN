const express = require('express');
const config = require('./config');
const  {Generator}= require('snowflake-generator');
const fs  = require('fs');
const app = express();
app.post('/upload/:name', async (req,res) => {
  const snowflake  = new Generator().generate();
  const name =  snowflake + '.' + req.params.name.split('.')[1]
  const file = await req.toArray()
  const buffer = Buffer.from(file[0])
  fs.writeFileSync(config.filesPath + name,buffer)
  res.send(JSON.stringify({status: 'ok', filename: name, buffer: buffer }))
})
app.use(express.static(config.filesPath))
app.listen(config.port, () => {
    console.log('Server is running on port ' + config.port)
})

fetch('http://localhost:8080/upload/config.js', {
    method: 'POST',
    body: Buffer.from(require('fs').readFileSync('config.js')),
   // headers: {
   //   'Content-Type': 'application/octet-stream'
   // }
}).then(res => res.json().then((x) => console.log(x)))