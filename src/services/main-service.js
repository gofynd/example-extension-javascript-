/* eslint-disable */
"use strict";

import URLS from './endpoint.service';
import axios from 'axios';
import { getCompany } from '../helper/utils';

axios.interceptors.request.use(config => {
    config.headers['x-company-id'] = getCompany();
    return config;
});

const MainService = {
    getTestApi(params = {}) {
        return axios.get(URLS.GET_TEST_API());
    },
    getAllProducts(params = {}) {
        return axios.get(URLS.GET_ALL_PRODUCTS());
    },
    getAllApplicationProducts(params = {}) {
        return axios.get(URLS.GET_ALL_APPLICATION_PRODUCTS(params.application_id));
    },
    getApplicationData() {
        return axios.get(URLS.GET_APPLICATION_DETAILS());
    },
}

export default MainService;