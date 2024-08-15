# Use a imagem oficial do Node.js como base
FROM node:14-alpine

# Define o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copia o arquivo package.json e instala as dependências
COPY package*.json ./
RUN npm install

# Copia o restante do código do projeto
COPY . .

# Exponha a porta em que a aplicação será executada
EXPOSE 5000

# Comando para iniciar o servidor
CMD ["npm", "start"]
