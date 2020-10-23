import appConfig from '../config';

function getAuthToken(){
    let token = localStorage.getItem('login-token') ?? '';
    return 'Bearer ' + token;
}

export default function(endpoint, {body, ...config} = {}) {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': getAuthToken()
    }
    const options = {
        method: body ? 'POST' : 'GET',
        headers: {
            ...headers,
            ...config.headers
        }
    }

    if (body) {
        options.body = JSON.stringify(body);
    }
    return window
        .fetch(`${appConfig.API_URL}/${endpoint}`, options)
        .then(async (response) => {
            const data = await response.json();
            if (response.status >= 401) {
                return Promise.reject('unauthorized')
            }
            if(response.ok) {
                return data;
            }
            return Promise.reject(data);
        });
}