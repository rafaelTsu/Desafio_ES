import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

function UserManager() {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const uid = user?.uid;
    
                if (!uid) {
                    setError('User not authenticated');
                    return;
                }
    
                const response = await fetch('http://localhost:5000/user-manager', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ uid }),
                });
    
                if (response.ok) {
                    const data = await response.json();
                    setUsers(data);
                } else {
                    const errorData = await response.json();
                    setError(errorData.error || 'Failed to fetch users');
                }
            } catch (error) {
                setError('Error fetching users');
            }
        };
    
        if (user) {
            fetchUsers();
        }
    }, [user]);

    const handleEditClick = (userEdit) => {
        // Navega para a tela de edição e passa o usuário como estado
        navigate('/edituser', { state: { userEdit } });
    };

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Gerenciamento de Usuários</h2>
            {users.length > 0 ? (
                <ul className="list-group">
                {users.map((userEdit) => (
                    <li className="list-group-item d-flex justify-content-between align-items-center" key={userEdit.email}>
                    <div>
                        <span className="fw-bold">{userEdit.email}</span> - <span className="text-muted">{userEdit.role}</span>
                    </div>
                    <button 
                        className="btn btn-outline-primary btn-sm"
                        onClick={() => handleEditClick(userEdit)}
                    >
                        Editar
                    </button>
                    </li>
                ))}
                </ul>
            ) : (
                <p className="text-center text-muted">Nenhum usuário cadastrado!</p>
            )}
            <div className="d-flex justify-content-center mt-4">
                <button 
                className="btn btn-success" 
                onClick={() => navigate("/register")}
                >
                Registrar Usuário
                </button>
            </div>
        </div>
    );
}

export default UserManager;
