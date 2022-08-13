import express from 'express';
import data from './data.js';
import uuidAPIKey from 'uuid-apikey';

const app = express();
let port = process.env.port || 3000;

const key = {
  uuid: 'cd6555b0-8e71-4e91-8f63-8a98acf2e181'
}
app.get('/api/user/:apikey/:category', async (req, res) => {
    let{ apikey, category } = req.params;
    if(!uuidAPIKey.isAPIKey(apikey) || !uuidAPIKey.check(apikey, key.uuid)){
      res.send("API key is not valid");
    } else{
      const chosenData = data.filter(dat => dat.categoryNum == category);
      res.send(chosenData);
    }
});

app.get('/api/user/:apikey/detail/:id', async (req, res) => {
  let{ apikey, id } = req.params;
  if(!uuidAPIKey.isAPIKey(apikey) || !uuidAPIKey.check(apikey, key.uuid)){
    res.send("API key is not valid");
  } else{
    const chosenData = data.filter(dat => dat.id == id);
    res.send(chosenData);
  }
});

const server = app.listen(port, () => {
    console.log(`server on localhost:${port}/api/user/`);
});