const axios = require('axios');

const API_URL  = 'https://api-cyan-six.vercel.app/api';


test('test Profile array', () => {
    expect.assertions(1);
    return axios.get(`${API_URL}/Profile`)
    .then(resp => resp.data)
    .then(resp => {
        expect(resp[0].user).toEqual('Pravindu');
    });
});
test('test Specific Profile', () => {
    expect.assertions(1);
    return axios.get(`${API_URL}/Profile/Arshad`)
    .then(resp => resp.data)
    .then(resp => {
        expect(resp[0].user).toEqual('Arshad');
    });
});
test('test Specific Profile when not exsisting', () => {
    expect.assertions(1);
    return axios.get(`${API_URL}/Profile/Arshad111`)
    .then(resp => resp.data)
    .then(resp => {
        expect(resp).toEqual([]);
    });
});
test('test Review array', () => {
    expect.assertions(1);
    return axios.get(`${API_URL}/Review`)
    .then(resp => resp.data)
    .then(resp => {
        expect(resp[0].user).toEqual('Pravindu');
    });
});
test('test Event array', () => {
    expect.assertions(1);
    return axios.get(`${API_URL}/Event`)
    .then(resp => resp.data)
    .then(resp => {
        expect(resp[0].users[0]).toEqual('Pravindu');
    });
});
test('test Data array', () => {
    expect.assertions(1);
    return axios.get(`${API_URL}/Data/Dibesh`)
    .then(resp => resp.data)
    .then(resp => {
        expect(resp[0].user).toEqual('Dibesh');
    });
});