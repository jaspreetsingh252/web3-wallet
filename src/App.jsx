import { useState } from 'react';
import { generateMnemonic } from 'bip39';
import { SolanaWallet } from './SolanaWallet'; // Ensure correct path
import { EthWallet } from './EthWallet'; // Ensure correct path
import './web3-wallet.css';

function App() {
  const [mnemonic, setMnemonic] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);

  const createMnemonic = async () => {
    const mn = await generateMnemonic();
    setMnemonic(mn);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`App ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      <h1>Web3 Wallet</h1>
      <button className="generate-button" onClick={createMnemonic}>
        Create Seed Phrase
      </button>
      <button className="theme-toggle-button" onClick={toggleTheme}>
        Toggle Theme
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
            <h2>Solana Wallets</h2>
            <SolanaWallet mnemonic={mnemonic} />
          </div>
          <div className="wallet-section">
            <h2>Ethereum Wallets</h2>
            <EthWallet mnemonic={mnemonic} />
          </div>
        </>
      )}
      <footer className="footer">
        <p>Designed by Jaspreet Singh</p>
      </footer>
    </div>
  );
}

export default App;





