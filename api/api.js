const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');
const User = require('./models/user');
const Profile = require('./models/profile');
const Review = require('./models/reviews');
const Data = require('./models/data');
const Event = require('./models/event');
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
app.use(express.static(`${__dirname}/public/generated-docs`));

app.get('/docs', (req, res) => {
 res.sendFile(`${__dirname}/public/generated-docs/index.html`);
});
/**
 * @api {get} /api/test SuccessString A string verifying success
 * @apiName TestingAPI
 * @apiGroup Test
 * @apiDescription This route is a test route to check the functionality of the api.
 * 
 * @apiSuccessExample {json} Success-Response:
 * {
 *      "The API is working!"
 * }
 * */
app.get('/api/test', (req, res) => {
    res.send('The API is working!');
});
/**
 * @api {get} /api/profile/:user    Request user profile
 * @apiName GetUserProfile
 * @apiGroup Profile
 * 
 * @apiParam {String} user      Unique username
 * 
 * @apiSuccessExample {json} Success-Response:
 * {
 *      "user": "Mary827",
 *      "name":"Mary Poppins",
 *      "height": 170,
 *      "weight": 60,
 *      "age": 27,
 *      "gender": "female"
 * }
 * @apiErrorExample {json} Error-Response:
 * {
 *      "User does not exist"
 * }
 * */
app.get('/api/profile/:user', (req, res) => {
    const { user } = req.params;
    Profile.find({"user":user}, (err, profile) => {
            return err
            ? res.send(err)
            : res.send(profile);
        }
    )
});
/**
 * @api {get} /api/profile    Request all user profile
 * @apiName GetProfiles
 * @apiGroup Profile
 * 
 * @apiParam {String} user      Unique username
 * 
 * @apiSuccessExample {json} Success-Response:
 * [
 * {
 *      "user": "Mary827",
 *      "name":"Mary Poppins",
 *      "height": 170,
 *      "weight": 60,
 *      "age": 27,
 *      "gender": "female"
 * },
 * {
 *      "user": "Bobby371",
 *      "name":"Bobby Prat",
 *      "height": 186,
 *      "weight": 73,
 *      "age": 34,
 *      "gender": "male"
 * }
 * ]
 * @apiErrorExample {json} Error-Response:
 * {
 *      "User does not exist"
 * }
 * */
app.get('/api/profile', (req, res) => {
    Profile.find({}, (err, profile) => {
            return err
            ? res.send(err)
            : res.send(profile);
        }
    )
});
app.get('/api/event', (req, res) => {
    Event.find({}, (err, event) => {
            return err
            ? res.send(err)
            : res.send(event);
        }
    )
});
/**
 * @api {get} /api/data/:user   Request user health data
 * @apiName GetData
 * @apiGroup Data
 * 
 * @apiParam {String} user      Unique username
 * 
 * @apiSuccessExample {json} Success-Response:
 * [
 *      {
 *          "user": "Mary827",
 *          "heartrate":[
 *              {
 *                  "heartrate": 70,
 *                  "time": "2020-09-09T06:14:20.258+00:00"
 *              },
 *              {
 *                  "heartrate": 74,
 *                  "time": "2020-09-09T06:14:25.258+00:00"
 *              }
 *          ],
 *          "stepsperd":[
 *              {
 *                  "stepsperd": 6,
 *                  "time": "2020-09-09T06:14:20.258+00:00"
 *              },
 *              {
 *                  "stepsperd": 20,
 *                  "time": "2020-09-09T06:30:25.258+00:00"
 *              }
 *          ]
 *      }
 * ]
 * @apiErrorExample {json} Error-Response:
 * {
 *      "User does not exist"
 * }
 * */
app.get('/api/data/:user', (req, res) => {
    const { user } = req.params;
    Data.find({"user":user}, (err, data) => {
            return err
            ? res.send(err)
            : res.send(data);
        }
    )
});
/**
 * @api {get} /api/review       Request for all user reviews
 * @apiName GetReviews
 * @apiGroup Reviews
 * 
 * 
 * @apiSuccessExample {json} Success-Response:
 * [
 *      {
 *          "user": "Mary827",
 *          "comment":"Great App",
 *          "likes": 420
 *      },
 *      {
 *          "user": "Bobby371",
 *          "comment":"10/10 very easy to use",
 *          "likes": 69
 *      }
 * ]
 * @apiErrorExample {json} Error-Response:
 * {
 *      "Review does not exist"
 * }
 * */
app.get('/api/review', (req, res) => {
    Review.find({}, (err, reviews) => {
            return err
            ? res.send(err)
            : res.send(reviews);
        }
    )
});
/**
 * @api {post} /api/data/:user      posts data into database
 * @apiName PostData
 * @apiGroup Data
 * 
 * @apiParam {String} user          Unique username
 * @apiParam {Number} [heartrate]   heartrate data
 * @apiParam {Number} [stepsperd]   steps taken
 * 
 * 
 * @apiSuccessExample {json} Success-Response:
 * {
 *      "success": true,
 *      "message": "Updated data"
 * }
 * @apiErrorExample {json} Error-Response:
 * {
 *      "User does not exist"
 * }
 * */
