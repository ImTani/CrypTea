import React, { useState } from 'react';
import { ethers } from 'ethers';
import { motion } from 'framer-motion';
import { Button } from './ui/Button';
import { Card } from './ui/Card';
import { CONTRACT_CONFIG } from '../config/contract';
import toast from 'react-hot-toast';
import { FaLeaf } from 'react-icons/fa';

export function BuyForm({ contract }) {
  const [formData, setFormData] = useState({ name: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { name, message } = formData;
      const amount = { value: ethers.utils.parseEther(CONTRACT_CONFIG.payment.amount) };
      const transaction = await contract.buyChai(name, message, amount);
      
      toast.promise(transaction.wait(), {
        loading: 'Steeping your tea...',
        success: 'Thank you for your support! 🍵',
        error: 'Transaction failed. Please try again.'
      });

      await transaction.wait();
      setFormData({ name: '', message: '' });
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="max-w-md mx-auto">
      <div className="flex items-center justify-center mb-6">
        <FaLeaf className="text-4xl text-primary-500" />
      </div>
      <motion.form
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onSubmit={handleSubmit}
        className="space-y-6"
      >
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            required
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Message
          </label>
          <textarea
            id="message"
            value={formData.message}
            onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            required
          />
        </div>

        <Button
          type="submit"
          isLoading={isSubmitting}
          disabled={!contract}
          className="w-full"
        >
          Send {CONTRACT_CONFIG.payment.amount} {CONTRACT_CONFIG.payment.currency} Tea
        </Button>
      </motion.form>
    </Card>
  );
}