# Use uma imagem do Node.js como base
FROM node:18 AS build

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia o package.json e o package-lock.json
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o restante dos arquivos do projeto
COPY . .

# Compila a aplicação React para produção
RUN npm run build

# Usa uma imagem leve do NGINX para servir os arquivos estáticos
FROM nginx:alpine

# Remove o arquivo de configuração padrão do NGINX
RUN rm /etc/nginx/conf.d/default.conf

# Copia uma nova configuração do NGINX
COPY nginx.conf /etc/nginx/conf.d

# Copia os arquivos de build do React para o diretório padrão do NGINX
COPY --from=build /app/build /usr/share/nginx/html

# Expõe a porta 80 para acessar a aplicação
EXPOSE 80

# Comando para iniciar o NGINX
CMD ["nginx", "-g", "daemon off;"]
