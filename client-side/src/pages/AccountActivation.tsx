import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import authService from '../services/auth.service';

const AccountActivation: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');

  useEffect(() => {
    const activateAccount = async () => {
      const uid = searchParams.get('uid');
      const token = searchParams.get('token');

      if (!uid || !token) {
        setStatus('error');
        return;
      }

      try {
        await authService.activate({ uid, token });
        setStatus('success');
        setTimeout(() => navigate('/signin'), 3000);
      } catch (error) {
        setStatus('error');
        console.log(error);
      }
    };

    activateAccount();
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      {status === 'loading' && <p>Activating your account...</p>}
      {status === 'success' && (
        <div className="text-center">
          <h2 className="text-2xl font-bold text-green-600">Account Activated!</h2>
          <p>Redirecting to login page...</p>
        </div>
      )}
      {status === 'error' && (
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600">Activation Failed</h2>
          <p>Please try again or contact support.</p>
        </div>
      )}
    </div>
  );
};

export default AccountActivation;