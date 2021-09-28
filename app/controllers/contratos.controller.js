const { validationError, throwError,} = require("../../response");
const { rules, uptRules} = require("../models/contratos.model");
const { formatDate, formatMoney, formatMeasure } = require("../services/helper.services");
const {queries} = require("../services/contratos.services");
const { Controller } = require("./root.controller");

class ContratosController extends Controller {
  constructor(res) {
    super(Controller);
    new Controller(this,'contratos',this.res,rules,uptRules,queries,'contrato')
    this.res = res
    this.section = 'contratos'
    this.rules= rules
    this.uptRules = uptRules
    this.queries = queries
    this.unity = 'contrato'
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

  async store(contrato) {
    try {
      console.log(contrato, !null)
      contrato.valor_mt2 = formatMoney(contrato.valor_mt2)
      contrato.mt2_cubiertos= formatMeasure(contrato.mt2_cubiertos,'mt²')
      contrato.mt2_semicubiertos= formatMeasure(contrato.mt2_semicubiertos,'mt²')
      contrato.mt2_totales= formatMeasure(contrato.mt2_totales,'mt²')
      if (await this.validation(contrato)) {
          contrato.fecha_contrato= formatDate(contrato.fecha_contrato)
          return  this.create(contrato,`${contrato.numero_contrato}`)
          
        }
        return validationError(this.res,this.error);
    } catch (error) {
      return throwError(this.res, error)     
    }
  }

  async show(id) {
    return await this.getOne(id)
      
  }
  async update(contrato, id) {
    try {
      contrato.valor_mt2 = formatMoney(contrato.valor_mt2)
      contrato.mt2_cubiertos= formatMeasure(contrato.mt2_cubiertos,'mt²')
      contrato.mt2_semicubiertos= formatMeasure(contrato.mt2_semicubiertos,'mt²')
      contrato.mt2_totales= formatMeasure(contrato.mt2_totales,'mt²')
      if (this.validation(contrato,true)) {
          contrato.fecha_contrato= formatDate(contrato.fecha_contrato)
          return await this.patch(contrato,id,`${contrato.numero_contrato}`)
          
        }
        return validationError(this.res,this.error)      
    } catch (error) {
      return throwError(this.res, error)
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
  ContratosController,
};
