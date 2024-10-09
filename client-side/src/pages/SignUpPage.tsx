import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputField from '../components/InputField';
import Button from '../components/Button';
import AuthFormContainer from '../components/AuthFormContainer';
import Footer from '../components/Footer';
import authService from '../services/auth.service';
import { ApiError } from '../types/ApiType';
import { SignUpData } from '../types/auths';

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<SignUpData>({
    first_name: '',
    last_name: '',
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState<Partial<Record<keyof SignUpData, string>>>({});
  const [generalError, setGeneralError] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Nouvel état pour le chargement

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev: SignUpData) => ({
      ...prev,
      [name]: value
    }));
    if (errors[name as keyof SignUpData]) {
      setErrors((prev: Partial<Record<keyof SignUpData, string>>) => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSignUp = async () => {
    setIsLoading(true); // Démarre le chargement
    try {
      await authService.signUp(formData);
      navigate('/signup-success');
    } catch (err) {
      const apiError = err as ApiError;
      if (apiError.response?.data?.errors) {
        setErrors(apiError.response.data.errors);
      } else {
        setGeneralError(
          apiError.response?.data?.message || 
          apiError.response?.data?.detail || 
          'An error occurred during sign up'
        );
      }
    } finally {
      setIsLoading(false); // Fin du chargement
    }
  };

  const inputFields = [
    { label: 'First Name', type: 'text', name: 'first_name', value: formData.first_name, placeholder: 'Enter your first name' },
    { label: 'Last Name', type: 'text', name: 'last_name', value: formData.last_name, placeholder: 'Enter your last name' },
    { label: 'Email', type: 'email', name: 'email', value: formData.email, placeholder: 'Enter your email' },
    { label: 'Password', type: 'password', name: 'password', value: formData.password, placeholder: 'Enter your password' }
  ];

  return (
    <div>
      <AuthFormContainer
        title="Create an Account"
        footerText="Already have an account?"
        footerLink="/signin"
        footerLinkText="Sign In"
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
            error={errors[field.name as keyof SignUpData]}
          />
        ))}
        <Button text="Sign Up" onClick={handleSignUp} isLoading={isLoading} />
      </AuthFormContainer>
      <Footer />
    </div>
  );
};

export default SignUp;
