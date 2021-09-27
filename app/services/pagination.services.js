const { headers } = require("../../response")

function returnPage(data,count,page,take,res){
    const totalResults=count
    const actualPage = parseInt(page)
    const totalPages =Math.ceil(totalResults/parseInt(take))
    const resultPerPage = data && data.length>count? data.length :count |0  
    res.writeHead(200, headers)
    res.write(JSON.stringify({
        data,
        pagination:{
            totalResults,
            actualPage,
            totalPages,
            resultPerPage
        }
    }))
    return res.end()
}
function searchData(){}

module.exports={
    returnPage
}