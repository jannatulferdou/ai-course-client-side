import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash, FaFacebookF, FaTwitter, FaGoogle, FaLinkedinIn, FaGithub } from 'react-icons/fa';
import { AuthContext } from '../Provider/AuthProvider';
import Swal from 'sweetalert2';
import Lottie from 'lottie-react';
import login from './login.json';

const Register = () => {
  const { createUser, setUser, updateUser, googleSignIn, githubSignIn } = useContext(AuthContext);
  const [nameError, setNameError] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [showPasswordRules, setShowPasswordRules] = useState(false);
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*]/.test(password);
  const isLongEnough = password.length >= 8;
  const notContainsEmail = email ? !password.includes(email.split('@')[0]) : true;
  const passwordsMatch = password === confirmPassword;

  const allValid = hasUppercase && hasLowercase && hasNumber && hasSpecialChar && isLongEnough && notContainsEmail && passwordsMatch;

  const handleRegister = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const photoURL = e.target.photoURL.value;

    if (name.length < 5) {
      setNameError('Name should be more than 5 characters');
      return;
    } else {
      setNameError('');
    }

    if (!allValid) {
      setPasswordError('Please meet all the password requirements.');
      return;
    }

    setPasswordError('');

    createUser(email, password)
      .then(result => {
        const user = result.user;
        updateUser({ displayName: name, photoURL })
          .then(() => setUser({ ...user, displayName: name, photoURL }))
          .catch(() => setUser(user));

        Swal.fire({
          title: 'Registration Successful!',
          text: 'You have registered successfully 🎉',
          icon: 'success',
          confirmButtonText: 'Go to Home',
          background: '#0f172a',
          color: 'white',
          iconColor: '#f59e0b',
        }).then(() => navigate('/'));
      })
      .catch(error => {
        Swal.fire({
          title: 'Registration Failed!',
          text: error.message,
          icon: 'error',
          confirmButtonText: 'Try Again',
          background: '#0f172a',
          color: 'white',
          iconColor: '#ef4444',
        });
      });
  };

  const handleGoogleLogin = () => {
    googleSignIn()
      .then(result => {
        Swal.fire({
          title: 'Google Login Successful!',
          text: `Welcome, ${result.user.displayName || 'User'}!`,
          icon: 'success',
          confirmButtonText: 'Continue',
          background: '#0f172a',
          color: 'white',
          iconColor: '#f59e0b',
        }).then(() => navigate('/'));
      })
      .catch(error => {
        Swal.fire({
          title: 'Google Login Failed!',
          text: error.message,
          icon: 'error',
          confirmButtonText: 'Try Again',
          background: '#0f172a',
          color: 'white',
          iconColor: '#ef4444',
        });
      });
  };
