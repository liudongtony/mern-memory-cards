import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

import postRoutes from './routes/posts.js';
import dotenv from 'dotenv';

const app = express();
dotenv.config();
app.use(bodyParser.json({limit:'30mb', extended: true}));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());

const DB_CONNCTION = 'mongodb+srv://admin:admin@nodejs.iv2ey.mongodb.net/test?retryWrites=true&w=majority';
const PORT = process.env.PORT || 5000;

app.use('/posts', postRoutes);
app.use('/', (req,res)=>res.send('Hello to Memories API'))

mongoose.connect(DB_CONNCTION, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(app.listen(PORT, ()=>console.log(`Server running on port ${PORT}`)))
    .catch(err=>console.log(err.message));
