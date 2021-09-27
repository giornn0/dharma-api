
function createQuery(keys){
    let numberKeys = '' 
    keys.forEach(key=>numberKeys +='?,')
    return `INSERT INTO vendedores(${keys.join(' , ')})VALUES( ${numberKeys.slice(0,-1)})`
}
function updQuery(keys){
   return `UPDATE vendedores SET ${keys.join(' = ?, ').concat(' = ?')} WHERE vendedor_id=?`
}

module.exports={
    queries:{ 
        all:`SELECT * FROM  vendedores`,
        erase:`DELETE FROM vendedores  WHERE vendedor_id=?`,
        show:`SELECT * FROM vendedores WHERE vendedor_id=?`,
        search:`SELECT * FROM vendedores WHERE name LIKE ? LIMIT ?,?`,
        countSearch:`SELECT COUNT(*) FROM vendedores WHERE name LIKE ?`,
        paginate:`SELECT * FROM vendedores LIMIT ?,?`,
        count: `SELECT COUNT(*) FROM vendedores`,
        postImage:`UPDATE vendedores SET picture=? WHERE vendedor_id=?`,
        createQuery,
        updQuery
    },
    
}
