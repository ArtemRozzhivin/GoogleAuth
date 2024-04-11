import { useState, useEffect } from 'react';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import Button from './ui/Button';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      toast.success('You have successfully logged in to your account!');
      setUser(codeResponse);
    },
    onError: (error) => {
      toast.error('Login Failed!');
      console.log('Login Failed:', error);
    },
  });

  const logOut = () => {
    googleLogout();
    setProfile(null);
    toast.success('You have successfully logged out!');
  };

  useEffect(() => {
    if (user) {
      axios
        .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
          headers: {
            Authorization: `Bearer ${user.access_token}`,
            Accept: 'application/json',
          },
        })
        .then((res) => {
          setProfile(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [user]);

  return (
    <div className='flex items-center justify-center h-[100vh] text-center'>
      <div className='flex flex-col gap-10'>
        <h1 className='font-bold text-5xl'>React Google Auth</h1>
        {profile ? (
          <div className='flex flex-col gap-5'>
            <div className='flex flex-col items-center gap-2 border border-[#0063a9] p-3 rounded-md shadow-2xl'>
              <img className='rounded-md w-24 h-24' src={profile.picture} alt='avatar' />
              <h3 className='font-semibold text-3xl py-2'>User Logged in</h3>
              <p className='text-lg'>Name: {profile.name}</p>
              <p className='text-lg'>Email Address: {profile.email}</p>
            </div>
            <Button onClick={logOut}>Log out</Button>
          </div>
        ) : (
          <Button onClick={login}>Sign in with Google 🚀 </Button>
        )}
      </div>
    </div>
  );
}
export default App;
