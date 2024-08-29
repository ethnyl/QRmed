'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { FaUser, FaHeartbeat, FaAllergies, FaPills, FaPhoneAlt } from 'react-icons/fa'
import QRCode from 'qrcode.react'

export default function CreateProfile() {
  const [step, setStep] = useState(0)
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    bloodType: '',
    allergies: '',
    medications: '',
    conditions: '',
    emergencyContact: '',
    emergencyPhone: '',
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setStep(3) // Move to QR code generation step
  }

  const generateQRCode = () => {
    const data = JSON.stringify(formData)
    return `${window.location.origin}/profile?data=${encodeURIComponent(data)}`
  }

  const steps = [
    { icon: FaUser, title: "Personal Info" },
    { icon: FaHeartbeat, title: "Medical Info" },
    { icon: FaPhoneAlt, title: "Emergency Contact" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-accent to-secondary p-4">
      <motion.div
        className="max-w-2xl mx-auto glass-effect p-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-4xl font-bold text-white mb-6 text-center">Create Your Medical Profile</h2>
        
        {step < 3 && (
          <div className="flex justify-between mb-8">
            {steps.map((s, index) => (
              <div key={index} className={`flex flex-col items-center ${index <= step ? 'text-white' : 'text-white opacity-50'}`}>
                <s.icon className="text-2xl mb-2" />
                <span className="text-sm">{s.title}</span>
              </div>
            ))}
          </div>
        )}

        {step === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <input name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} className="input-field mb-4" required />
            <input name="age" placeholder="Age" type="number" value={formData.age} onChange={handleChange} className="input-field mb-4" required />
            <select name="bloodType" value={formData.bloodType} onChange={handleChange} className="input-field mb-4" required>
              <option value="">Select Blood Type</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
          </motion.div>
        )}

        {step === 1 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <textarea name="allergies" placeholder="Allergies" value={formData.allergies} onChange={handleChange} className="input-field mb-4" rows="3" />
            <textarea name="medications" placeholder="Current Medications" value={formData.medications} onChange={handleChange} className="input-field mb-4" rows="3" />
            <textarea name="conditions" placeholder="Medical Conditions" value={formData.conditions} onChange={handleChange} className="input-field mb-4" rows="3" />
          </motion.div>
        )}

        {step === 2 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <input name="emergencyContact" placeholder="Emergency Contact Name" value={formData.emergencyContact} onChange={handleChange} className="input-field mb-4" required />
            <input name="emergencyPhone" placeholder="Emergency Contact Phone" value={formData.emergencyPhone} onChange={handleChange} className="input-field mb-4" required />
          </motion.div>
        )}

        {step === 3 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="text-center">
            <h3 className="text-2xl font-bold text-white mb-4">Your MediSafe QR Code</h3>
            <div className="bg-white p-4 rounded-lg inline-block mb-4">
              <QRCode value={generateQRCode()} size={200} />
            </div>
            <p className="text-white mb-4">Scan this QR code to access your medical profile in case of emergency.</p>
            <button onClick={() => window.print()} className="btn-secondary">Print QR Code</button>
          </motion.div>
        )}

        {step < 3 && (
          <div className="flex justify-between mt-8">
            <button
              onClick={() => setStep(Math.max(0, step - 1))}
              className={`btn-secondary ${step === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={step === 0}
            >
              Previous
            </button>
            <button
              onClick={step === 2 ? handleSubmit : () => setStep(step + 1)}
              className="btn-primary"
            >
              {step === 2 ? 'Generate QR Code' : 'Next'}
            </button>
          </div>
        )}
      </motion.div>
    </div>
  )
}