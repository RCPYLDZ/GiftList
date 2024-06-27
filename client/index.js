const axios = require('axios');
const niceList = require('../utils/niceList.json');
const MerkleTree = require('../utils/MerkleTree');

const serverUrl = 'http://localhost:1225';

async function main() {
  const merkleTree = new MerkleTree(niceList);
  //Valid name example
  const name = 'RCPYLDZ';
  let proof = await getProof(merkleTree,name);

  const { data: gift } = await axios.post(`${serverUrl}/gift`, {
    proof,
    name,
  });

  console.log({ gift });

  //invalid name example
  const invalidName = 'Test123';
  proof = await getProof(merkleTree,invalidName);

  const { data: gift1 } = await axios.post(`${serverUrl}/gift`, {
    proof,
    name: invalidName,
  });

  console.log({ gift1 });


}

async function getProof(merkleTree,name){
  const index = niceList.findIndex(n => n === name);
  return merkleTree.getProof(index);
}

main();
