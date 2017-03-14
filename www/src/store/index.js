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
                    state.user = res.data.data;
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
        }
    }
}