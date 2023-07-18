'use client';

import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import { signIn } from 'next-auth/react';
import ProviderButton from './provider-button';

interface LoginCardProps {}

const LoginCard: React.FC<LoginCardProps> = ({}) => {
  const login = (provider: string) => {
    signIn(provider, { callbackUrl: '/' });
  };

  return (
    <div className="card w-full max-w-2xl bg-base-100 shadow-xl p-2 sm:p-4 lg:p-12">
      <div className="card-body space-y-8">
        <div className="space-y-2">
          <h2 className="card-title text-3xl lg:text-4xl">Sign In</h2>
          <p className="text-sm lg:text-base">
            to continue with e-commerce fake admin
          </p>
        </div>
        <div className="card-actions justify-center space-y-2">
          <ProviderButton
            name="Google"
            icon={<FcGoogle />}
            onClick={() => login('google')}
          />
          <ProviderButton
            name="GitHub"
            icon={<FaGithub />}
            onClick={() => login('github')}
          />
        </div>
      </div>
    </div>
  );
};

export default LoginCard;
