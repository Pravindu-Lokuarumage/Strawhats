const API_URL = 'https://api-cyan-six.vercel.app/api';
const currentUser = localStorage.getItem('user');


setInterval(heartData,5000);
setInterval(stepData,10000);



if (currentUser){
    getHeart();
    getStep();
}
else{
    const path = window.location.pathname;
    if (path !== '/test.html') { location.href = '/test.html'; }
}
async function getHeartData(){
    const res = await fetch('mock.csv');
    const data = await res.text();
    var lines = data.split("\n").slice(1);  
    return lines
}
async function getHeart() {
    heart = await getHeartData();
    console.log(heart);
    
}
async function heartData() {
    if (currentUser){
        if (typeof heart[0] !== "undefined")
        {
            var line = heart.shift();
            var split = line.split(',');
            console.log(split[2]);
            const val = split[2];
            $.post(`${API_URL}/data/${currentUser}`, {heartrate: val})
            .then((response) =>{
	    		if (response.success) {
                    console.log(response);
                    
	    		}
	    	});
        }
    }
    
}
async function getStepData(){
    const res = await fetch('hourlySteps_merged.csv');
    const data = await res.text();
    var lines = data.split("\n").slice(1);  
    return lines
}
async function getStep() {
    step = await getStepData();
    console.log(step);
    
}
async function stepData() {
    if (currentUser){
        if (typeof step[0] !== "undefined")
        {
            var line = step.shift();
            var split = line.split(',');
            console.log(split[2]);
            const val = split[2];
            $.post(`${API_URL}/data/${currentUser}`, {stepsperd: val})
            .then((response) =>{
	    		if (response.success) {
                    console.log(response);
                    
	    		}
	    	});
        }
    }
    
}
$('#login').on('click', () => {
    const user = $('#name').val();
    const password = $('#password').val();
    $.post(`${API_URL}/authenticate`, { user, password })
    .then((response) =>{
    if (response.success) {
        console.log(user);
        localStorage.setItem('user', user);
        localStorage.setItem('isAuthenticated', true);
        location.href = '/home.html';
    } else {
        $('#message').append(`<p class="alert alert-danger">${response.error}</p>`);
    }
    });
});