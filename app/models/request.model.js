const { throwError } = require("../../response");

class Request {
  queryParamsRegex = /^(page=[0-9]+)?&?(take=[0-9]+)?&?(search=[a-zA-Z0-9]+)?&?(category_search=[a-zA-Z+]+)?$/
  routeRegex = /^\/(users|clientes|contratos|pagos|vendedores|login)\/?([0-9]+)?\/?(clientes|pagos|contratos|images)?$/

  constructor(req,res) {
    try {
      this.method = req.method;
      this.route = req.url.split('?')[0].match(this.routeRegex)
  
      this.section = this.route?this.route[1]:undefined
        this.id = this.route?this.route[2]:undefined
        this.relation = this.route?this.route[3]:undefined
        this.queryParams = req.url.split('?')[1]? req.url.split('?')[1].match(this.queryParamsRegex) : null
  
       this.page= this.queryParams && this.queryParams[1]? this.queryParams[1].split('=')[1]+'' :undefined
        this.take= this.queryParams && this.queryParams[2]? this.queryParams[2].split('=')[1]+'' :undefined
        this.search= this.queryParams && this.queryParams[3] ? this.queryParams[3].split('=')[1]+'' :undefined
        this.category_search=  this.queryParams && this.queryParams[4] ? this.queryParams[4]+'' :undefined
        this.authorization = req.headers.authorization && req.headers.authorization.split(' ').length>0 ? req.headers.authorization.split(' ')[1] : undefined

    } catch (error) {
      throwError(res, error)      
    }
      
  }
}

module.exports={
    Request
}