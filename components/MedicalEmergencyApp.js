'use client'

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';
import { Camera, Heart, Phone, AlertTriangle, User } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

const MedicalEmergencyApp = () => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    bloodType: '',
    allergies: '',
    medications: '',
    conditions: '',
    emergencyContact: '',
    emergencyPhone: '',
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const generateQRCode = () => {
    const data = JSON.stringify(formData);
    const encodedData = encodeURIComponent(data);
    return `${window.location.origin}/profile?data=${encodedData}`;
  };

  const steps = [
    { title: 'Personal Info', icon: User },
    { title: 'Medical Info', icon: Heart },
    { title: 'Emergency Contact', icon: Phone },
    { title: 'Generate QR Code', icon: Camera },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md"
    >
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-gray-800">Medical Emergency Info</CardTitle>
          <CardDescription className="text-center text-gray-600">Your life-saving information at a scan</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between mb-6">
            {steps.map((s, index) => (
              <motion.div
                key={index}
                className={`flex flex-col items-center ${
                  index <= step ? 'text-blue-600' : 'text-gray-400'
                }`}
                whileHover={{ scale: 1.1 }}
              >
                <s.icon className="w-6 h-6 mb-1" />
                <span className="text-xs">{s.title}</span>
              </motion.div>
            ))}
          </div>
          {step === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Input
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleInputChange}
                className="mb-4"
              />
              <Input
                name="age"
                placeholder="Age"
                value={formData.age}
                onChange={handleInputChange}
                className="mb-4"
              />
              <Input
                name="bloodType"
                placeholder="Blood Type"
                value={formData.bloodType}
                onChange={handleInputChange}
                className="mb-4"
              />
            </motion.div>
          )}
          {step === 1 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Textarea
                name="allergies"
                placeholder="Allergies"
                value={formData.allergies}
                onChange={handleInputChange}
                className="mb-4"
              />
              <Textarea
                name="medications"
                placeholder="Current Medications"
                value={formData.medications}
                onChange={handleInputChange}
                className="mb-4"
              />
              <Textarea
                name="conditions"
                placeholder="Medical Conditions"
                value={formData.conditions}
                onChange={handleInputChange}
                className="mb-4"
              />
            </motion.div>
          )}
          {step === 2 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Input
                name="emergencyContact"
                placeholder="Emergency Contact Name"
                value={formData.emergencyContact}
                onChange={handleInputChange}
                className="mb-4"
              />
              <Input
                name="emergencyPhone"
                placeholder="Emergency Contact Phone"
                value={formData.emergencyPhone}
                onChange={handleInputChange}
                className="mb-4"
              />
            </motion.div>
          )}
          {step === 3 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center"
            >
              <QRCodeSVG value={generateQRCode()} size={200} className="mb-4" />
              <p className="text-sm text-gray-600 text-center">
                Scan this QR code to access your medical information in case of emergency.
              </p>
            </motion.div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => setStep(Math.max(0, step - 1))}
            disabled={step === 0}
          >
            Previous
          </Button>
          <Button
            onClick={() => setStep(Math.min(3, step + 1))}
            disabled={step === 3}
          >
            {step === 2 ? 'Generate QR Code' : 'Next'}
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default MedicalEmergencyApp;