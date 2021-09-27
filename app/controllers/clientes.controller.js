const { validationError, throwError,} = require("../../response");
const { rules, uptRules } = require("../models/clientes.model");
const { formatDate } = require("../services/helper.services");
const { Controller } = require("./root.controller");
const { queries } = require("../services/clientes.services")

class ClientesController extends Controller {
  constructor(res) {
    super(Controller);
    new Controller(this,'clientes',this.res,rules,uptRules,queries,'cliente')
    this.res = res
    this.section = 'clientes'
    this.rules= rules
    this.uptRules = uptRules
    this.queries = queries
    this.unity = 'cliente'
  }

  async index() {
    const data = await this.All();
    return {data};
  }
  async page(page,take,search){
    if(!search){
      return await this.paginate(page,take)
    }
    return await this.paginateSearch(search,page,take)
  }

  async store(cliente) {
    try {
      if (await this.validation(cliente)) {
          cliente.fecha_nacimiento = formatDate(cliente.fecha_nacimiento)
          return  this.create(cliente,`${cliente.nombre} ${cliente.apellido}`)      
        }
        return validationError(this.res,this.error);
    } catch (error) {
      return throwError(this.res, error)      
    }
  }

  async show(id) {
    return await this.getOne(id)
      
  }
  async update(cliente, id) {
    try {
      if (this.validation(cliente,true)) {
          cliente.fecha_nacimiento = formatDate(cliente.fecha_nacimiento)
          return await this.patch(cliente,id,`${cliente.nombre} ${cliente.apellido}`)
          
        }
        return validationError(this.res,this.error)
    } catch (error) {
      return throwError(this.res, error);      
    }
  }
  async delete(id){
    return await this.erase(id)
  }

  async postImage(image,id){
    return await this.passImage(image,id)
  }
}

module.exports = {
  ClientesController,
};
