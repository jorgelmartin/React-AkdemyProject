# Usa una imagen base de Node.js
FROM node:18.16.0-alpine

# Establece el directorio de trabajo
WORKDIR /React-AcademyProject

# Copia solo los archivos necesarios para instalar dependencias
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto de los archivos de la aplicación
COPY . .

# Exponer el puerto que tu aplicación usa para el desarrollo (cambia si es necesario)
EXPOSE 5173

# Comando para iniciar la aplicación en modo de desarrollo
CMD ["npm", "run", "dev"]