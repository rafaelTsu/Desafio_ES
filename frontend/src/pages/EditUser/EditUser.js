import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

function EditUser() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [uid, setUid] = useState(null);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const location = useLocation();
    const userEdit = location.state?.userEdit;
    const navigate = useNavigate();
    const { user } = useAuth();
    const uidEdit = userEdit?.uid;

    useEffect(() => {
        if (userEdit) {
            setEmail(userEdit.email);
            setRole(userEdit.role);
        }
        if (user) {
            setUid(user.uid);
        }
    }, [userEdit, user]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!email || !password) {
            setError('Por favor, preencha todos os campos');
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/edit-user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ uid, uidEdit, email, password, role }),
            });

            if (response.ok) {
                setSuccess(true);
                setError(null);
                setEmail('');
                setPassword('');
                
                // Redireciona para a página inicial após o sucesso
                navigate('/usermanager');
            } else {
                const errorData = await response.json();
                setError(errorData.error || 'Erro ao editar usuário');
            }
        } catch (error) {
            setError('Erro de rede ou no servidor');
        }
    };

    if (!userEdit) {
        return <p>Usuário não encontrado.</p>;
    }

    return (
        <div>
            <h2>Editar Usuário</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>Usuário editado com sucesso!</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Senha:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Role:</label>
                    <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        required
                    >
                        <option value="admin">Admin</option>
                        <option value="procurador">Procurador</option>
                        <option value="assessor">Assessor</option>
                    </select>
                </div>
                <button type="submit">Salvar</button>
            </form>
        </div>
    );
}

export default EditUser;

