import express  from "express"
const app = express()
import * as dotenv from 'dotenv'
dotenv.config()


class Server {

    constructor() {
        this.app = app;
        this.port = process.env.PORT;

        this.routes()
    }

    routes() {
        this.app.get('/', function (req, res) {
            res.send('Hello World')
          })
    }

    listen() {
        this.app.listen(this.port, ()=>{
            console.log(`servidor corriendo en puerto ${this.port}`)
        })
    }

}

export{
    Server
}