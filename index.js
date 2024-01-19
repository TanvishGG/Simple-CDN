const express = require('express');
const config = require('./config');
const  {Generator}= require('snowflake-generator');
const fs  = require('fs');
const app = express();

// Upload Files
app.post('/upload/:name', async (req,res) => {
  try {
  var name = req.params?.name ?? null;
  let snowflake = new Generator().generate(); // Generate a unique snowflake ID.
  const file = await req.toArray();
  const buffer = Buffer.from(file[0]);
  if(name) {
  const sameNameCount =  fs.readdirSync(config.filesPath).filter((file) => file.startsWith(name))
    if(sameNameCount.length > 0) {
     name = snowflake + '.' + name.split('.').slice(1).join('.');
    }
  }
  else {
    name = `${snowflake}`
  }
  fs.writeFileSync(config.filesPath + name,buffer);
  res.send(JSON.stringify({status: 'ok', filename: name, buffer: buffer }));
} 
catch(err) {
  res.send(JSON.stringify({status: 'error', message: err}))
}
})

// Delete files
app.delete('/delete/:name', async (req,res) => {
  try {
    fs.unlinkSync(config.filesPath + req.params.name);
  }
  catch(e) {
    res.send(JSON.stringify({status: 'error', message:'File Not Found'}))
  }
})

// Serve files 
app.use('/view/',express.static(config.filesPath))

// Start the express server
app.listen(config.port ?? 8080, () => {
    console.log('Server is running on port ' + config.port ?? 8080)
})

// Handle 404
app.use((req,res) => {

  res.status(404).send({status:'error', message: 'Not Found'})
})