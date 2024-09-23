import { useState } from 'react';
import { generateMnemonic } from 'bip39';
import { SolanaWallet } from './SolanaWallet'; // Ensure correct path
import { EthWallet } from './EthWallet'; // Ensure correct path
import './web3-wallet.css';

function App() {
  const [mnemonic, setMnemonic] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(true); // Default to dark mode

  const createMnemonic = async () => {
    const mn = await generateMnemonic();
    setMnemonic(mn);
  };

  return (
    <div className={`App ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      <h1>Walley - A Web3 Based Wallet</h1>
      <button className="generate-button" onClick={createMnemonic}>
        Create Seed Phrase
      </button>
      <div className="mnemonic-container">
        <input
          type="text"
          value={mnemonic}
          readOnly
          placeholder="Your mnemonic will appear here"
          className="mnemonic-input"
        />
      </div>
      {mnemonic && (
        <>
          <div className="wallet-section">
            <h2 className="wallet-title">Solana Wallets</h2>
            <SolanaWallet mnemonic={mnemonic} />
          </div>
          <div className="wallet-section">
            <h2 className="wallet-title">Ethereum Wallets</h2>
            <EthWallet mnemonic={mnemonic} />
          </div>
        </>
      )}
      <footer className="footer">
        <p>Created by Jaspreet</p>
      </footer>
    </div>
  );
}

export default App;


