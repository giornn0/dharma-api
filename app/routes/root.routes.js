const { throwError, notAuthenticated } = require("../../response");

let Controller = null

module.exports = async (req, res, values) => {
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
    }
    else{
      // if(req.section ==='users'){ 
      //   const {UsersController}= require("../controllers/users.controller");
      //   Controller = new UsersController(res)
      // } 
      if(req.section ==='clientes'){ 
        const {ClientesController}= require("../controllers/clientes.controller");
        Controller = new ClientesController(res)
      } 
      else if(req.section ==='contratos'){ 
        const {ContratosController}= require("../controllers/contratos.controller");
        Controller = new ContratosController(res)
      } 
      else if(req.section ==='pagos'){ 
        const {PagosController}= require("../controllers/pagos.controller");
        Controller = new PagosController(res)
      } 
      else if(req.section ==='vendedores'){ 
        const {VendedoresController}= require("../controllers/vendedores.controller");
        Controller = new VendedoresController(res)
      } 
      if(req.relation){
        if(req.relation==='images') return await Controller.postImage(values,req.id)
        return await Controller.getRelation(req.relation,req.id)
      }
      if (req.method == "GET") {
        if (req.id) {
          return await Controller.show(req.id);
        } 
        if(req.page){
          return await Controller.page(req.page,req.take, req.search)
        }
        else {
          return await Controller.index();
        }
      }
      if (req.method === "POST" && !req.id) {
        return await Controller.store(values);
      }
      if (req.method === "PUT" && req.id) {
        return await Controller.update(values,req.id);
      }
      if (req.method === "DELETE" && req.id) {
        return await Controller.delete(req.id);
      }
    }
  } catch (error) {
    throwError(res, error)
  }
};
