import React, { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { motion } from 'framer-motion';
import { useWallet } from './hooks/useWallet';
import { BuyForm } from './components/BuyForm';
import { MessageList } from './components/MessageList';
import { Button } from './components/ui/Button';
import { FaLeaf } from 'react-icons/fa';

function App() {
  const { account, contract, isConnecting, error, connectWallet } = useWallet();
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadMessages = async () => {
      if (contract) {
        try {
          const memos = await contract.getMemos();
          setMessages(memos);
        } catch (err) {
          console.error('Failed to load messages:', err);
        } finally {
          setIsLoading(false);
        }
      }
    };

    loadMessages();
  }, [contract]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Toaster position="top-right" />
      
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-4"
            >
              <div className="text-primary-500 text-2xl">
                <FaLeaf />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">CrypTea</h1>
            </motion.div>

            <Button
              onClick={connectWallet}
              isLoading={isConnecting}
              variant="secondary"
            >
              {account === 'Not connected' ? 'Connect Wallet' : `Connected: ${account.slice(0, 6)}...${account.slice(-4)}`}
            </Button>
          </div>
        </div>
      </header>

      <div 
        className="w-full h-64 bg-cover bg-center"
        style={{ 
          backgroundImage: 'url("https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80")',
          backgroundPosition: 'center 60%'
        }}
      >
        <div className="w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-center text-white">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Support Creators with Tea</h2>
            <p className="text-xl md:text-2xl">Every cup makes a difference</p>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-12">
          <section>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center space-y-4 mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                Send a Virtual Cup of Tea
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Your support helps creators keep steeping amazing content!
              </p>
            </motion.div>

            <BuyForm contract={contract} />
          </section>

          <section>
            <MessageList messages={messages} />
          </section>
        </div>
      </main>
    </div>
  );
}

export default App;