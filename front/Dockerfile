FROM alpine

COPY init.sh /
COPY index.html /app/
COPY index.js /app/

RUN cat /init.sh
VOLUME /frontend

CMD ["/init.sh"]
