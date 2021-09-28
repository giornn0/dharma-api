const { throwError, notAuthenticated, response, notFound} = require('../../response')
const { DataController } = require('../controllers/data.controller')

module.exports= async(req,res,values)=>{
  try {
    const validateUser = await require('../services/authentication.services').refresh(req.authorization,res) 
    if(!validateUser[0]){
      if(validateUser[1]===1)
      return notAuthenticated(res)
      if(validateUser[1]===2){
        const {query} = require("../services/connection")
            await query(`DELETE FROM personal_access_tokens WHERE tokenable_id=?`,[validateUser[1]])
            return notAuthenticated(res)
          }
          if(validateUser[1]===3){
            const {query} = require("../services/connection")
            await query(`DELETE FROM personal_access_tokens WHERE tokenable_id=?`,[validateUser[1]])
            return response(res,null,419,`Token Expirado. Revalide su sesion`)
          }
        }
        else{
            const DataWorker = new DataController(res)
            if(req.dataFirst ==='balance')return  await DataWorker.getBalance()
            else{
              return notFound(res)
            }
        }
    }
    catch (error){
        throwError(res, error)
    }
}