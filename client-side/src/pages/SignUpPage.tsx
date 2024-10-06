import React, { useState } from 'react';
import InputField from '../components/InputField';
import Button from '../components/Button';
import AuthFormContainer from '../components/AuthFormContainer';
import Footer from '../components/Footer';

const SignUp: React.FC = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = () => {
    // Envoyer les données vers l'API
    console.log({ firstName, lastName, email, password });
  };

  return (
    <div>
        <AuthFormContainer
      title="Create an Account"
      footerText="Already have an account?"
      footerLink="/signin"
      footerLinkText="Sign In"
    >
      <InputField label="First Name" type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
      <InputField label="Last Name" type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
      <InputField label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <InputField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <Button text="Sign Up" onClick={handleSignUp} />
    </AuthFormContainer>
    <Footer />
    </div>
    
  );
};

export default SignUp;
