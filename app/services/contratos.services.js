
function createQuery(keys){
    let numberKeys = '' 
    keys.forEach(key=>numberKeys +='?,')
    return `INSERT INTO contratos(${keys.join(' , ')})VALUES(${numberKeys.slice(0,-1)})`
}
function updQuery(keys){
   return `UPDATE contratos SET ${keys.join(' = ?, ').concat('= ? ')} WHERE contrato_id=?`
}
module.exports={
    queries:{ 
        all:`SELECT * FROM  contratos`,
        erase:`DELETE FROM contratos  WHERE contrato_id=?`,
        show:`SELECT * FROM contratos WHERE contrato_id=?`,
        search:`SELECT * FROM contratos WHERE numero_contrato LIKE ? LIMIT ?,?`,
        countSearch:`SELECT COUNT(*) FROM contratos WHERE numero_contrato LIKE ?`,
        paginate:`SELECT * FROM contratos LIMIT ?,?`,
        count: `SELECT COUNT(*) FROM contratos`,
        postImage:`UPDATE contratos SET files=? WHERE contrato_id=?`,
        createQuery,
        updQuery
    },    
}
