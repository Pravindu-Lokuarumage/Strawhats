const axios = require('axios');

const API_URL  = 'https://api-cyan-six.vercel.app/api';


test('Create new data',  () => {  
    return axios.get(`${API_URL}/Data/test`)
    .then(resp => resp.data)
    .then(resp => {
        if(resp == []){
            return axios.post(`${API_URL}/Data/test`,{})
            .then(resp => resp.data)
            .then(resp => {
                expect(resp.message).toEqual("Created new data");
            });
        }
        else{
            return axios.post(`${API_URL}/Data/test`,{})
            .then(resp => resp.data)
            .then(resp => {
                expect(resp.message).toEqual("Updated data");
            })
        }
    });
});
test('Authenticate success',  () => {  
    return axios.post(`${API_URL}/Authenticate`,{user:"Arshad",password:"asdfg"})
    .then(resp => resp.data)
    .then(resp => {
        expect(resp.message).toEqual("Authenticated successfully");
    });
});
test('Authenticate error',  () => {  
    return axios.post(`${API_URL}/Authenticate`,{user:"Arshad",password:"thisWrong"})
    .then(resp => resp.data)
    .then(resp => {
        expect(resp.error).toEqual("Incorrect username or password");
    });
});
test('Register error',  () => {  
    return axios.post(`${API_URL}/Registration`,{user:"Arshad",password:"thisWrong"})
    .then(resp => resp.data)
    .then(resp => {
        expect(resp.error).toEqual("User already exists");
    });
});
test('create Profile',  () => {  
    return axios.post(`${API_URL}/Profile`,{user:"test"})
    .then(resp => resp.data)
    .then(resp => {
        expect(resp.message).toEqual('Created new profile');
    });
});
test('Update Event',  () => {  
    return axios.post(`${API_URL}/Event/test`)
    .then(resp => resp.data)
    .then(resp => {
        expect(resp.message).toEqual('Updated event');
    });
});
test('Update Friends',  () => {  
    return axios.post(`${API_URL}/Profile/Friend/test`,{friends:"hello"})
    .then(resp => resp.data)
    .then(resp => {
        expect(resp.message).toEqual('Updated friends');
    });
});
test('Create Review',  () => {  
    return axios.post(`${API_URL}/Review`,{user:"test",comment:"test passed"})
    .then(resp => resp.data)
    .then(resp => {
        expect(resp.message).toEqual('Created new review');
    });
});