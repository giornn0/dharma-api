const uptRules = {
  contrato_id:[/^[0-9]{1,12}$/,true],
  medio_pago:[/^[0-9]{1,12}$/,true],
  monto:[/^[0-9.,]{1,12}$/,true],
  nro_aporte:[/^[0-9]{1,12}$/,true],
  // fecha_pago:[/^\d\d-\d\d-\d\d\d\d$/,true]
}
const rules = {
  contrato_id:[/^[0-9]{1,12}$/,true],
  medio_pago:[/^[0-9]{1,12}$/,true],
  nro_aporte:[/^[0-9]{1,12}$/,true],
  monto:[/^[0-9.,]{1,12}$/,true],
  type_comprobante:[/^[a-zA-Z/]{1,25}$/,false],
  // fecha_pago:[/^\d\d-\d\d-\d\d\d\d$/,true]
}

module.exports = {
  uptRules,
  rules
};
