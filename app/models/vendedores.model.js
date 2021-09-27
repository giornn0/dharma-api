
  const rules = {
    name:[/^[a-zA-Z\s]{4,30}$/,true],
    last_name:[/^[a-zA-Z\s]{4,30}$/,true],
    numero_documento:[/^[0-9]{6,10}$/,false],
  }
  
  const uptRules = {
    name:[/^[a-zA-Z\s]{4,30}$/,true],
    last_name:[/^[a-zA-Z\s]{4,30}$/,true],
    numero_documento:[/^[0-9]{6,10}$/,false],
    type_picture:[/^[a-zA-Z/]{1,25}$/,false],
  }

  module.exports = {
    rules,uptRules
  }