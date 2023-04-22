let candidates = [];

function addCandidate() {
  let candidateName = document.getElementById("candidate-name").value;
  candidates.push(candidateName);
  let candidateList = document.getElementById("candidate-list");
  let candidateEntry = document.createElement("li");
  candidateEntry.appendChild(document.createTextNode(candidateName));
  candidateList.appendChild(candidateEntry);
}
