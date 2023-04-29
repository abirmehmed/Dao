import React, { useState, useEffect } from 'react';
import './App.css';
import Web3 from 'web3';

const web3 = new Web3(Web3.givenProvider);
const daoAddress = '<DAO_CONTRACT_ADDRESS>';
const daoABI = <DAO_CONTRACT_ABI>;
const DAO = new web3.eth.Contract(daoABI, daoAddress);

function App() {
    const [proposals, setProposals] = useState([]);
    const [error, setError] = useState(null);

    async function getProposals() {
        try {
            const accounts = await web3.eth.getAccounts();
            if (accounts.length === 0) {
                setError('Please connect your Ethereum wallet.');
                return;
            }
            const numProposals = await DAO.methods.numProposals().call();
            const proposals = [];
            for (let i = 1; i <= numProposals; i++) {
                const proposal = await DAO.methods.proposals(i).call();
                proposals.push(proposal);
            }
            setProposals(proposals);
        } catch (err) {
            setError(err.message);
        }
    }

    useEffect(() => {
        getProposals();
    }, []);

    return (
        <div>
            {error && <p>{error}</p>}
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
