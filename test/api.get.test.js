const axios = require('axios');

const API_URL  = 'https://api-cyan-six.vercel.app/api';

/**
 * @testApiGet {get} /api/profile gets all profiles
 * @testName TestingAPI get all profiles
 * @testGroup Test
 * @testDescription Testing the get request by checking the first object within the returned data array
 * 
 * @success user property of first object is to be equal to "Pravindu" as within the mongo DB
 * */
test('test Profile array', () => {
    expect.assertions(1);
    return axios.get(`${API_URL}/Profile`)
    .then(resp => resp.data)
    .then(resp => {
        expect(resp[0].user).toEqual('Pravindu');
    });
});
/**
 * @testApiGet {get} /api/profile/:user gets profile of user param
 * @testParam {String} user      Unique username
 * @testName TestingAPI get user profile
 * @testGroup Test
 * @testDescription Testing the get request for specific user
 * 
 * @success user property of first object is to be equal to the user specified within the url
 * */
test('test Specific Profile', () => {
    var user = "Arshad"
    expect.assertions(1);
    return axios.get(`${API_URL}/Profile/${user}`)
    .then(resp => resp.data)
    .then(resp => {
        expect(resp[0].user).toEqual(user);
    });
});
/**
 * @testApiGet {get} /api/profile/:user gets profile of user param
 * @testParam {String} user      Unique username
 * @testName TestingAPI get profile of unexsiting user
 * @testGroup Test
 * @testDescription Testing the get request by checking the first object within the returned data array
 * 
 * @success reutrn data property should be empty array as folowing user does not exsits
 * */
test('test Specific Profile when not exsisting', () => {
    expect.assertions(1);
    return axios.get(`${API_URL}/Profile/Arshad111`)
    .then(resp => resp.data)
    .then(resp => {
        expect(resp).toEqual([]);
    });
});
/**
 * @testApiGet {get} /api/review gets all reviews in database
 * @testName TestingAPI get all reviews
 * @testGroup Test
 * @testDescription Testing the get request for reviews by checking the first object within the returned data array
 * 
 * @success user property of first object is to be equal to the user of the first object within the mongo DB
 * */
test('test Review array', () => {
    expect.assertions(1);
    return axios.get(`${API_URL}/Review`)
    .then(resp => resp.data)
    .then(resp => {
        expect(resp[0].user).toEqual('Pravindu');
    });
});
/**
 * @testApiGet {get} /api/data/:user gets profile of user param
 * @testParam {String} user      Unique username
 * @testName TestingAPI get profile of unexsiting user
 * @testGroup Test
 * @testDescription Testing the get request by checking the first object within the returned data array
 * 
 * @success reutrn data property should be empty array as folowing user does not exsits
 * */
test('test Event array', () => {
    expect.assertions(1);
    return axios.get(`${API_URL}/Event`)
    .then(resp => resp.data)
    .then(resp => {
        expect(resp[0].users[0]).toEqual('Pravindu');
    });
});
/**
 * @testApiGet {get} /api/data/:user gets data of user param
 * @testParam {String} user      Unique username
 * @testName TestingAPI get user data
 * @testGroup Test
 * @testDescription Testing the get request for data of specific user
 * 
 * @success user property of first object is to be equal to the user specified within the url
 * */
test('test Data array', () => {
    var user = 'Dibesh'
    expect.assertions(1);
    return axios.get(`${API_URL}/Data/${user}`)
    .then(resp => resp.data)
    .then(resp => {
        expect(resp[0].user).toEqual(user);
    });
});
/**
 * @testApiGet {get} /api/data/:user gets data of user param
 * @testParam {String} user      Unique username
 * @testName TestingAPI get user data
 * @testGroup Test
 * @testDescription Testing the get request for data of specific user
 * 
 * @success user property of first object is to be equal to the user specified within the url
 * */
test('test Data array', () => {
    var user = 'Dibesh11'
    expect.assertions(1);
    return axios.get(`${API_URL}/Data/${user}`)
    .then(resp => resp.data)
    .then(resp => {
        expect(resp).toEqual([]);
    });
});