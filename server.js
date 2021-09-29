const http = require("http");
const { onRequest } = require("./app");
// const cluster = require('cluster')
// const {cpus} = require('os')


// console.log('SERVER DHARMA')
// const numCPUs = cpus().length;

// if(cluster.isPrimary){
//   for(let i = 0; i<numCPUs; i++){
//     cluster.fork()
//   }
//   cluster.on('exit',(worker,code,signal)=>{
//     console.log(`Worker ${worker.process.pid} died`)
//   })
// }else{
//   const app = http.createServer().listen( process.env.PORT || 5000, () => {
//       console.log(`Server running in port 5000`);
//     });
//     app.on('request',onRequest)
//   }
  
  const app = http.createServer().listen( process.env.PORT || 5000, () => {
      console.log(`Server running in port 5000`);
    });
    app.on('request',onRequest)