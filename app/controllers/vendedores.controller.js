const { validationError,} = require("../../response");
const { rules, uptRules} = require("../models/vendedores.model");
const { Controller } = require("./root.controller");
const {queries} = require("../services/vendedores.services")

class VendedoresController extends Controller {
  constructor(res) {
    super(Controller);
    new Controller(this,'vendedores',this.res,rules,uptRules,queries,'vendedor')
    this.res = res
    this.section = 'vendedores'
    this.rules= rules
    this.uptRules = uptRules
    this.queries = queries
    this.unity = 'vendedor'
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

  async store(vendedor) {
      if (await this.validation(vendedor)) {
        return  this.create(vendedor, `${vendedor.name} ${vendedor.last_name}`)        
      }
      return validationError(this.res,this.error);
  }

  async show(id) {
    return await this.getOne(id)
      
  }
  async update(vendedor, id) {
      if (this.validation(vendedor,true)) {
        return await this.update(vendedor,id, `${vendedor.name} ${vendedor.last_name}`)
        
      }
      return validationError(this.res,this.error)
  }
  async delete(id){
    return await this.erase(id)
  }

  async postImage(image,id){
    return await this.passImage(image,id)
  }
}

module.exports = {
  VendedoresController,
};
