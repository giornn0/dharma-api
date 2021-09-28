const uptRules = {
  numero_contrato:[/^[a-zA-Z \s0-9-]{3,30}$/,true],
  tipo_contrato:[/^[a-zA-Z\s0-9-]{3,30}$/,true],
  cliente_id:[/^[0-9]{1,12}$/,true],
  vendedor_id:[/^[0-9]{1,12}$/,true],
  valor_mt2:[/^[0-9,.]{1,12}$/,true],
  observaciones:[/^[a-zA-Z\s0-9-]{3,200}$/,false],
  tipo_construccion:[/^[a-zA-Z\s]{3,30}$/,true],
  tipologia:[/^[a-zA-Z\s]{3,30}$/,true],
  financiacion:[/^[a-zA-Z\s]{3,30}$/,true],
  dormitorios:[/^[0-9]{1,12}$/,true],
  terminacion:[/^[a-zA-Z\s]{3,30}$/,true],
  mt2_cubiertos:[/^[0-9,.]{1,12}$/,true],
  mt2_semicubiertos:[/^[0-9,.]{1,12}$/,true],
  mt2_totales:[/^[0-9,.]{1,12}$/,true],
  type_files:[/^[a-zA-Z/]{1,25}$/,false],
}
const rules = {
  numero_contrato:[/^[a-zA-Z \s0-9-]{3,30}$/,true],
  tipo_contrato:[/^[a-zA-Z\s0-9-]{3,30}$/,true],
  cliente_id:[/^[0-9]{1,12}$/,true],
  vendedor_id:[/^[0-9]{1,12}$/,true],
  valor_mt2:[/^[0-9,.]{1,12}$/,true],
  observaciones:[/^[a-zA-Z\s0-9-]{3,200}$/,false],
  tipo_construccion:[/^[a-zA-Z\s]{3,30}$/,true],
  tipologia:[/^[a-zA-Z\s]{3,30}$/,true],
  dormitorios:[/^[0-9,.]{1,12}$/,true],
  terminacion:[/^[a-zA-Z\s]{3,30}$/,true],
  mt2_cubiertos:[/^[0-9,.]{1,12}$/,true],
  mt2_semicubiertos:[/^[0-9,.]{1,12}$/,true],
  mt2_totales:[/^[0-9,.]{1,12}$/,true],
  financiacion:[/^[a-zA-Z\s]{3,30}$/,true],
  type_files:[/^[a-zA-Z/]{1,25}$/,false],
}
module.exports = {
  uptRules,
  rules
}