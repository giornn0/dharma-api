module.exports={
    queries:{
        getBalance:`SELECT YEAR(fecha_pago) as año , month (fecha_pago)as mes, SUM(monto)as ingreso FROM pagos GROUP BY year(fecha_pago),MONTH(fecha_pago);`,
    }

}