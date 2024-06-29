import express from 'express'
import { AppDataSource } from './data-source'

AppDataSource.initialize()
    .then(() => {
        const app = express()
        
        app.get("/", (req, res) => {
            res.send('foi nego')
        })
        
        app.listen(3000)

    })