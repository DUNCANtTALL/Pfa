const express = require('express')
const app = express();
const cors = require('cors');
const mongoose = require('mongoose')

const User = require('./User.js');
app.use(cors());
app.use(express.json());


const mongoUrl = "mongodb+srv://mohammed:adminfarhan@cluster0.2bxgvbw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

mongoose.connect(mongoUrl).then(()=>{
    console.log("connected to database");
}).catch((e)=>{
    console.log(e);
})

app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
  
    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).send({ error: 'Email already in use' });
      }
  
      const user = new User({ name, email, password });
      await user.save();
  
      res.status(201).send({ message: 'User registered successfully', user });
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  });

  app.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await User.findOne({ email: email, password });
  
      if (!user) {
        return res.status(401).send({ error: 'Invalid username or password' });
      }
  
      res.status(200).send({ message: 'Login successful', user });
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  });

app.get('/', (req, res) => {
    res.send('Hello, world!');
  });

app.listen(5003,() => {
    console.log('server is running')
});