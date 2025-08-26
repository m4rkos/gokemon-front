# Etapa 1: Build da app Angular
FROM node:18 AS builder

WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --prod

# Etapa 2: Imagem NGINX para servir os arquivos
FROM nginx:alpine

# Remove a configuração default do nginx
RUN rm /etc/nginx/conf.d/default.conf

# Copia os arquivos Angular buildados
COPY --from=builder /app/dist/front/browser /usr/share/nginx/html

# Copia a nova configuração do nginx
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
