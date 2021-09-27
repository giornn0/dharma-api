const { validationError, throwError,} = require("../../response");
const { rules, uptRules} = require("../models/pagos.model");
const { formatDate, formatMoney } = require("../services/helper.services");
const { queries } = require("../services/pagos.services");
const { Controller } = require("./root.controller");

class PagosController extends Controller {
  constructor(res) {
    super(Controller);
    new Controller(this,'pagos',this.res,rules,uptRules,queries,'pago')
    this.res = res
    this.section = 'pagos'
    this.rules= rules
    this.uptRules = uptRules
    this.queries = queries
    this.unity = 'pago'

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

  async store(pago) {
    try {
      pago.monto = formatMoney(pago.monto)
      if (await this.validation(pago)) {
        pago.fecha_pago = formatDate(pago.fecha_pago)
        return  this.create(pago,`${pago.fecha_pago} / ${pago.monto}`)
      }
      return validationError(this.res,this.error);
    } catch (error) {
      return throwError(this.res, error)      
    }
  }

  async show(id) {
    return await this.getOne(id)
      
  }
  async update(pago, id) {
    try {
      pago.monto = formatMoney(pago.monto)
      if (this.validation(pago,true)) {
        pago.fecha_pago = formatDate(pago.fecha_pago)
        return await this.patch(pago,id,`${pago.fecha_pago} / ${pago.monto}`)
      }
      return validationError(this.res,this.error)
    } catch (error) {
      return throwError(this.res, error)      
    }
  }
  async delete(id){
    return await this.erase(id)
  }

  async getRelation(relation,id){
    return await this.getRelationOne(relation,id)
  }

  async postImage(image,id){
  return await this.passImage(image,id)
}
}

module.exports = {
  PagosController,
};
