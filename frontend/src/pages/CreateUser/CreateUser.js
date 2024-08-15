import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

function CreateUser() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('admin');
    const [uid, setUid] = useState(null);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const { user } = useAuth();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const uid = user?.uid;
                if (!uid) {
                    setError('Usuário não autenticado.');
                    return;
                }
                setUid(uid);
            } catch (error) {
                setError('Error');
            }
        };
        
        if (user) {
            fetchUsers();
        }
    }, [user]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!email || !password) {
          setError('Por favor, preencha todos os campos');
          return;
        }
    
        try {
          const response = await fetch('http://localhost:5000/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ uid, email, password, role }),
          });
    
          if (response.ok) {
            setSuccess(true);
            setError(null);
            setEmail('');
            setPassword('');
            
            // Redireciona para a página inicial após o sucesso
            navigate('/home');
          } else {
            const errorData = await response.json();
            setError(errorData.error || 'Erro ao criar usuário');
          }
        } catch (error) {
          setError('Erro de rede ou no servidor');
        }
    };

    return (
      <div className="container mt-5">
        <h2 className="text-center mb-4">Criar Usuário</h2>
        {error && <p className="text-danger text-center">{error}</p>}
        {success && <p className="text-success text-center">Usuário criado com sucesso!</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Senha:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="role" className="form-label">Role:</label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="form-select"
              required
            >
              <option value="admin">Admin</option>
              <option value="procurador">Procurador</option>
              <option value="assessor">Assessor</option>
            </select>
          </div>
          <div className="d-flex justify-content-center">
            <button type="submit" className="btn btn-primary">Criar Usuário</button>
          </div>
        </form>
      </div>
    );
}

export default CreateUser;
