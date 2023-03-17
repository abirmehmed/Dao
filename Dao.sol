// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.5.0;
contract DAO {
    struct Proposal {
        uint id;
        string description;
        uint voteCount;
    }
    mapping(address => bool) public members;
    mapping(uint => Proposal) public proposals;
    uint public numProposals;
    constructor() public {
        members[msg.sender] = true;
    }
    function addProposal(string memory _description) public {
        require(members[msg.sender], "Only members can add proposals.");
        numProposals++;
        proposals[numProposals] = Proposal(numProposals, _description, 0);
    }
    function vote(uint _proposalId) public {
        require(members[msg.sender], "Only members can vote.");
        proposals[_proposalId].voteCount++;
    }
}
