import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputField from '../components/InputField';
import Button from '../components/Button';
import AuthFormContainer from '../components/AuthFormContainer';
import Footer from '../components/Footer';
import authService from '../services/auth.service';
import { ApiError } from '../types/ApiType';
import { SignInData } from '../types/auths';
import { useAuth } from '../context/AuthContext';

const SignIn: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState<SignInData>({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState<Partial<Record<keyof SignInData, string>>>({});
  const [generalError, setGeneralError] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Ajout du chargement

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev: SignInData) => ({
      ...prev,
      [name]: value
    }));
    if (errors[name as keyof SignInData]) {
      setErrors((prev: Partial<Record<keyof SignInData, string>>) => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSignIn = async () => {
    setIsLoading(true); // Commence le chargement
    try {
      const response = await authService.signIn(formData);
      login(response.data.access);
      navigate('/jobs');
    } catch (err) {
      const apiError = err as ApiError;
      if (apiError.response?.data?.errors) {
        setErrors(apiError.response.data.errors);
      } else {
        setGeneralError(
          apiError.response?.data?.message || 
          apiError.response?.data?.detail || 
          'Invalid credentials'
        );
      }
    } finally {
      setIsLoading(false); // Fin du chargement
    }
  };

  const inputFields = [
    { label: 'Email', type: 'email', name: 'email', value: formData.email, placeholder: 'Enter your email' },
    { label: 'Password', type: 'password', name: 'password', value: formData.password, placeholder: 'Enter your password' }
  ];

  return (
    <div>
      <AuthFormContainer
        title="Sign In"
        footerText="Don't have an account?"
        footerLink="/signup"
        footerLinkText="Sign Up"
      >
        {generalError && <div className="text-red-500 mb-4">{generalError}</div>}
        {inputFields.map(field => (
          <InputField
            key={field.name}
            label={field.label}
            type={field.type}
            name={field.name}
            value={field.value}
            placeholder={field.placeholder}
            onChange={handleInputChange}
            error={errors[field.name as keyof SignInData]}
          />
        ))}
        <Button text="Sign In" onClick={handleSignIn} isLoading={isLoading} />
      </AuthFormContainer>
      <Footer />
    </div>
  );
};

export default SignIn;