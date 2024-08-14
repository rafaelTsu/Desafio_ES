const express = require('express');
const cors = require('cors');
const admin = require("./config/firebaseConfig.js");
const Usuario = require('./models/Usuarios.js');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}))

async function criarDb(){
  const db = require ("./models/db.js");
  await db.sync();
}
criarDb();

app.post("/register", async (req, res) => {
  const { uid, email, password, role } = req.body;

  try {
    // Encontra o usuário pelo UID
    const user = await Usuario.findOne({ where: { "uid": uid } });

    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }

    // Verifica se o usuário tem o papel de admin
    if (user.role === 'admin') {
      if (email && password) {
        try {
          await admin.auth().createUser({
            email: email,
            password: password
          })
          .then((userRecord) =>{
            Usuario.create({
              uid: userRecord.uid,
              email: email,
              role: role
            })
          })
    
          res.status(200).json({ message: 'Usuário criado com sucesso!' });
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Falha ao criar o usuário.' });
        }
      } else {
        res.status(400).json({ error: 'Email e senha são obrigatórios!' });
      }
    } else {
      return res.status(403).json({ error: 'Acesso negado.' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
});

app.post("/user-manager", async (req, res) => {
  const { uid } = req.body;

  if (!uid) {
    return res.status(400).json({ error: 'UID é obrigatório!' });
  }

  try {
    // Encontra o usuário pelo UID
    const user = await Usuario.findOne({ where: { "uid": uid } });

    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }

    // Verifica se o usuário tem o papel de admin
    if (user.role === 'admin') {
      // Retorna a lista de todos os usuários
      const users = await Usuario.findAll({
        attributes: ['uid', 'email', 'role'], // Inclua apenas os campos que você deseja retornar
      });
      return res.status(200).json(users);
    } else {
      return res.status(403).json({ error: 'Acesso negado.' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
});

app.post("/edit-user", async (req, res) => {
  const { uid, uidEdit, email, password, role } = req.body;

  try {
    // Encontra o usuário pelo UID
    const user = await Usuario.findOne({ where: { "uid": uid } });

    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }

    // Verifica se o usuário tem o papel de admin
    if (user.role === 'admin') {
      if (email && password) {
        try {
          await admin.auth().updateUser(uidEdit, {
            email: email,
            password: password
          })
          .then(async (userRecord) =>{
            const userEdit = await Usuario.findOne({where:{"uid": uidEdit}});
            userEdit.email = email;
            userEdit.role = role;

            await userEdit.save();
          })
    
          res.status(200).json({ message: 'Usuário criado com sucesso!' });
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Falha ao criar o usuário.' });
        }
      } else {
        res.status(400).json({ error: 'Email e senha são obrigatórios!' });
      }
    } else {
      return res.status(403).json({ error: 'Acesso negado.' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
});

app.listen(5000, () => {
  console.log('Server running on port 5000');
});
