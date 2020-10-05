const axios = require('axios');

const API_URL  = 'https://api-cyan-six.vercel.app/api';

/**
 * @testApiGet {put} /data/excercisedCalories/:uesr put data to calories burned
 * @testParam {String} user      Unique username
 * @testParam {Number} caloriesBurned   number of calories burned
 * @testParam {Date} day   day of excersise
 * @testName TestingAPI put data to update users calories burned
 * @testGroup Test
 * @testDescription Testing the put by checking number of modification done to data
 * 
 * @success data.n property must be 1 which is the number of objects needed to be updated and 
 *          data.nModified property must be 1 which is the number of objects that is updated 
 * */
test('Update Excersised Calories',  () => {  
    jest.setTimeout(30000);
    return axios.put(`${API_URL}/Data/ExcercisedCalories/Arshad`,{caloriesBurned:1000,type:"pushup",day:"11/11/11"})
    .then(resp => {
        return axios.put(`${API_URL}/Data/ExcercisedCalories/Arshad`,{caloriesBurned:900,type:"pushup",day:"11/11/11"})
        .then(resp => resp.data)
        .then(resp => {
            expect(resp.n).toEqual(1);
            expect(resp.nModified).toEqual(1);
        });
    });
});
/**
 * @testApiGet {put} /data/calories/:user put data to calorie intake of user
 * @testParam {String} user      Unique username
 * @testParam {Number} breakfast   number of calories intaked
 * @testParam {Date} day   day of intake
 * @testName TestingAPI put data to update users calories intake
 * @testGroup Test
 * @testDescription Testing the put by checking number of modification done to data
 * 
 * @success data.n property must be 1 which is the number of objects needed to be updated and 
 *          data.nModified property must be 1 which is the number of objects that is updated 
 * */
test('Update Calories',  () => {
    jest.setTimeout(30000);  
    return axios.put(`${API_URL}/Data/Calories/Arshad`,{breakfast:900,day:"11/11/11"})
    .then(resp => resp.data)
    .then(resp => {
        return axios.put(`${API_URL}/Data/Calories/Arshad`,{breakfast:1000,day:"11/11/11"})
        .then(resp => resp.data)
        .then(resp => {
            expect(resp.n).toEqual(1);
            expect(resp.nModified).toEqual(1);
        });
    });
});
/**
 * @testApiGet {put} /data/calories/:user put data to profile of user 
 * @testParam {String} user      Unique username
 * @testParam {Number} height    height of user
 * @testName TestingAPI put data to update users profile info
 * @testGroup Test
 * @testDescription Testing the put by checking number of modification done to data
 * 
 * @success data.n property must be 1 which is the number of objects needed to be updated and 
 *          data.nModified property must be 1 which is the number of objects that is updated 
 * */
test('Update Profile',  () => {
    jest.setTimeout(30000);  
    return axios.put(`${API_URL}/Profile/Arshad`,{height:177})
    .then(resp => resp.data)
    .then(resp => {
        return axios.put(`${API_URL}/Profile/Arshad`,{height:178})
        .then(resp => resp.data)
        .then(resp => {
            expect(resp.doc.n).toEqual(1);
            expect(resp.doc.nModified).toEqual(1);
        });
    });
});