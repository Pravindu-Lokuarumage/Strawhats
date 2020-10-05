const axios = require('axios');

const API_URL  = 'https://api-cyan-six.vercel.app/api';

/**
 * @testApiGet {post} /api/data/:user posts data to specified user
 * @testParam {String} user      Unique username
 * @testName TestingAPI post to user within url
 * @testGroup Test
 * @testDescription Testing the post request by checking if the response contains the expected success message
 * 
 * @success data.message property of respones contains "Created new data" or "Updated data"
 * */
test('Create new data',  () => {  
    var user = "test";
    return axios.get(`${API_URL}/Data/${user}`)
    .then(resp => resp.data)
    .then(resp => {
        if(resp == []){
            return axios.post(`${API_URL}/Data/${user}`,{})
            .then(resp => resp.data)
            .then(resp => {
                expect(resp.message).toEqual("Created new data");
            });
        }
        else{
            return axios.post(`${API_URL}/Data/${user}`,{})
            .then(resp => resp.data)
            .then(resp => {
                expect(resp.message).toEqual("Updated data");
            })
        }
    });
});
/**
 * @testApiGet {post} /api/authenticate authenticated give user and password
 * @testParam {String} user      Unique username
 * @apiParam {String} password      password for that user
 * @testName TestingAPI post a object with user and password that exsits
 * @testGroup Test
 * @testDescription Testing the post request by checking if the response contains the expected success message
 * 
 * @success data.message property of respones contains "Authenticated successfully"
 * */
test('Authenticate success',  () => {  
    return axios.post(`${API_URL}/Authenticate`,{user:"Arshad",password:"asdfg"})
    .then(resp => resp.data)
    .then(resp => {
        expect(resp.message).toEqual("Authenticated successfully");
    });
});
/**
 * @testApiGet {post} /api/authenticate authenticated give user and password
 * @testParam {String} user      Unique username
 * @apiParam {String} password      password for that user
 * @testName TestingAPI post a object with user and password that does not exsits
 * @testGroup Test
 * @testDescription Testing the post request by checking if the response contains the expected error message
 * 
 * @success data.error property of respones contains "Incorrect username or password"
 * */
test('Authenticate error',  () => {  
    return axios.post(`${API_URL}/Authenticate`,{user:"Arshad",password:"thisWrong"})
    .then(resp => resp.data)
    .then(resp => {
        expect(resp.error).toEqual("Incorrect username or password");
    });
});
/**
 * @testApiGet {post} /api/registration creates new user
 * @testParam {String} user      Unique username
 * @apiParam {String} password      password for that user
 * @testName TestingAPI post a object with a user which already exist
 * @testGroup Test
 * @testDescription Testing the post request by checking if the response contains the expected error message
 * 
 * @success data.error property of respones contains "User already exists"
 * */
test('Register error',  () => {  
    return axios.post(`${API_URL}/Registration`,{user:"Arshad",password:"newthing"})
    .then(resp => resp.data)
    .then(resp => {
        expect(resp.error).toEqual("User already exists");
    });
});
/**
 * @testApiGet {post} /api/profile posts to create new profile
 * @testParam {String} user      Unique username
 * @testName TestingAPI post a new profile modal
 * @testGroup Test
 * @testDescription Testing the post request by checking if the response contains the expected success message
 * 
 * @success data.message property of respones contains "Created new profile"
 * */
test('create Profile',  () => {  
    return axios.post(`${API_URL}/Profile`,{user:"test"})
    .then(resp => resp.data)
    .then(resp => {
        expect(resp.message).toEqual('Created new profile');
    });
});
/**
 * @testApiGet {post} /api/event/:user posts to update specified users friend array with new friend
 * @testParam {String} user      Unique username
 * @testName TestingAPI post to user within url updating the event
 * @testGroup Test
 * @testDescription Testing the post request by checking if the response contains the expected success message
 * 
 * @success data.message property of respones contains 'Updated event'
 * */
test('Update Event',  () => {  
    return axios.post(`${API_URL}/Event/test`)
    .then(resp => resp.data)
    .then(resp => {
        expect(resp.message).toEqual('Updated event');
    });
});
/**
 * @testApiGet {post} /api/profile/friend/:user posts to update specified users friend array with new friend
 * @testParam {String} user      Unique username
 * @testParam {String} friends   friends username
 * @testName TestingAPI post to user within url adding to the friends array
 * @testGroup Test
 * @testDescription Testing the post request by checking if the response contains the expected success message
 * 
 * @success data.message property of respones contains 'Updated friends'
 * */
test('Update Friends',  () => {  
    return axios.post(`${API_URL}/Profile/Friend/test`,{friends:"hello"})
    .then(resp => resp.data)
    .then(resp => {
        expect(resp.message).toEqual('Updated friends');
    });
});
/**
 * @testApiGet {post} /api/review posts to update specified users friend array with new friend
 * @testParam {String} user      Unique username
 * @testParam {String} comment   Contents of the review
 * @testName TestingAPI post a new review to create one
 * @testGroup Test
 * @testDescription Testing the post request by checking if the response contains the expected success message
 * 
 * @success data.message property of respones contains 'Created new review'
 * */
test('Create Review',  () => {  
    return axios.post(`${API_URL}/Review`,{user:"test",comment:"test passed"})
    .then(resp => resp.data)
    .then(resp => {
        expect(resp.message).toEqual('Created new review');
    });
});