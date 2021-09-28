const { response, throwError } = require("../../response")
const{query} = require("../services/connection")
const{queries} = require("../services/query.services")

class DataController{
    constructor(res){
        this.res = res
    }

    async getBalance(){
        return  await query(queries.getBalance,).then(data=>{
            response(this.res,data,200)
        }).catch(error=>{
            throwError(this.res, error)
        })
    }


}
module.exports = {
    DataController
}