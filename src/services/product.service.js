/* eslint-disable */
"use strict";

import URLS from './domain.service';
import axios from 'axios';
import { getCompany } from '../helper/utils';

axios.interceptors.request.use(config => {
    config.headers['x-company-id'] = getCompany();
    return config;
});

const ProductService = {
    getAllProducts(params = {}) {
        return axios.get(URLS.GET_ALL_PRODUCTS());
    },
    getAllApplicationProducts(params = {}) {
        return axios.get(URLS.GET_ALL_APPLICATION_PRODUCTS(params.application_id));
    }
}

export default ProductService;