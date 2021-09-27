
function createQuery(keys){
    let numberKeys = '' 
    keys.forEach(key=>numberKeys +='?,')
    return `INSERT INTO clientes(${keys.join(' , ')})VALUES( ${numberKeys.slice(0,-1)})`
}
function updQuery(keys){
   return `UPDATE clientes SET ${keys.join(' = ?, ').concat(' = ?')} WHERE cliente_id=?`
}

module.exports={
    queries:{ 
        all:`SELECT * FROM  clientes`,
        erase:`DELETE FROM clientes  WHERE cliente_id=?`,
        show:`SELECT * FROM clientes WHERE cliente_id=?`,
        search:`SELECT * FROM clientes WHERE nombre LIKE ? LIMIT ?,?`,
        countSearch:`SELECT COUNT(*) FROM clientes WHERE nombre LIKE ?`,
        paginate:`SELECT * FROM clientes LIMIT ?,?`,
        count: `SELECT COUNT(*) FROM clientes`,
        postImage:`UPDATE clientes SET picture=? WHERE cliente_id=?`,
        createQuery,
        updQuery
    },
}