app.post('/api/data/:user', (req, res) => {
    const {heartrate,stepsperd,caloriesBurn} = req.body;
    const { user } = req.params;
    Data.findOne({ user: user}, (error, username) => {
        if (username == null) {
            const NewData = new Data({
                user
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
            if (caloriesBurn !== undefined){
                time.setDate(time.getDate()-1)
                username.caloriesBurn.push({caloriesBurn, time});
            }
            username.save(err =>{
                return err
                 ? res.send(err)
                 : res.json({
                     success: true,
                     message: 'Updated data'
                 });
            })
        }
    })
})
app.put('/api/data/calories/:user', (req, res) => {
    const {breakfast,lunch,dinner, day} = req.body;
    const { user } = req.params;
    Data.findOne({ user: user}, (error, username) => {
        if (username !== null) {
            cond = username.calories;
            exist = false
            cond.forEach(function(element,index,theArray){
                if (element.day === day)
                {
                    exist = true;
                    cal = theArray[index]
                    if (breakfast !== undefined){
                        cal.breakfast = breakfast
                    }
                    if (lunch !== undefined){
                        cal.lunch = lunch
                    }
                    if (dinner !== undefined){
                        cal.dinner = dinner
                    }
                    theArray[index] = cal
                }
            });
            if (exist === false){
                cond.push({breakfast: breakfast,lunch: lunch,dinner: dinner,day: day})
            }
            condition = {calories: cond}
            username.update(condition)
            .then(doc =>{
                if (!doc) {return res.status(404).end();}
                return res.status(200).json(doc)
            })
            .catch(err => next(err));
        } 
    })
})
app.put('/api/data/excercisedCalories/:user', (req, res) => {
    const {caloriesBurned, type, day} = req.body;
    const { user } = req.params;
    Data.findOne({ user: user}, (error, username) => {
        if (username !== null) {
            cond = username.excercisedCalories;
            cond.push({type: type, calories: caloriesBurned, day: day});
        } 
    })
})
app.put('/api/profile/:user', (req, res) => {
    var {height, weight, loss, steps, intake,points,updated} = req.body;
    const { user } = req.params;
    Profile.findOne({ user: user}, (error, username) => {
        if (username !== null) {
            if(height === undefined)
            {
                height = username.height
            }  
            if(weight === undefined)
            {
                weight = username.weight
            } 
            if(loss === undefined)
            {
                loss = username.goals.loss
            } 
            if(steps === undefined)
            {
                steps = username.goals.steps
            }         
            if(intake === undefined)
            {
                intake = username.goals.intake
            } 
            if(points === undefined)
            {
                points = username.points
            } 
            if(updated === undefined)
            {
                updated = username.updated
            }
            let goals = {
                loss: loss,
                steps: steps,
                intake:intake
            }        
            condition = {height: height, weight: weight, goals: goals,points:points, updated:updated}
            username.update(condition)
            .then(doc =>{
                if (!doc) {return res.status(404).end();}
                return res.status(200).json({doc:doc,data:req.body})
            })
            .catch(err => next(err));
        } 
    })
})
/**
 * @api {post} /api/authenticate    posts user and password to authenticate
 * @apiName Authenticate
 * @apiGroup User
 * 
 * @apiParam {String} user          Unique username
 * @apiParam {String} password      password for that user
 * 
 * 
 * 
 * @apiSuccessExample {json} Success-Response:
 * {
 *      "success": true,
 *      "message": "Authenticated successfully"
 * }
 * @apiErrorExample {json} Error-Response:
 * {
 *      "error":"Incorrect username or password",
 *      "user": "Mary876"
 * }
 * */
app.post('/api/authenticate', (req, res) => {
    const { user, password } = req.body;
    User.findOne({ user, password }, (error, user) => {
        if (user == null) {
            return res.json({ error: "Incorrect username or password", user: user })
        } else {
            return res.json({
                success: true,
                message: 'Authenticated successfully'
            });
        }
    })
})
/**
 * @api {put} /api/change/password    saves new changed password to user 
 * @apiName ChangePassword
 * @apiGroup User
 * 
 * @apiParam {String} user              username of the user
 * @apiParam {String} password          existing password for the user
 * @apiParam {String} new_password      new changed password for that user
 * 
 * 
 * @apiSuccessExample {json} Success-Response:
 * {
 *      "success": true,
 *      "message": "Password changed successfully"
 * }
 * @apiErrorExample {json} Error-Response:
 * {
 *      "error":"Incorrect username or password"
 * }
 * */
app.put('/api/change/password', (req, res) => {
    const { user, password, new_password } = req.body;
    User.findOne({ user, password }, (error, username) => {
        if (username == null) {
            return res.json({ error: "Incorrect username or password", user: user })
        } 
        else {
            username.update({password:new_password})
            .then(doc =>{
                if (!doc) {return res.status(404).end();}
                return res.status(200).json(doc)
            })
            .catch(err => next(err));
        }
    })
})
/**
 * @api {post} /api/registration    posts user and password into database
 * @apiName RegisterUser
 * @apiGroup User
 * 
 * @apiParam {String} user          Unique username
 * @apiParam {String} password      password for that user
 * 
 * 
 * 
 * @apiSuccessExample {json} Success-Response:
 * {
 *      "success": true,
 *      "message": "Created new user"
 * }
 * @apiErrorExample {json} Error-Response:
 * {
 *      "error":"User already exists"
 * }
 * */
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
/**
 * @api {Post} /api/profile     Post user profile
 * @apiName PostProfile
 * @apiGroup Profile
 * 
 * @apiParam {String} user      Unique username
 * @apiParam {String} name      Name of user
 * @apiParam {Number} height    users height
 * @apiParam {Number} weight    users weight
 * @apiParam {Number} age       users age
 * @apiParam {String} gender    gender of user
 * 
 * @apiSuccessExample {json} Success-Response:
 * {
 *      "success": true,
 *      "message": "Created new Profile"
 * }
 * @apiErrorExample {json} Error-Response:
 * {
 *      "User does not exist"
 * }
 * */
app.post('/api/profile', (req, res) =>{
    const {user, name, height, weight, age, gender} = req.body;
    const day = new Date()
    const NewProfile = new Profile({
        user,
        name,
        height,
        weight,
        age,
        gender,
        friends:[],
        goals:{
            loss:0,
            steps:0,
            intake:0
        },
        points:0,
        updated: day
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
/**
 * @api {Post} /api/event/:user    posts events from the user
 * @apiName PostEvents
 * @apiGroup Events
 * 
 * @apiParam {String} user      Unique username
 * @apiParam {String} name      Name of user
 * @apiParam {Number} start     start time of the event
 * @apiParam {Number} end       end time of the event
 * @apiParam {String} type      Type of event
 * @apiParam {String} data[]    Array of event data
 * 
 * @apiSuccessExample {json} Success-Response:
 * {
 *      "success": true,
 *      "message": "Created new event"
 *      "message": "Updated event"
 * }
 * @apiErrorExample {json} Error-Response:
 * {
 *      "Error status: 404"
 * }
 * */
app.post('/api/event/:user', (req, res) =>{
    const {start,end,name,data,type} = req.body;
    const { user } = req.params;
    Event.findOne({ name: name}, (error, event) => {
        if (event == null) {
            const NewEvent = new Event({
                name,
                users:[user],
                start,
                end,
                type,
                data:[]
            });
            NewEvent.save(err =>{
                return err
                 ? res.send(err)
                 : res.json({
                     success: true,
                     message: 'Created new event'
                 });
            })
        } else {
            if (user !== undefined){
                event.users.push(user);
            }
            if (data !== undefined){
                event.data.push(data);            
            }

            event.save(err =>{
                return err
                 ? res.send(err)
                 : res.json({
                     success: true,
                     message: 'Updated event'
                 });
            })
        }
    })
});
/**
 * @api {post} /api/profile/friend/:user    posts added friends to the user
 * @apiName FriendsArray
 * @apiGroup Friend
 * 
 * @apiParam {String} user          Unique username
 * @apiParam {String} friends       name of the friend 
 * 
 * 
 * 
 * @apiSuccessExample {json} Success-Response:
 * {
 *      "success": true,
 *      "message": "Updated friends"
 * }
 * @apiErrorExample {json} Error-Response:
 * {
 *      "error status":"404"
 * }
 * */
app.post('/api/profile/friend/:user', (req, res) =>{
    const {friends} = req.body;
    const { user } = req.params;
    Profile.findOne({ user: user}, (error, username) => {
        if (username == null) {
        } else {
            if (friends !== undefined){
                username.friends.push(friends);
            }
            username.save(err =>{
                return err
                 ? res.send(err)
                 : res.json({
                     success: true,
                     message: 'Updated friends'
                 });
            })
        }
    })
});
/**
 * @api {Post} /api/profile     Post user review
 * @apiName PostReview
 * @apiGroup Reviews
 * 
 * @apiParam {String} user      Unique username
 * @apiParam {String} comment   review of the user
 * @apiParam {Number} likes     number of likes
 * 
 * @apiSuccessExample {json} Success-Response:
 * {
 *      "success": true,
 *      "message": "Created new review"
 * }
 * */
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
