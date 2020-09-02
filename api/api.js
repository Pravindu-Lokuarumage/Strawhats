const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');
const User = require('./models/user');
const Profile = require('./models/profile')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const port = 5000;

mongoose.connect("mongodb+srv://Pravindu:1234567890@cluster0.mbsfj.mongodb.net", {
		useNewUrlParser:true, 
		useUnifiedTopology: true 
});

app.get('/api/test', (req, res) => {
    res.send('The API is working!');
});
app.get('/api/profile/:user', (req, res) => {
    const { user } = req.params;
    Profile.find({"user":user}, (err, profile) => {
            return err
            ? res.send(err)
            : res.send(profile);
        }
    )
});
app.post('/api/profile', (req, res) =>{
    const {user, height, weight, age, gender} = req.body;
    const NewProfile = new Profile({
        user,
        height,
        weight,
        age,
        gender
    });
    NewProfile.save(err =>{
        return err
 		? res.send(err)
 		: res.json({
 			success: true,
 			message: 'Created new user'
 		});
    })
});
app.listen(port, () => {
 console.log(`listening on port ${port}`);
});
