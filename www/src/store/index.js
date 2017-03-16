import axios from 'axios'

let api = axios.create({
    baseURL: 'http://localhost:3000/api/',
    timeout: 3000,
    withCredentials: true
})

let state = {
    user: {},
    error: {}

}

let handleError = (err) => {
    state.error = err
    console.log(err);
}

export default {
    state,
    actions: {
        login(username, userPass){
            api.post('http://localhost:3000/login', {
                username: username,
                password: userPass
            })
                .then(res => {
                    if(res.data.data){
                        state.user = res.data.data;
                    } else {
                        state.error = res.data.error;
                        Materialize.toast(res.data.error, 1000);
                    }
                })
                .catch(handleError)
        },
        register(username, password){
            api.post('http://localhost:3000/register', {
                username: username,
                password: password
            })
                .then(res => {
                    if(res.data.data){
                        state.user = res.data.data;
                    } else {
                        Materialize.toast('That username is already taken.', 2000);
                    }
                })
                .catch(handleError)
        },
        logout(){
            api.delete('http://localhost:3000/logout')
                .then(res => {
                    state.user = {};
                    Materialize.toast(res.data.message, 1000);
                })
                .catch(handleError);
        },
        checkLoggedIn(){
            api('http://localhost:3000/check-logged-in')
                .then(res => {
                    if(res.data.message){
                        console.log('You are not logged in');
                    } else {
                        state.user = res.data.data;
                    }
                })
        }
    }
}