#### Snippet of frontend(ReactJS)`DockerFile`

You will find this `DockerFile` inside **frontend** directory. 

```bash
# Create image based on the official Node image from dockerhub
FROM node:10
#Argument that is passed from docer-compose.yaml file
ARG FRONTEND_PORT
# Create app directory
WORKDIR /usr/src/app
#Echo the argument to check passed argument loaded here correctly
RUN echo "Argument port is : $FRONTEND_PORT"
# Copy dependency definitions
COPY package.json /usr/src/app
# Install dependecies
RUN npm install
# Get all the code needed to run the app
COPY . /usr/src/app
# Expose the port the app runs in
EXPOSE ${FRONTEND_PORT}
# Serve the app
CMD ["npm", "start"]
```
##### Explanation of frontend(ReactJS) `DockerFile`

Frontend `DockerFile` is almost the same as Backend `DockerFile`.

### herokuへのデプロイ

エラーが出るので以下の環境変数をセット

* heroku config:set HOST=0.0.0.0 --app survey-saas-frontend
* heroku config:set DANGEROUSLY_DISABLE_HOST_CHECK=true --app survey-saas-frontend
