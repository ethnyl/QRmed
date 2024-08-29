'use client'

import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Phone, AlertTriangle, User } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const ProfilePage = ({ data }) => {
  const profileData = data ? JSON.parse(decodeURIComponent(data)) : null;

  if (!profileData) {
    return <div>Loading...</div>;
  }

  const sections = [
    { title: 'Personal Information', icon: User, fields: ['name', 'age', 'bloodType'] },
    { title: 'Medical Information', icon: Heart, fields: ['allergies', 'medications', 'conditions'] },
    { title: 'Emergency Contact', icon: Phone, fields: ['emergencyContact', 'emergencyPhone'] },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-2xl"
    >
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center text-red-800 flex items-center justify-center">
            <AlertTriangle className="w-8 h-8 mr-2 text-red-600" />
            Medical Emergency Profile
          </CardTitle>
        </CardHeader>
        <CardContent>
          {sections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="mb-6"
            >
              <h2 className="text-xl font-semibold mb-3 flex items-center text-gray-800">
                <section.icon className="w-6 h-6 mr-2 text-red-600" />
                {section.title}
              </h2>
              {section.fields.map((field) => (
                <p key={field} className="mb-2">
                  <span className="font-medium text-gray-700">{field.charAt(0).toUpperCase() + field.slice(1)}:</span>{' '}
                  <span className="text-gray-600">{profileData[field] || 'N/A'}</span>
                </p>
              ))}
            </motion.div>
          ))}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ProfilePage;