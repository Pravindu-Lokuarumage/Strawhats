const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');
const User = require('./models/user');
const Profile = require('./models/profile');
const Review = require('./models/reviews');
const Data = require('./models/data');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const port = 5000;

mongoose.connect("mongodb+srv://strawHats:zX9.5stzTe@nJ8j@cluster0.r2r2h.mongodb.net", {
		useNewUrlParser:true, 
		useUnifiedTopology: true 
});
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-RequestedWith, Content-Type, Accept");
    next();
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
app.get('/api/data/:user', (req, res) => {
    const { user } = req.params;
    Data.find({"user":user}, (err, data) => {
            return err
            ? res.send(err)
            : res.send(data);
        }
    )
});
app.get('/api/review', (req, res) => {
    Review.find({}, (err, reviews) => {
            return err
            ? res.send(err)
            : res.send(reviews);
        }
    )
});
app.post('/api/data/:user', (req, res) => {
    const {heartrate,stepsperd} = req.body;
    const { user } = req.params;
    Data.findOne({ user: user}, (error, username) => {
        if (username == null) {
            const NewData = new Data({
                user
                //heartrate:{heartrate,time}
            });
            NewData.save(err =>{
                return err
                 ? res.send(err)
                 : res.json({
                     success: true,
                     message: 'Created new data'
                 });
            })
        } else {
            const time = new Date();
            if (heartrate !== undefined){
                username.heartrate.push({heartrate, time});
            }

            if (stepsperd !== undefined){
                username.stepsperd.push({stepsperd, time});
            }
            username.save(err =>{
                return err
                 ? res.send(err)
                 : res.json({
                     success: true,
                     message: 'updated data'
                 });
            })
        }
    })
})
app.post('/api/authenticate', (req, res) => {
    const { user, password } = req.body;
    User.findOne({ user, password }, (error, user) => {
        if (user == null) {
            return res.json({ error: "Incorrect username or password", user: user })
        } else {
            return res.json({
                success: true,
                message: 'Authenticated successfully',
            });
        }
    })
})
app.post('/api/registration', (req, res) => {
    const { user, password} = req.body;
    User.findOne({ user: user }, (error, username) => {
        if (username == null) {
        	const newUser = new User({
			 user,
			 password
			});
			newUser.save(err => {
 				return err
 				? res.send(err)
 				: res.json({
 					success: true,
 					message: 'Created new user'
 				});
			});
        } else {
            return res.json({ error:"User already exists"})
        }
    })
})

app.post('/api/profile', (req, res) =>{
    const {user, name, height, weight, age, gender} = req.body;
    const NewProfile = new Profile({
        user,
        name,
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
 			message: 'Created new profile'
 		});
    })
});
app.post('/api/review', (req, res) =>{
    const likes = 0;
    const {user, comment} = req.body;
    const NewReview = new Review({
        user,
        comment,
        likes
    });
    NewReview.save(err =>{
        return err
 		? res.send(err)
 		: res.json({
 			success: true,
 			message: 'Created new review'
 		});
    })
});
app.listen(port, () => {
 console.log(`listening on port ${port}`);
});
