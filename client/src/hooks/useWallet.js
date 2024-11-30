import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { CONTRACT_CONFIG } from '../config/contract';
import contractABI from '../contracts/chai.json';

export function useWallet() {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null
  });
  const [account, setAccount] = useState('Not connected');
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState(null);

  const connectWallet = async () => {
    setIsConnecting(true);
    setError(null);
    
    try {
      const { ethereum } = window;
      const accounts = await ethereum.request({
        method: "eth_requestAccounts"
      });
      
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        CONTRACT_CONFIG.address,
        contractABI.abi,
        signer
      );

      setAccount(accounts[0]);
      setState({ provider, signer, contract });
      
      ethereum.on("accountsChanged", () => {
        window.location.reload();
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setIsConnecting(false);
    }
  };

  return {
    ...state,
    account,
    isConnecting,
    error,
    connectWallet
  };
}