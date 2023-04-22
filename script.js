// connect to the blockchain
const web3 = new Web3('http://localhost:7545');
const contractAddress = '0x...'; // replace with the deployed contract address
const contractABI = [...]; // replace with the contract ABI

// initialize contract
const votingContract = new web3.eth.Contract(contractABI, contractAddress);

// get candidate names
async function getCandidates() {
  const candidateNames = await votingContract.methods.getCandidateList().call();
  return candidateNames;
}

// display candidate names on page
async function displayCandidates() {
  const candidateList = document.getElementById('candidateList');
  const candidates = await getCandidates();
  for (let i = 0; i < candidates.length; i++) {
    const candidate = candidates[i];
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(candidate));
    candidateList.appendChild(li);
  }
}

// listen for vote button clicks
document.getElementById('voteButton').addEventListener('click', async function() {
  const candidateName = document.getElementById('candidateName').value;
  const account = (await web3.eth.getAccounts())[0];
  const vote = await votingContract.methods.voteForCandidate(candidateName).send({from: account});
  console.log(vote);
  alert(`Successfully voted for ${candidateName}!`);
});

// display candidates on page load
displayCandidates();
