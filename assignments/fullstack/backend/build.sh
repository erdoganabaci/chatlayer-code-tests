NAME='chat-layer-echobot-backend:latest'

docker build -t "$NAME" .

docker run -p 4040:4040  -d "$NAME"