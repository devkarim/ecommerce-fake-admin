import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';

export default function Home() {
  return (
    <div className="w-full h-full flex justify-center items-center p-4 lg:p-8">
      <div className="card w-full max-w-2xl bg-base-100 shadow-xl p-2 sm:p-4 lg:p-12">
        <div className="card-body space-y-8">
          <div className="space-y-2">
            <h2 className="card-title text-3xl lg:text-4xl">Sign In</h2>
            <p className="text-sm lg:text-base">
              to continue with e-commerce fake admin
            </p>
          </div>
          <div className="card-actions justify-center space-y-2">
            <button className="btn btn-outline w-full text-base lg:text-lg font-normal">
              <FcGoogle className="text-2xl" /> Continue with Google
            </button>
            <button className="btn btn-outline w-full text-base lg:text-lg font-normal">
              <FaGithub className="text-2xl" /> Continue with GitHub
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
