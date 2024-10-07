import React, { useState } from 'react';
import InputField from '../components/InputField';
import Button from '../components/Button';
import AuthFormContainer from '../components/AuthFormContainer';
import Footer from '../components/Footer';

const SignIn: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = () => {
    // Envoyer les données vers l'API
    console.log({ email, password });
  };

  return (
    <div>
        <AuthFormContainer
      title="Sign In"
      footerText="Don't have an account?"
      footerLink="/signup"
      footerLinkText="Sign Up"
    >
      <InputField label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <InputField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <Button text="Sign In" onClick={handleSignIn} />
    </AuthFormContainer>
    <Footer />
    </div>
    
  );
};

export default SignIn;
