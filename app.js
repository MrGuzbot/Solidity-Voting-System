window.addEventListener('load', function() {
  // Connect to the Ethereum network using MetaMask
  if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
  } else {
    alert("Please install MetaMask to use this dApp!");
  }

  // Get the contract instance
  const contractAddress = "CONTRACT_ADDRESS_GOES_HERE";
  const contractABI = ABI_GOES_HERE;
  const contract = new web3.eth.Contract(contractABI, contractAddress);

  // Listen for form submissions
  const form = document.getElementById("voting-form");
  form.addEventListener('submit', function(event) {
    event.preventDefault();
    const candidate1 = document.getElementById("candidate1").value;
    const candidate2 = document.getElementById("candidate2").value;
    const account = web3.eth.accounts[0];

    // Submit the vote transaction
    contract.methods.vote(candidate1, candidate2).send({from: account})
      .then(function() {
        alert("Vote submitted successfully!");
      })
      .catch(function(error) {
        alert("Vote submission failed: " + error);
      });
  });
});
