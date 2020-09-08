const API_URL = 'https://api-cyan-six.vercel.app/api';
const currentUser = localStorage.getItem('user');

var data = '';
console.log(location.href);
if (currentUser){
    loop();
}
else{
    const path = window.location.pathname;
    if (path !== '/test.html') { location.href = '/test.html'; }
}
async function getData(){
    const res = await fetch('mock.csv');
    data = await res.text();
    var lines = data.split("\n").slice(1);  
    return lines
}
async function loop() {
    lines = await getData();
    console.log(lines);
    
}
setInterval(myTimer,5000);
async function myTimer() {
    if (currentUser){
        if (typeof lines[0] !== "undefined")
        {
            var line = lines.shift();
            var split = line.split(',');
            console.log(split[2]);
            $.post(`${API_URL}/data/Test`, {heartrate: split[2]})
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
        localStorage.setItem('isAdmin', response.isAdmin);
        localStorage.setItem('isAuthenticated', true);
        location.href = '/home.html';
    } else {
        $('#message').append(`<p class="alert alert-danger">${response.error}</p>`);
    }
    });
});