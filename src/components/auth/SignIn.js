import React, { useEffect } from 'react';
import { startFirebaseUI, auth } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';

const SignIn = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, redirect to the home page or dashboard
        navigate('/');
      }
    });

    startFirebaseUI('#firebaseui-auth-container');

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [navigate]);

  return (
    <div>
      <h2 className="text-center text-2xl font-bold mb-10">Sign In</h2>
      <div id="firebaseui-auth-container"></div>
    </div>
  );
};

export default SignIn;