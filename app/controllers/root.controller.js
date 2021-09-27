const { throwError, response } = require("../../response");
const { query } = require("../services/connection");


class Controller {
    error;
    constructor(section,res,rules , uptRules,queries,unity) {
        this.section = section
        this.res = res
        this.rules =rules;
        this.uptRules = uptRules;
        this.queries = queries;
        this.unity = unity
    }

    async validation(data,update=false){
        return Object.keys(update?this.uptRules:this.rules).every((key)=>{ 
            if(!data[key] && !this.rules[key][1]) return true //si el campo no es obligatorio
            if(data[key].toString().match(this.rules[key][0])) return true //si el campo es valido acorde al regex
            this.error = `Error en el parametro ${key} del elemento posteado`
            return false
        })
    }

  async paginateSearch(search,page,take){
    try {
      const {returnPage} = require("../services/pagination.services")
      const searchValue = '%'.concat(search.split('').join('%'),'%')
      const offset = ((parseInt(page)-1)*parseInt(take))+''
      const count = await query(this.queries.countSearch,[searchValue]).then(res=>{return res[0]['COUNT(*)']})
      let data = undefined
      if(count) data = await query(this.queries.search,[searchValue,offset,take])
      return returnPage(data,count,page,take,this.res)   
    } catch (error) {      
      return throwError(this.res, error);
    }
  }
  async paginate(page,take){
    const {returnPage} = require("../services/pagination.services")
    try {
      if (take<5) take='30';
      const offset = ((parseInt(page)-1)*parseInt(take))+''
      const count = await query(this.queries.count).then(res=>{return res[0]['COUNT(*)']})
      let data = undefined
      if(count) data =await query(this.queries.paginate,[offset,take] )
      return returnPage(data,count,page,take,this.res)
    } catch (error) {
      return throwError(this.res, error);
    }
  }

  async All(){
      return await query(this.queries.all).then(res=>{
        return response(this.res,res,200)
      }).catch(error=>{
          return throwError(this.res, error)
      })
  }

async getOne(id){
    return await query(this.queries.show,[id]).then(res=>{
       return response(this.res,res,200,)
    }).catch(error=>{
       return throwError(this.res, error);
    })
  
}
async create(model,inMessage){
  delete model[`${this.unity}_id`]
    const createQuery = this.queries.createQuery(Object.keys(model))
     return await query(createQuery,Object.values(model)).then(res=>{
       return response(this.res,res,201,`${this.unity.charAt(0).toUpperCase()+this.unity.slice(1)} ${inMessage} creado satisfactoriamente!`)
     }).catch(
       error=>{
         return throwError(this.res, error);
       }
     )
}
async patch(model,id,inMessage){
  delete model[`${this.unity}_id`]
  const updQuery = this.queries.updQuery(Object.keys(model))
    return await query(updQuery,Object.values(model).concat(id)).then(res=>{
       return response(this.res,res,202,`${this.unity.charAt(0).toUpperCase()+this.unity.slice(1)} ${inMessage} editado satisfactoriamente!`)
    }).catch(error=>{
      return throwError(this.res, error);
    })
}
async erase(id){
    return await query(this.queries.erase,[id]).then(res=>{
       return response(this.res,res,202,`${this.unity.charAt(0).toUpperCase()+this.unity.slice(1)} eliminado correctamente!`)
    }).catch(error=>{
      return throwError(this.res, error);
    })
  }


  async getRelationOne(relation,id){
    const getRelationQuery = this.queries.getRelationQuery(relation)
    return await query(getRelationQuery,[id]).then(res=>{
      return response(this.res,res,200,)
    }).catch(error=>{
      return throwError(this.res, error)
    })
  }

  async passImage(image,id){
    return await query(this.queries.postImage,[image,id]).then(res=>{
      return response(this.res,res,201,`Foto de ${this.unity} cargada correctamente!!`)
    }).catch(error=>{
      return throwError(this.res, error)
    })
  }

}

module.exports = {
    Controller
}