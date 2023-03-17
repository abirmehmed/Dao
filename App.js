import React, { useState } from 'react';
import Web3 from 'web3';

const web3 = new Web3(Web3.givenProvider);
const daoAddress = '<DAO_CONTRACT_ADDRESS>';
const daoABI = <DAO_CONTRACT_ABI>;
const DAO = new web3.eth.Contract(daoABI, daoAddress);
function App() {
    const [proposals, setProposals] = useState([]);
    async function getProposals() {
        const numProposals = await DAO.methods.numProposals().call();
        const proposals = [];
        for (let i = 1; i <= numProposals; i++) {
            const proposal = await DAO.methods.proposals(i).call();
            proposals.push(proposal);
        }
        setProposals(proposals);
    }
    return (
        <div>
            <button onClick={getProposals}>Get Proposals</button>
            <ul>
                {proposals.map(proposal => (
                    <li key={proposal.id}>
                        {proposal.description} ({proposal.voteCount} votes)
                    </li>
                ))}
            </ul>
        </div>
    );
}
export default App;
