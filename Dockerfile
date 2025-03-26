# Para realizar o deploy no https://railway.com/ - plataforma gratuita
# Use a imagem Node.js versão 22 como base
FROM node:22

# Crie o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copie os arquivos de configuração necessários para o contêiner
COPY package*.json ./

# Instale as dependências do projeto
RUN npm install

# Copie o restante dos arquivos do projeto para o contêiner
COPY . .

# Gere o cliente Prisma (caso esteja usando Prisma)
RUN npx prisma generate

# Compile o projeto para produção
RUN npm run build

# Exponha a porta que será usada pela aplicação
EXPOSE 3000

# Defina o comando de inicialização em modo de produção
CMD ["npm", "run", "start:prod"]
