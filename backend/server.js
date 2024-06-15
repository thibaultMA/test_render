import express from "express"
import {routers} from "./routes/router.js"
import { startCache } from "./controller/cache.js"
const port = process.env.PORT || 3001;
startCache()
export const app = express()

app
.use(express.text())
.use(express.json())
.use(express.urlencoded({extended:false}))
.use(express.static('./view'))
.set("views","./view/template")
.set("view engine","ejs")

.use("/",routers)



const server = app.listen(port, () => console.log(`Example app listening on port http://localhost:${port} !`));
server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;
