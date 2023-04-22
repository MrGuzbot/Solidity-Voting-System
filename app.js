// Set up the web3 provider
const web3Provider = new Web3.providers.HttpProvider("http://127.0.0.1:8545");
const web3 = new Web3(web3Provider);

// Set up the contract instance
const contractAddress = "0x123456...";
const contractAbi = [/* ABI of the contract */];
const contract = new web3.eth.Contract(contractAbi, contractAddress);

// Handle form submission
document.querySelector("form").addEventListener("submit", async (event) => {
  event.preventDefault();

  const candidate = event.target.elements.candidate.value;
  const votes = parseInt(event.target.elements.votes.value);

  // Call the contract method to add a new candidate
  await contract.methods.addCandidate(candidate, votes).send({ from: /* sender address */ });

  // Clear the form
  event.target.reset();

  // Update the candidate list
  updateCandidateList();
});

// Update the candidate list
async function updateCandidateList() {
  const candidateList = document.querySelector("ul");

  // Clear the current list of candidates
  while (candidateList.firstChild) {
    candidateList.removeChild(candidateList.firstChild);
  }

  // Get the list of candidates from the contract
  const candidates = await contract.methods.getCandidates().call();

  // Add each candidate to the list
  for (const candidate of candidates) {
    const li = document.createElement("li");
    li.innerHTML = `<span>${candidate.name}</span> - ${candidate.votes} votes <button data-candidate="${candidate.name}">Vote</button>`;
    candidateList.appendChild(li);
  }

  // Add event listeners for the Vote buttons
  const voteButtons = document.querySelectorAll("li button");
  for (const button of voteButtons) {
    button.addEventListener("click", async (event) => {
      const candidateName = event.target.dataset.candidate;

      // Call the contract method to vote for the candidate
      await contract.methods.voteForCandidate(candidateName).send({ from: /* sender address */ });

      // Update the candidate list
      updateCandidateList();
    });
  }
}

// Update the candidate list when the page loads
updateCandidateList();
