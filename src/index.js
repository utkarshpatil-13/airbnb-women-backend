import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import connectDB from './db/index.js'
import userRouter from './routes/user.routes.js'

// creating app
const app = express()

// configure env
dotenv.config({
    path: './.env'
});

//middlewares
app.use(cors({
    origin: process.env.CORS_ORIGIN
}));
app.use(express.json({limit: "16kb"}));
app.use(express.urlencoded({extended: true, limit: "16kb"}));
app.use(express.static('public'));
app.use(cookieParser());

// routes
app.use('/api/user', userRouter);

// connecting DB
connectDB()
.then(() => {
    app.listen(process.env.PORT, () => {
        console.log("Server is listening is PORT", process.env.PORT);
    })

    app.on('error', (error) => {
        console.log('Error while connecting to the server', error);
    })
})
.catch((error) => {
    console.log("MongoDB connection Failed!!!", error);
})

// mongoose.connect(process.env.MONGODB_URI);

// app.get('/test', (req, res) => {
//     res.json('test ok');
// }) 

// app.post('/register', (req, res) => {
//     const {name, email, password} = req.body;
//     res.json({name, email});
// })

// app.listen(process.env.PORT);