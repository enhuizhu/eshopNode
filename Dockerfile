FROM node:latest
RUN npm i -g pm2
CMD ["pm2-runtime", "/var/www/eshopNode/dist/index.js"]