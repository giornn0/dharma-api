const { notAuthenticated } = require('../../response')

module.exports=(req,res,user)=>{
    const {logout,login} = require('../services/authentication.services')
    if(req.method==='POST')return login(user,res) 
    else if(!req.authorization) return notAuthenticated(res) 
    else if(req.method==='DELETE')return logout (req.authorization,res)
    
}