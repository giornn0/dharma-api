const rules = {
  nombre:[/[a-zA-Z\s]{3,30}/,true],
  apellido:[/[a-zA-Z\s]{3,30}/,true],
  email:[/^[a-zA-Z0-9-.]{4,20}@[a-zA-Z0-9-]+\.(com|net|org|)/,false],
  tipo_documento:[/^[0-9]{1,12}$/,true],
  numero_documento:[/^[0-9]{6,10}$/,true],
  profesion:[/^[a-zA-Z\s]{4,30}$/,false],
  phone:[/^[0-9]+$/,false],
  cellphone:[/^[0-9]+$/,false],
  // fecha_nacimiento:[/^\d\d-\d\d-\d\d\d\d$/,true],
  domicilio_dni:[/^[a-zA-Z0-9-\s°]{4,50}$/,true],
  localidad:[/^[a-zA-Z0-9-\s°]{4,50}$/,true],
  codigo_postal:[/^[0-9]{1,12}$/,true],
  estado_civil:[/^[a-zA-Z\s]{3,30}$/,true],
}
const uptRules = { 
  nombre:[/^[a-zA-Z\s]{3,30}$/,true],
  apellido:[/^[a-zA-Z\s]{3,30}$/,true],
  estado_civil:[/^[a-zA-Z\s]{3,30}$/,true],
  email:[/^[a-zA-Z0-9-]{4,20}@[a-zA-Z0-9-]+\.(com|net|org|)$/,false],
  tipo_documento:[/^[0-9]{1,12}$/,true],
  numero_documento:[/^[0-9]{6,10}$/,true],
  profesion:[/^[a-zA-Z\s]{4,30}$/,false],
  phone:[/^[0-9]+$/,false],
  cellphone:[/^[0-9]+$/,false],
  estado_civil:[/^[a-zA-Z\s]{3,30}$/,true],
  // fecha_nacimiento:[/^\d\d-\d\d-\d\d\d\d$/,true],
  domicilio_dni:[/^[a-zA-Z0-9-\s°]{4,50}$/,true],
  localidad:[/^[a-zA-Z0-9-\s°]{8,50}$/,true],
  codigo_postal:[/^[0-9]+$/,true],
  type_picture:[/^[a-zA-Z/]{1,25}$/,false],
}

module.exports = {
  uptRules,
  rules,
};
