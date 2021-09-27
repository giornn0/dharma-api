
function createQuery(keys){
    let numberKeys = '' 
    keys.forEach(key=>numberKeys +='?,')
    return `INSERT INTO pagos(${keys.join(' , ')})VALUES( ${numberKeys.slice(0,-1)})`
}
function updQuery(keys){
   return `UPDATE pagos SET  ${keys.join(' = ?, ').concat(' = ? ')} WHERE pago_id=?`
}
function getRelationQuery(relation){
    return `SELECT * FROM pagos WHERE ${relation.slice(0,-1)}_id=? ORDER BY fecha_pago DESC `
}
module.exports={
    queries:{ 
        all:`SELECT * FROM  pagos`,
        erase:`DELETE FROM pagos  WHERE pago_id=?`,
        show:`SELECT * FROM pagos WHERE pago_id=?`,
        search:`SELECT * FROM pagos WHERE name LIKE ? LIMIT ?,?`,
        countSearch:`SELECT COUNT(*) FROM pagos WHERE name LIKE ?`,
        paginate:`SELECT * FROM pagos LIMIT ?,?`,
        count: `SELECT COUNT(*) FROM pagos`,
        postImage:`UPDATE pagos SET comprobante=? WHERE pago_id=?`,
        createQuery,
        updQuery,
        getRelationQuery
    },
    
}
