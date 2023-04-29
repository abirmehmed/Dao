// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

contract DAO {
    struct Proposal {
        uint id;
        string description;
        uint voteCount;
        mapping(address => bool) voted;
    }

    mapping(address => bool) public members;
    mapping(uint => Proposal) public proposals;
    uint public numProposals;

    constructor() {
        members[msg.sender] = true;
    }

    function addMember(address _member) public {
        require(members[msg.sender], "Only members can add new members.");
        members[_member] = true;
    }

    function removeMember(address _member) public {
        require(members[msg.sender], "Only members can remove members.");
        require(_member != msg.sender, "Cannot remove self.");
        members[_member] = false;
    }

    function addProposal(string memory _description) public {
        require(members[msg.sender], "Only members can add proposals.");
        numProposals++;
        proposals[numProposals] = Proposal(numProposals, _description, 0);
    }

    function vote(uint _proposalId) public {
        require(members[msg.sender], "Only members can vote.");
        require(!proposals[_proposalId].voted[msg.sender], "Member has already voted on this proposal.");
        proposals[_proposalId].voteCount++;
        proposals[_proposalId].voted[msg.sender] = true;
    }
}
