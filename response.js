function throwError(res, error) {
  console.log(error);
  try {
    dropConnection()
    res.writeHead(500, headers);
    res.write(
      JSON.stringify({
        message: `The server is not working. Error: ${error.message}`,
        error,
      })
    );
    return res.end()
  } catch (error) {
    console.log(error);
    res.writeHead(500, headers);
    res.write(
      JSON.stringify({
        message: `The server is not working. Error: ${error.message}`,
        error,
      })
    );
    return res.end()    
  }
}
function notAuthenticated(res) {
  res.writeHead(401, headers);
  res.write(
    JSON.stringify({
      message: `The user is not authenticated. Missing authentication token!. If you need to close your sesion contact support!`,
    })
  )
  return res.end();
}

function notFound(res) {
  try {
    dropConnection()
    res.writeHead(404, headers);
    res.write(
      JSON.stringify({ message: `Error 404, page not to be found` })
    );
    return  res.end()
  } catch (error) {
    res.writeHead(404, headers);
    res.write(
      JSON.stringify({ message: `Error 404, page not to be found` })
    );
    return res.end()
  }
}
function validationError(res, error){
  try {
    dropConnection()
    res.writeHead(402,headers)
    return res.end(JSON.stringify({message: error}))
  } catch (error) {
    res.writeHead(402,headers)
    return res.end(JSON.stringify({message: error}))
  }
}

let headers = {
  "Content-Type": "application/json,image/jpeg",
  "Access-Control-Allow-Origin": "",
  "Access-Control-Allow-Methods": " OPTIONS,POST, GET,PUT,DELETE",
  "Access-Control-Allow-Headers":
    "Origin, X-Requested-With,Content-Type,Accept,authorization,Contentent-Type",
  /** add other headers as per requirement */
};
function setAccesAllowOrigin(allowOrigin){
  headers["Access-Control-Allow-Origin"]=allowOrigin
}


const { dropConnection } = require("./app/services/connection");


function response(res,data,status,message=null){
  dropConnection()
  res.writeHead(status, headers)
  res.write(JSON.stringify(
    {data,message}))
  return res.end()
}


module.exports = {
  notFound,
  throwError,
  headers,
  validationError,
  setAccesAllowOrigin,
  notAuthenticated,
  response,
};

// IMPORTANTE COMO SERVIR UN FILE CON VANILLA NODE JS

/*
KILLEAR UN PORT CON 

sudo fuser -k 8001/tcp


GENERAR RANDOM HEX VALUE
require('crypto').randomBytes(64).toString('hex')

*/

// const path =require('path');
// const dir = path.join(__dirname,'assets','sakuraCastle.jpg')
// let fs = require("fs")


// let read = fs.createReadStream(dir)
// let start = []
// read.read()
// read.on('open', (chunks)=>{
  //           start.push(chunks)
  // })
  // read.on('close',()=>{
//   console.log(start)
// })