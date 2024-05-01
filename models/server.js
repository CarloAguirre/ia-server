import express from 'express'
import axios from 'axios'
import cors from 'cors'
import * as dotenv from 'dotenv'
import OpenAI from "openai";

dotenv.config()


class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.APIKEY = process.env.APIKEY;
        this.middlewares();
        this.routes();
    }
    
    routes() {
        this.app.post('/api/gpt', async (req, res) => {
            const { tag } = req.body;
            const openai = new OpenAI({ apiKey: this.APIKEY });
            
            try {
              let text;
              async function main() {
                const completion = await openai.chat.completions.create({
                    messages: [{
                        role: "system",
                        content: `puedes darme referencia concretas entre ${tag} con al menos 8 referencias bíblicas VERDADERAS (no inventes nada)?, es decir, contrasta capítulos, libros o referencias y explica brevemente (maximo: 336 caracteres) sus relaciones. Por favor, devuelve esto en la estructura de un json de tipo: [{"concordancia": libro capitulo versiculos, "relacion": aqui va la explicacion de como ambos se relacionan, "libro": nombre del libro, "capitulo": capitulo que contiene al versiculo}]. Si no existen referencias o ${tag} es una expresion que NO APARECE EN LA BIBLIA, entonces devuelve lo siguiente: [{}]... recuerda responder en el formato pedido ya que tu respuesta sera manejada de la siguiente manera:
                        const responseText = completion.choices[0].message.content;
                        const concordancias = JSON.parse(responseText);
                        res.status(200).json( concordancias );....por lo que tu respuesta siempre deben ser objetos dentro de un array`
                    }],
                    model: "gpt-3.5-turbo",
                });
                
                const responseText = completion.choices[0].message.content;
                const concordancias = JSON.parse(responseText); // Parsea el texto JSON a un objeto
            
                res.status(200).json( concordancias );
            }
            
            main();
                
            } catch (error) {
                res.status(500).send(error);
            }
        });
    }
    
    middlewares() {
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