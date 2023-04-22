pragma solidity ^0.8.0;

//This contract allows users to vote for a list of candidates by storing their votes in a mapping. The constructor takes an array of candidate names as an argument, which is stored in the candidateList variable.
The voteForCandidate function takes a candidate name as an argument and increments the corresponding vote count in the votesReceived mapping. The totalVotesFor function takes a candidate name as an argument and returns the total number of votes received for that candidate.
The validCandidate function checks if a candidate is valid by searching the candidateList array for a match. If the candidate is valid, it returns true; otherwise, it returns false.

contract Voting {
    mapping (bytes32 => uint256) public votesReceived;
    bytes32[] public candidateList;

    constructor(bytes32[] memory candidateNames) {
        candidateList = candidateNames;
    }

    function totalVotesFor(bytes32 candidate) view public returns (uint256) {
        require(validCandidate(candidate));
        return votesReceived[candidate];
    }

    function voteForCandidate(bytes32 candidate) public {
        require(validCandidate(candidate));
        votesReceived[candidate] += 1;
    }

    function validCandidate(bytes32 candidate) view public returns (bool) {
        for(uint i = 0; i < candidateList.length; i++) {
            if (candidateList[i] == candidate) {
                return true;
            }
        }
        return false;
    }
}
