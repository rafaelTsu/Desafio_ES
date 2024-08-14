import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
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
        <div>
        <h2>User Manager</h2>
        {users.length > 0 ? (
            <ul>
            {users.map((userEdit) => (
                <div>
                {userEdit.email} - {userEdit.role}
                <button onClick={() => handleEditClick(userEdit)}>Editar</button>
                </div>
            ))}
            </ul>
        ) : (
            <p>Nenhum usuário cadastrado!</p>
        )}
        <Link to="/register">Adicionar usuário</Link>
        </div>
    );
}

export default UserManager;
