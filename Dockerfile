FROM nginx:alpine

WORKDIR /usr/share/nginx/html

RUN rm -rf ./*

COPY . .

ENV TZ=Asia/Novosibirsk
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
