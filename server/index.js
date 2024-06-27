const express = require('express');
const verifyProof = require('../utils/verifyProof');

const port = 1225;

const app = express();
app.use(express.json());

// paste the hex string in here, without the 0x prefix
const MERKLE_ROOT = 'ca7ea102c51e8ac62e93f091d0005c9140ef1ba1153b9ebde5e270184d96480e';

app.post('/gift', (req, res) => {
  // grab the parameters from the front-end here
  const {proof, name} = req.body;

  // TODO: prove that a name is in the list
  if(!proof || !name){
    res.send("Not enough parameters supplied. You should provide name and proof.");
  }
  const isInTheList = verifyProof(proof, name, MERKLE_ROOT) ;
  if(isInTheList) {
    res.send("You got a toy robot!");
  }
  else {
    res.send("You are not on the list :(");
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
