import React from 'react';
import { Link } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import useAuth from '../../hooks/useAuth';
import { auth } from '../../config/firebaseConfig';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleLogOut = async (e) => {
    e.preventDefault();
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Welcome, {user?.email}</h1>
      <Link to="/usermanager">Manage Users</Link>
      <br/>
      <button onClick={handleLogOut}>Sair</button>
    </div>
  );
};

export default Home;
