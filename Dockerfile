FROM node:12.16.1

WORKDIR /user/src/klug-brain-api

COPY ./ ./

RUN npm install

CMD ["/bin/bash"]