const handleSignInWithGithub = () => {
  githubSignIn()
    .then(result => {
      Swal.fire({
        title: 'GitHub Login Successful!',
        text: `Welcome, ${result.user.displayName || 'User'}!`,
        icon: 'success',
        confirmButtonText: 'Continue',
        background: '#0f172a',
        color: 'white',
        iconColor: '#f59e0b',
      }).then(() => navigate('/'));
    })
    .catch(error => {
      Swal.fire({
        title: 'GitHub Login Failed!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Try Again',
        background: '#0f172a',
        color: 'white',
        iconColor: '#ef4444',
      });
    });
};

  const calculateStrength = () => {
    let strength = 0;
    if (password.length > 0) strength += 20;
    if (hasUppercase) strength += 20;
    if (hasLowercase) strength += 20;
    if (hasNumber) strength += 20;
    if (hasSpecialChar) strength += 20;
    return Math.min(strength, 100);
  };

  const strength = calculateStrength();
  const strengthColor =
    strength < 40 ? 'bg-red-500' :
    strength < 70 ? 'bg-cyan-500' :
    'bg-green-500';

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gradient-to-br from-gray-900 to-[#0f172a]">
      <div className="w-full lg:w-1/2 bg-[#0f172a] flex justify-center items-center p-8 py-20 pt-30 relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
          <Lottie animationData={login} loop={true} className="w-full h-full object-cover" />
        </div>

        <div className="w-full max-w-md relative z-10">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <h2 className="text-3xl text-center mb-2 font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-white tracking-tight">NeuroNest</h2>
              <div className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-blue-500 to-transparent"></div>
            </div>
          </div>

          <p className="text-center text-gray-400 mb-6 text-lg tracking-wider">
            JOIN OUR <span className="text-cyan-400 font-medium">TECH COMMUNITY</span>
          </p>

          <form onSubmit={handleRegister} className="space-y-4">
            <input type="text" name="name" placeholder="Full Name" required className="input w-full bg-gray-800 border-gray-700 text-white placeholder-gray-500" />
            {nameError && <p className="text-red-400 text-xs">{nameError}</p>}

            <input type="text" name="photoURL" placeholder="Profile Image URL" required className="input w-full bg-gray-800 border-gray-700 text-white placeholder-gray-500" />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              required
              className="input w-full bg-gray-800 border-gray-700 text-white placeholder-gray-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Create Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setShowPasswordRules(true);
                }}
                required
                className="input w-full pr-10 bg-gray-800 border-gray-700 text-white placeholder-gray-500"
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute top-3 right-3 text-gray-400 hover:text-cyan-500">
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <input
              type={showPassword ? 'text' : 'password'}
              name="confirmPassword"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="input w-full bg-gray-800 border-gray-700 text-white placeholder-gray-500"
            />

            {/* Password rules */}
            {showPasswordRules && !allValid && (
              <div className="mt-2 text-sm space-y-1">
                <p className={`${isLongEnough ? 'text-green-400' : 'text-red-400'}`}>• At least 8 characters</p>
                <p className={`${hasUppercase ? 'text-green-400' : 'text-red-400'}`}>• At least 1 uppercase letter</p>
                <p className={`${hasLowercase ? 'text-green-400' : 'text-red-400'}`}>• At least 1 lowercase letter</p>
                <p className={`${hasNumber ? 'text-green-400' : 'text-red-400'}`}>• At least 1 number</p>
                <p className={`${hasSpecialChar ? 'text-green-400' : 'text-red-400'}`}>• At least 1 special character</p>
                <p className={`${notContainsEmail ? 'text-green-400' : 'text-red-400'}`}>• Must not contain email</p>
                <p className={`${passwordsMatch ? 'text-green-400' : 'text-red-400'}`}>• Passwords must match</p>
              </div>
            )}

            {password && (
              <div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className={`h-2 rounded-full ${strengthColor}`} style={{ width: `${strength}%` }}></div>
                </div>
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>Weak</span>
                  <span>Strong</span>
                </div>
              </div>
            )}

            {passwordError && <p className="text-red-400 text-xs">{passwordError}</p>}

            <button type="submit" className="btn w-full bg-gradient-to-r from-cyan-500 to-blue-700 text-white py-2 px-4 rounded-md shadow-lg">CREATE ACCOUNT</button>
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
           
            <button onClick={handleGoogleLogin} className="btn btn-sm bg-[#ea4335] text-white"><FaGoogle /></button>
            
          </div>

          <p className="text-center text-sm text-gray-400">
            Already have an account?{' '}
            <Link className="text-cyan-600 hover:text-cyan-400 font-medium" to="/auth/login">Sign In</Link>
          </p>
        </div>
      </div>

      <div className="hidden lg:flex w-full lg:w-1/2 bg-gradient-to-br from-[#0f172a] to-gray-900 text-white flex-col justify-center items-center px-10 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/grid-me.png')]"></div>
        <div className="absolute top-20 right-20 w-16 h-16 rounded-full bg-cyan-500 opacity-20 blur-xl"></div>
        <div className="absolute bottom-1/3 left-1/4 w-24 h-24 rounded-full bg-blue-500 opacity-15 blur-xl"></div>

        <div className="max-w-lg text-center relative z-10">
          <h1 className="text-5xl font-extrabold mb-4">WELCOME TO <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-white">NeuroNest</span></h1>
          <div className="w-32 h-1 bg-gradient-to-r from-cyan-500 to-transparent mx-auto"></div>
          <p className="text-gray-300 leading-relaxed text-lg mt-4">
            Join our cutting-edge platform where technology meets innovation. Connect with like-minded developers, share knowledge, and grow together in our tech ecosystem.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
