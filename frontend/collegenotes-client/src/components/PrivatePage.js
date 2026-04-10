import React from 'react';
import { Navigate } from 'react-router-dom';

/*
Ye component check karega ki user logged in hai ya nahi.
Hum yahan localStorage mein 'token' check kar rahe hain.
Aap 'token' ki jagah woh key istemaal karein jo aapne 
login successful hone par save karwayi hai.
*/
const PrivatePage = ({ children }) => {
  
  const isLoggedIn = localStorage.getItem('token'); // Check kar rahe hain ki token hai ya nahi

  if (isLoggedIn) {
    // Agar logged in hai, toh baccho ko (children) render karo
    // (Jaise DashboardPage, UploadNotesPage, etc.)
    return children;
  } else {
    // Agar logged in nahi hai, toh /login page par redirect kar do
    return <Navigate to="/login" replace />;
  }
};

export default PrivatePage;