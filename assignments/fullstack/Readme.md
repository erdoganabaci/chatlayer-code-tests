# Welcome to EchoBot FullStack Application
Real-time echobot response back to client.The EchoBot is a tiny chatbot that repeats anything you say to it.


### Technologies Used
<p>
<img src="https://img.shields.io/badge/-GraphQL%20-black?style=for-the-badge&logo=graphql&logoColor=blueviolet">
<img src="https://img.shields.io/badge/-Expressjs%20-%23323330?style=for-the-badge&logo=express">
<img src="https://img.shields.io/badge/react%20-%2320232a.svg?&style=for-the-badge&logo=react" >   
<img src="https://img.shields.io/badge/-Nodejs%20-%23323330?style=for-the-badge&logo=Node.js&logoColor=green">
<img src="https://img.shields.io/badge/-Apollo%20GraphQL-311C87?logo=apollo%20graphql&logoColor=white&style=for-the-badge">
<img src="https://img.shields.io/badge/-Styled%20Components%20-purple?style=for-the-badge&logo=styled-components&logoColor=white">
<img src="https://img.shields.io/badge/-Cypress%20-black?style=for-the-badge&logo=cypress&logoColor=white">
<img src="https://img.shields.io/badge/-Vercel%20-black?style=for-the-badge&logo=vercel&logoColor=white">
<img src="https://img.shields.io/badge/-Heroku%20-purple?style=for-the-badge&logo=heroku&logoColor=white">
<img src="https://img.shields.io/badge/-Docker%20-blue?style=for-the-badge&logo=Docker&logoColor=white">
<img src="https://img.shields.io/badge/-Kubernetes%20-blue?style=for-the-badge&logo=Kubernetes&logoColor=white">
</p>


[Demo](https://chatlayer-code-tests.vercel.app/)
## Important!
**Before starting to react be sure the backend is working. If you click the demo link wait for 10 seconds backend Heroku server will awake soon then you can chat with the bot.**

![EchoBot](./frontend/echoBot.png)


### Getting Started
1. Clone this repo
2. `npm install` on both `frontend` and `backend` folders
3. `npm start`


### Run with Docker
1. Each backend and frontend folder has a Dockerfile and `build.sh` you can simply run `build.sh`.
2. When you write `docker ps` command you will see like below images both frontend and backend works fine.

![EchoBot](./docker-fullstack.png)

### Run with Kubernetes
1. Open K8S folder.
2. First write `minikube start` command in terminal and be sure attach local docker deamon images to minikube `eval $(minikube -p minikube docker-env)` then apply each yaml `kubectl apply -f backend-deployment.yaml` and `kubectl apply -f  frontend-deployment.yaml`
3. Access pod from browser using port forward command `kubectl port-forward chat-layer-echobot-frontend-7785b4f454-qscjr 3000:3000`

![Kubernetes-Pods](./kubernetes-pods.png)
