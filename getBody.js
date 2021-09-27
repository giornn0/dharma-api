
function getData(req) {
    return new Promise((res, rej) => {
      try {
        body = ''
          req.on("data", (chunk) => {
            body += chunk.toString();
          });
        req.on("end", () => {
          if(body)res(JSON.parse(body))
          else res({});
        });
      } catch (error) {
        rej(error);
      }
    });
  }
  function getImageData(req){
    return new Promise((res,rej)=>{
      try {
        let body = [];
        req.on('data',(chunks)=>{
          body.push(chunks)
        })
        req.on('end',()=>{
          if(body) res(Buffer.concat(body))
          else res({})
        })      
      } catch (error) {
        rej(error)
      }
    })
  }

  const buffer64Response = async (buffers, res) => {
    try {
      
      const carga = await query(`UPDATE staff SET picture = ? WHERE staff_id = 36`,[buffers])
      const result = await query(`SELECT picture FROM staff WHERE staff_id = 36`)
      
      res.writeHead(200, headers)
      res.write(result[0].picture,'binary');
      res.end(null, 'binary');
      return
    } catch (error) {
      throwError(res,error)
    }
  };

  module.exports={
      getData,
      getImageData
  }