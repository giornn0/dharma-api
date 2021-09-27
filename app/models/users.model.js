 const rules = {
  name:[/[a-zA-Z\s]{4,30}/,true],
  last_name:[/[a-zA-Z\s]{4,30}/,true],
  email:[/^[a-zA-Z0-9-.]{6,20}@[a-zA-Z0-9-]+\.(com|net|org|)/,true],
  password:[/^[a-zA-Z\s0-9$]{6,30}$/,true],
}

const uptRules = {
  name:[/[A-Z]{4}/,true],
  last_name:[/[1-9]+/,true],
}

module.exports = {
  rules, uptRules
}