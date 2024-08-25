import express from 'express'
import bcrypt from 'bcrypt'

const app = express()
const port = 8888

app.use(express.json())


app.post('/register', async(req, res) =>{
    const {username, password} = req.body

    const hashedPassword = await bcrypt.hash(password, 10)

    res.json({
        username,
        password: hashedPassword
    })
})


app.listen(port, (req, res) =>{
    console.log(`server started at http://localhost:${port}`)
})