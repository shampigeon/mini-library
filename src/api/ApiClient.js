//TODO:: Реализовать нормальный клиент
// import {hashHistory } from 'react-router-dom';

import history from '../history';

export default class ApiClient {
    constructor({ prefix = '' } = {}) {
        this.prefix = prefix;
    }

    get(requestUrl, params = {}, callback) {
        return this.request(
            requestUrl,
            'get',
            params,
            callback
        );
    }

    mapData = (data = {}) => {
        let result = {};
        for (var i in data) {
            if(i !== '__proto__' && data[i] !== null && data[i] !== undefined) {
                result[i] = data[i];
            }
        }
        return result;
    };


    post = (requestUrl, params = {}, callback, errorCallback) => {

        return this.request(
            requestUrl,
            'post',
            this.mapData(params),
            callback,
            errorCallback
        );
    };


    request(url, method, params = {}, successCall, errorCall = () => {}) {
        let headers = new Headers();
        // headers.append('Accept', 'application/json');
        // headers.append('Content-Type', 'application/json');

        let options = {
            credentials: "same-origin",
            method: method,
            headers: headers,
            mode: "cors",
        };

        if(method !== 'get' && method !== 'head') {
            let data = new FormData();
            for(var key in params) {
                data.append(key, params[key]);
            }
            options.body = data;
        } else if(method === 'get') {

        }

        return fetch(url, options).then((response) => {
            if (response.status === 401) {
                localStorage.setItem('isAuthenticated', false);
                history.push('/login');
                return {error: true}
            } else if(response.status === 403) {
                history.push('/forbidden');
                return {error: true}
            } else if (response.status === 400 || response.status > 401) {
                return {error: true, messages: [['Something went wrong']]};
            } else {
                return response.json();
            }
        }).then((data) => {
            if(data) {
                successCall(data);
            }
        });
    }

}