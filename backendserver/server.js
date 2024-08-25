import express from 'express'
import bcrypt from 'bcrypt'
import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import cors from 'cors'

const app = express()
const port = 8888

const URI = 'mongodb+srv://pavatnon:drakzone123@learningdb.h12he.mongodb.net/LoginAuthProject?retryWrites=true&w=majority&appName=LearningDB'
const secret = 'pavatnon'
app.use(express.json())
app.use(cors({
    origin: 'http://localhost:5173'
}))

const userShema = new mongoose.Schema({
    username:{ type: String, require:true },
    password:{ type: String, require:true },
    role:{ type: String, require:true },

}, {collection: 'userdatas'})

const User = mongoose.model('userdatas', userShema)

const userAuth = async(req, res, next) =>{
    const token = req.headers['authorization']
    if(!token){
        throw new Error('have not token')
    }

    try {
        const authUser = await jwt.verify(token.split(' ')[1], secret)
        

        if(!authUser){
            throw new Error('Invalid token')
        }

        const getUser = await User.findOne({username: authUser.username})

        if (getUser.role !== 'admin') {
            return res.status(403).json({
                error: 'Access denied. You do not have the required role.'
            });
        }

        req.user = getUser
        next()

    } catch (error) {
        console.log(error.message)
        res.status(401).json({
            error: error.message
        })
    }

}
app.get('/test', userAuth, (req, res) =>{
    const getdata = req.user

    res.json(getdata)
})

app.post('/register', async(req, res) =>{
    const {username, password} = req.body

    try{
        const userChaeck = await User.findOne({username})
        
        if(userChaeck){
            throw new Error('Username already exists')
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = new User({
            username,
            password: hashedPassword,
            role: 'user'
        })

        user.save()
       
        res.status(200).json({
            message: 'Register Success'
        })
    }catch(error){  
        console.log(error.message)
        res.status(400).json({
            error: error.message
        })
    }

})

app.post('/login', async(req, res) =>{
    const {username, password} = req.body
    try {
        const userChaeck = await User.findOne({username})
        if(!userChaeck){
            throw new Error('Username is not already')
        }

        const user = userChaeck
        const passCheck = await bcrypt.compare(password, user.password)
        if(!passCheck){
            throw new Error('Password is not match')
        }  

        const token = await jwt.sign({
            username,
        },secret)
        
        res.status(200).json({
            message: 'Login Success',
            token: token
        })
        

    } catch (error) {
        console.log(error.message)
        res.status(400).json({
            error: error.message
        })
    }
})


app.listen(port, async(req, res) =>{
    try {
        const conn = await mongoose.connect(URI)
        console.log('DB connceted')
        console.log(`server started at http://localhost:${port}`)
    } catch (error) {
        console.log(error)
        res.status(501).json({
            error: error.message
        })
    }
})