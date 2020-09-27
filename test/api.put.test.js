const axios = require('axios');

const API_URL  = 'https://api-cyan-six.vercel.app/api';


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