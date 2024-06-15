import { throwCustomMessage } from "../utils/error.js";

export function checkBody(req,res,next) {
    try {
        req.body = JSON.parse(req.body)
        if(req.body != []) next()
        
    } catch (error) {
        throwCustomMessage(400,res,error)
    }
}