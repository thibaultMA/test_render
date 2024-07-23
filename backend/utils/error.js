export function throwCustomMessage(status,res,error) {
    res.status(status).json({code:status,message : error.message,customMessage:"le body n'est pas au bon format"})
}