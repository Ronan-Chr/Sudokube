# Serve Sudokube as a static site with nginx on port 8080 (Cloud Run default)
FROM nginx:alpine

# Replace the default nginx site with one that listens on 8080
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy only the files the game needs in the browser
COPY index.html /usr/share/nginx/html/
COPY *.js /usr/share/nginx/html/
COPY vendor/ /usr/share/nginx/html/vendor/

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
