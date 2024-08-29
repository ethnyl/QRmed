'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Heart, QrCode, Shield } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex flex-col items-center justify-center p-4 text-white">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        <Heart className="w-24 h-24 mx-auto mb-8 text-red-400" />
        <h1 className="text-6xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500">
          MediSafe QR
        </h1>
        <p className="text-xl mb-8 max-w-md mx-auto">
          Your lifeline in emergencies. Create a QR code with your vital medical information.
        </p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="flex space-x-4"
      >
        <Link href="/create-profile" className="flex items-center bg-white text-purple-600 px-6 py-3 rounded-full font-bold text-lg hover:bg-opacity-90 transition duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
          <QrCode className="w-6 h-6 mr-2" />
          Create Your MediSafe QR
        </Link>
        <Link href="#how-it-works" className="flex items-center bg-transparent border-2 border-white text-white px-6 py-3 rounded-full font-bold text-lg hover:bg-white hover:text-purple-600 transition duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
          <Shield className="w-6 h-6 mr-2" />
          How It Works
        </Link>
      </motion.div>
    </div>
  )
}