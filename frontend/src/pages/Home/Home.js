import React from 'react';
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
    <div className="d-flex flex-column justify-content-center align-items-center vh-100">
      <div className="text-center mb-4">
        <h1>Bem-vindo, {user?.email}</h1>
      </div>
      <div className="d-flex flex-column gap-3" style={{ maxWidth: '300px', width: '100%' }}>
        <button 
          className="btn btn-primary w-100" 
          onClick={() => { navigate("/usermanager") }}
        >
          Gerenciar Usuários
        </button>
        <button 
          className="btn btn-secondary w-100" 
          onClick={handleLogOut}
        >
          Sair
        </button>
      </div>
    </div>
  );
};

export default Home;
