'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { FaUser, FaHeartbeat, FaAllergies, FaPills, FaPhoneAlt } from 'react-icons/fa'

export default function Profile() {
  const [profileData, setProfileData] = useState(null)

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const data = urlParams.get('data')
    if (data) {
      setProfileData(JSON.parse(decodeURIComponent(data)))
    }
  }, [])

  if (!profileData) {
    return <div className="min-h-screen bg-gradient-to-br from-primary via-accent to-secondary flex items-center justify-center text-white text-2xl">Loading...</div>
  }

  const sections = [
    { icon: FaUser, title: "Personal Information", fields: ['name', 'age', 'bloodType'] },
    { icon: FaHeartbeat, title: "Medical Information", fields: ['conditions'] },
    { icon: FaAllergies, title: "Allergies", fields: ['allergies'] },
    { icon: FaPills, title: "Medications", fields: ['medications'] },
    { icon: FaPhoneAlt, title: "Emergency Contact", fields: ['emergencyContact', 'emergencyPhone'] },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-accent to-secondary p-4">
      <motion.div
        className="max-w-2xl mx-auto glass-effect p-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold text-white mb-8 text-center">Emergency Medical Profile</h1>
        
        {sections.map((section, index) => (
          <motion.div
            key={section.title}
            className="mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
          >
            <h2 className="text-2xl font-semibold mb-3 flex items-center text-white">
              <section.icon className="mr-2" />
              {section.title}
            </h2>
            {section.fields.map((field) => (
              <p key={field} className="text-white mb-2">
                <span className="font-medium">{field.charAt(0).toUpperCase() + field.slice(1)}:</span>{' '}
                <span>{profileData[field] || 'N/A'}</span>
              </p>
            ))}
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}