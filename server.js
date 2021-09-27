const http = require("http");
const cluster = require('cluster')
const {cpus} = require('os')
const { onRequest } = require("./app");
const { startConnection } = require("./app/services/connection");


console.log('SERVER DHARMA')
startConnection()
const numCPUs = cpus().length;

if(cluster.isPrimary){
  for(let i = 0; i<numCPUs; i++){
    cluster.fork()
  }
  cluster.on('exit',(worker,code,signal)=>{
    console.log(`Worker ${worker.process.pid} died`)
  })
}else{
  const app = http.createServer().listen(5000, () => {
      console.log(`Server running in port 5000`);
    });
    app.on('request',onRequest)
}
