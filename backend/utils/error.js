export function throwCustomMessage(status,res,error) {
    res.status(status).json({code:status,message : error.message})
}