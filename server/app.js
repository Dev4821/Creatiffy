const express=require('express');
const cookieParser =require('cookie-parser')
const bodyParser =require('body-parser')
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")
const cors=require('cors')
const app =express()
// import schemas
const Users =require('./models/userSchema')

const Post =require('./models/postSchema')

// connect to db
require('./db/connection') 


// Import MiddleWare
const authenticate =require('./middleware/auth')
app.use(bodyParser.json());
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cookieParser())
app.use(cors())
const port =process.env.PORT ||8000;

app.post('/api/register', async (req,res,next)=>{
    try{
    const {username ,email,password}=req.body;

    const isExit= await Users.findOne({email});
    if(isExit)
    {
        console.log('enter')
        console.log(isExit)
        res.status(400).send('User already exits');
    }
    else{
        const user=new Users({
            username,
            email
        })
        
        bcryptjs.hash(password,10,(err,hashedPassword)=>{
            if(err) next(err) 
            user.set('password',hashedPassword)
            user.save().then(()=>{
                res.status(200).send('successfully registered');
            }).catch((err)=>{
                console.log(err);
            })
        })

     
    }
} catch(error){
    res.status(500).send('Server Error')
    console.log(error,'error');
}
})
app.post('/api/login',async (req,res)=>{
    const {email,password}=req.body;
    const user =await Users.findOne({email});
    if(!user){
        res.status(401).send('User or password is in invalid')
    }
    else
    {
        const validate=await bcryptjs.compare(password,user.password)
        if(!validate)
        {
            res.status(401).send('User or password is invalid')

        }else{
            const payload ={
                id:user._id,
                username:user.username
            }
            const JWT_SECRET_KEY=process.env.JWT_SECRET_KEY ||'THIS_IS_THE_SECRET_KEY_OF_JWT';
            jwt.sign(
                payload,
                JWT_SECRET_KEY,
                {expiresIn:86400},
                (err,token)=>{
                    if(err){ res.json({message: err})
                    
                }
                    else{ 
                        
                    return res.status(200).json({ user,token})}
                }
            )
           

        }
    }
})

app.post('/api/new-post',authenticate,async(req,res)=>{
    try{
        const{caption,desc,url}=req.body
        const{user}=req
        if(!caption ||!desc|| !url)
        {
            res.status(400).send('Please fill all the fields')
        }
        const createPost= new Post({

            caption, 
            description:desc,
            image:url,
            user:user
             
        })
        await  createPost.save()
        res.status(200).send('Create post Successfully')

    }
    catch(error){
        res.status(500).send('Error' + error) 
    }
})
app.listen(port,()=>{
    console.log('Server is running');
})