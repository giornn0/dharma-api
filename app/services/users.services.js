
function createQuery(keys){
    let numberKeys = '' 
    keys.forEach(key=>numberKeys +='?,')
    return `INSERT INTO users(${keys.join(' , ')})VALUES( ${numberKeys.slice(0,-1)})`
}
function updQuery(keys){
    return `UPDATE users SET ${keys.join('=?, ').concat(' = ?')} WHERE user_id=?`
}



module.exports={
    queries:{ 
        all:`SELECT * FROM  users`,
        erase:`DELETE FROM users  WHERE user_id=?`,
        show:`SELECT * FROM users WHERE user_id=?`,
        search:`SELECT * FROM users WHERE name LIKE ? LIMIT ?,?`,
        countSearch:`SELECT COUNT(*) FROM users WHERE name LIKE ?`,
        paginate:`SELECT * FROM users LIMIT ?,?`,
        count: `SELECT COUNT(*) FROM users`,
        createQuery,
        updQuery
    }   
}