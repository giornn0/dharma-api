const { throwError, response  } = require('../../response')
const {query } = require('./connection')
const jwt = require('jsonwebtoken')
if(!process.env.PRODUCTION) dotenv = require('dotenv').config();

async function validateLogin(credentials){
    const user = await query(`SELECT user_id,role, password, name FROM users WHERE email = ?`,[credentials.email]).then(res=>{if(res){return res[0]}else return null})
    if(!user) return false
    const bcrypt = require('bcrypt')
    const valid = await bcrypt.compare(credentials.password,user.password)
    if(!valid) return false
    return user
}

async function logout(token,res){
    const jwt_id = jwt.decode(token,process.env.JWT_REF)
    const user_id = await query(`SELECT tokenable_id FROM personal_access_tokens WHERE refresh_token=?`,[token]).then(res=>{if(res[0])return res[0]['tokenable_id'];else return null})
    if(jwt_id &&jwt_id.user_id)await query(`DELETE FROM personal_access_tokens WHERE tokenable_id=?`,[jwt_id.user_id])
    if(!user_id || !jwt_id.user_id)return response(res,null,400,'DANGER, token  wrong or expired, contact support!')
    return response(res,null ,200,'Logout successfully!')
}
async function login(credentials,res){
    try {
        const logged = await validateLogin(credentials)
        if(!logged)return  response(res,null,401,'Credenciales erroneas!')
        const token = jwt.sign({logged},process.env.JWT_REF,{
            expiresIn: '1h'
        })
        await query(`DELETE FROM personal_access_tokens WHERE tokenable_id=?`,[logged.user_id])
        await query(`INSERT INTO personal_access_tokens(refresh_token,tokenable_id) VALUES (?,?)`,[token,logged.user_id])
        const version = process.env.VERSION
        const fecha = process.env.FECHA
        return response(res,{token,version,fecha},200,`Bienvenido ${logged.name}!!!`)
    } catch (error) {
        return throwError(res, error)
    }
}
async function refresh(token,res){
    if(!jwt.decode(token))return [false,1]
    const key = process.env.JWT_REF
    const user_id = await query(`SELECT tokenable_id FROM personal_access_tokens WHERE refresh_token=?`,[token]).then(res=>{if(res[0])return res[0]['tokenable_id'];else return null})
    if(!user_id)return [false,2]
    try {
        const valid = jwt.verify(token,process.env.JWT_REF)
    } catch (error) {
        return throwError(res, error)
    }
    return [true] 
}

module.exports = {
    login,
    logout,
    refresh,
    validateLogin,
}