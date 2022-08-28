# Execution

### To run backend locally, just use Docker:

`docker-compose up --build`

### To run frontend (node 18 required):

### On Linux:

```
cd ./app
npm install
chmod +x startapp.sh
./startapp.sh
```

### On Windows:

```
cd ./app
npm install
export REACT_APP_API_URL="http://localhost:8000"
export REACT_APP_TOKEN_NAME="__token"
npm start
```
