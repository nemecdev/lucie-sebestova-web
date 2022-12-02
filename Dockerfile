FROM node:current-alpine3.16
ENV WDIR="sebestovalucie-client"
WORKDIR $WDIR
COPY . .
RUN yarn install -f
ENTRYPOINT ["sh", "-c"]
CMD ["yarn dev --port 8080 --host"]
