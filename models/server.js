import express from 'express'
import axios from 'axios'
import cors from 'cors'
import * as dotenv from 'dotenv'
dotenv.config()


class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.APIKEY = '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';

        this.middlewares();
        this.routes();
    }
    
    routes() {
        this.app.post('/api/gpt', async (req, res) => {
            const { input } = req.body;
            
            try {
                const response = await axios.post('https://api.openai.com/v1/engines/text-davinci-003/completions', {
                    prompt: input,
                    max_tokens: 150,
                    temperature: 0.5,
                }, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${this.APIKEY}`,
                    },
                });
                
                const text = response.data.choices[0].text;
                
                res.status(200).send(text);
            } catch (error) {
                res.status(500).send(error);
            }
        });
    }
    
    middlewares (){
        this.app.use(express.json());    
        this.app.use(cors());
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