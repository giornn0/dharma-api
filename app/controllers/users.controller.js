const { validationError, throwError,} = require("../../response");
const { rules, uptRules } = require("../models/users.model");
const { Controller } = require("./root.controller");
const { queries } = require("../services/users.services")

class UsersController extends Controller {
  constructor(res) {
    super(Controller);
    new Controller(this,'users',this.res,rules,uptRules,queries,'user')
    this.res = res
    this.section = 'users'
    this.rules= rules
    this.uptRules = uptRules
    this.queries = queries
    this.unity = 'user'
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

  async store(user) {
    try {
      if (await this.validation(user)) {
        const bcrypt = require("bcrypt")
        user.password = await bcrypt.hash(user.password,10)
          return  this.create(user,`${user.name}`)      
        }
        return validationError(this.res,this.error);
    } catch (error) {
      return throwError(this.res, error)      
    }
  }

  async show(id) {
    return await this.getOne(id)
      
  }
  async update(user, id) {
    try {
      if (this.validation(user,true)) {
          return await this.patch(user,id,`${user.name}`)
          
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
  UsersController,
};
