# Use an official AWS Lambda Node.js runtime as a parent image
FROM public.ecr.aws/lambda/nodejs:20

WORKDIR /var/task

COPY package*.json ./

RUN npm install

COPY . .

CMD [ "index.handler" ]