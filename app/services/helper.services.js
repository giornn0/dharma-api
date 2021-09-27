function formatDate(date){
    const fecha = new Date(date);
    const dateDB =  [
        fecha.getFullYear(),
        (fecha.getMonth() + 1).toString().length < 2
          ? "0" + (fecha.getMonth() + 1)
          : fecha.getMonth() + 1,
        fecha.getDate(),
      ].join("-");
      return dateDB.includes('N')? date.split('/').reverse().join('-'): dateDB
}

function formatMoney(money){
  return parseFloat(money .replace(/[$]/,''))
}
function formatMeasure(measure, unity){
  const regex = new RegExp(`\\s${unity}$`,'gi')
  return parseFloat(measure.replace(regex,''))
}

module.exports = {
    formatDate,
    formatMoney,
    formatMeasure
}