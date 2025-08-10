import React, { useState, useRef, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash, FaFacebookF, FaTwitter, FaGoogle, FaLinkedinIn, FaGithub } from 'react-icons/fa';
import Swal from 'sweetalert2';
import Lottie from 'lottie-react';
import { AuthContext } from '../Provider/AuthProvider';
import login from './login.json';
import { toast } from 'react-toastify';

const Login = () => {
  const { createSignIn, resetPassword, googleSignIn, githubSignIn} = useContext(AuthContext);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const emailRef = useRef();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    createSignIn(email, password)
      .then((result) => {
        const user = result.user;
        Swal.fire({
          title: 'Login Successful!',
          text: `Welcome back, ${user.displayName || 'User'}!`,
          icon: 'success',
          confirmButtonText: 'Continue',
          background: '#0f172a',
          color: 'white',
          iconColor: '#f59e0b',
        }).then(() => {
          navigate(location.state || '/');
        });
      })
      .catch((error) => {
       setError(error.message);
        toast.error(error.message);
      });
  };

  const handleForgetPassword = () => {
    const email = emailRef.current.value;
    setError('');
    if (!email) {
      setError('Please enter your email to reset password.');
      return;
    }

    resetPassword(email)
      .then(() => {
        alert('A password reset email is sent. Please check your inbox.');
      })
      .catch((error) => {
        setError(error.message);
        toast.error(error.message);
      });
  };

  const handleGoogleLogin = () => {
    googleSignIn()
      .then((result) => {
        Swal.fire({
          title: 'Google Login Successful!',
          text: `Welcome, ${result.user.displayName || 'User'}!`,
          icon: 'success',
          confirmButtonText: 'Continue',
          background: '#0f172a',
          color: 'white',
          iconColor: '#f59e0b',
        }).then(() => {
          navigate(location.state || '/');
        });
      })
      .catch((error) => {
        setError(error.message);
        toast.error(error.message);
      });
  };

 const handleSignInWithGithub = () => {
  githubSignIn()
    .then((result) => {
      Swal.fire({
        title: 'GitHub Login Successful!',
        text: `Welcome, ${result.user.displayName || 'Developer'}!`,
        icon: 'success',
        confirmButtonText: 'Continue',
        background: '#0f172a',
        color: 'white',
        iconColor: '#f59e0b',
      }).then(() => {
        navigate(location.state || '/');
      });
    })
    .catch((error) => {
      setError(error.message);
      toast.error(error.message);
    });
};



  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gradient-to-br from-gray-900 to-[#0f172a]">
      {/* Left side form */}
      <div className="w-full lg:w-1/2 bg-[#0f172a] flex justify-center items-center p-8 py-20 pt-30 relative overflow-hidden">
        {/* Lottie animation background */}
        <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
          <Lottie animationData={login} loop={true} className="w-full h-full object-cover" />
        </div>

        {/* Binary code animation */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-5">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute text-green-400 text-xs font-mono"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animation: `fall ${Math.random() * 5 + 3}s linear infinite`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            >
              {Math.random() > 0.5 ? '1' : '0'}
            </div>
          ))}
        </div>

        <div className="w-full max-w-md relative z-10">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <h2 className="text-3xl text-center mb-2 font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-white tracking-tight">
                NeuroNest
              </h2>
              <div className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-blue-500 to-transparent"></div>
            </div>
          </div>

          <p className="text-center text-gray-400 mb-6 text-lg tracking-wider">
            LOG IN TO YOUR <span className="text-cyan-400 font-medium">TECH PROFILE</span>
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="relative">
              <input
                ref={emailRef}
                type="email"
                name="email"
                placeholder="Email Address"
                required
                className="input w-full bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              />
            </div>

            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Password"
                required
                className="input w-full pr-10 bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-3 right-3 text-gray-400 hover:text-cyan-500 transition-colors"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            {error && <p className="text-red-400 text-xs">{error}</p>}

            <div onClick={handleForgetPassword}>
              <a className="text-sm text-cyan-400 cursor-pointer hover:underline">Forgot password?</a>
            </div>

            <button
              type="submit"
              className="btn w-full border-hidden bg-gradient-to-r from-cyan-500 to-blue-700 hover:from-cyan-400 hover:to-blue-500 text-white font-medium py-2 px-4 rounded-md transition-all transform shadow-lg"
            >
              LOGIN
            </button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-700"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="px-2 bg-[#0f172a] text-sm text-gray-400">OR CONTINUE WITH</span>
            </div>
          </div>

          <div className="flex justify-center gap-3 mb-6">
            <button onClick={handleSignInWithGithub} className="btn btn-sm bg-[#1f3767] hover:bg-[#344e86] text-white transform hover:scale-105 transition-transform border-hidden">
              <FaGithub />
            </button>
           
            <button
              onClick={handleGoogleLogin}
              className="btn btn-sm bg-[#ea4335] hover:bg-[#d33426] text-white transform hover:scale-105 transition-transform border-hidden"
            >
              <FaGoogle />
            </button>
          
          </div>

          <p className="text-center text-sm text-gray-400">
            Don't have an account?{' '}
            <Link className="text-cyan-600 hover:text-cyan-400 font-medium transition-colors" to="/auth/register">
              Sign Up
            </Link>
          </p>
        </div>
      </div>

      {/* Right side welcome message */}
      <div className="hidden lg:flex w-full lg:w-1/2 bg-gradient-to-br from-[#0f172a] to-gray-900 text-white flex-col justify-center items-center px-10 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/grid-me.png')]"></div>
        </div>
        <div className="absolute top-20 right-20 w-16 h-16 rounded-full bg-cyan-500 opacity-20 filter blur-xl"></div>
        <div className="absolute bottom-1/3 left-1/4 w-24 h-24 rounded-full bg-blue-500 opacity-15 filter blur-xl"></div>

        <div className="max-w-lg text-center relative z-10">
          <h1 className="text-5xl font-extrabold mb-4 tracking-tight">
            <span>WELCOME BACK TO</span>{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-white">NeuroNest</span>
          </h1>
          <div className="w-32 h-1 bg-gradient-to-r from-cyan-500 to-transparent mx-auto mb-8"></div>
          <p className="text-gray-300 leading-relaxed text-lg">
            Continue your journey in the tech ecosystem. Collaborate, grow, and thrive with the best minds.
          </p>
        </div>
      </div>

   
    </div>
  );
};

export default Login;
