
FROM nginx:1.17

COPY dist/pdf-anonyme-front /var/www/html/pdf-anonyme-front

COPY nginx.pdfanonyme.conf /etc/nginx/conf.d/default.conf

