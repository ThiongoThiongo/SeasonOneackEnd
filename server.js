import express from 'express';
import path from 'path';
import adminRoute from './routes/adminRoute.js';
import agentRoute from './routes/agentRoute.js';
import clientResponse from './routes/clientResponse.js'
import {notFound, errorHandler} from './middleware/errorMiddleware.js';
import cookieParser from 'cookie-parser'
import Credit from './routes/credit.js'
import cors from 'cors'
import mongoose from 'mongoose';
import originalData from './routes/originalData.js';
import Supervisor from './routes/supervisor.js'
import dotenv from 'dotenv';
dotenv.config();
const app = express();

const port = process.env.PORT || 5000;


app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(
    cors({
      credentials: true,
      origin: ["http://localhost:3000", "http://localhost:3003",  "http://localhost:3004", 'http://127.0.0.1:5502', 'http://127.0.0.1:5502', 'https://admininstacart.onrender.com'],
    })
  );
app.use(cookieParser())
app.use('/api/agentRoute', agentRoute)
app.use('/api/adminRoute', adminRoute)
app.use('/api/login', clientResponse)
app.use('/api/card', Credit)
app.use('/api/instacart', originalData)
app.use('/api/supervisor', Supervisor)
mongoose.connect(`mongodb+srv://mikaayta:mikaayta@mikiasketema.yydobmk.mongodb.net/seasonOne?retryWrites=true&w=majority`
, {
    useNewUrlParser: true,
    useUnifiedTopology:true,
});

// mongodb+srv://thiongothiongo753:thiongothiongo@cluster0.l9t3l5u.mongodb.net/?retryWrites=true&w=majority
mongoose.connection.on('connected', ()=> {
    console.log('Database Connected to  '+ `mongodb+srv://mikaayta:mikaayta@mikiasketema.yydobmk.mongodb.net/seasonOne?retryWrites=true&w=majority`
    )})


app.get('/', (req, res) => res.send('server is ready' + port))

app.use(notFound)
app.use(errorHandler)
app.listen(port, () => console.log('listening on port', port))
