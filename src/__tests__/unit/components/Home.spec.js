`use strict`

import { shallowMount, createLocalVue } from '@vue/test-utils'
import Home from '../../../pages/Home.vue'
import VueRouter from 'vue-router'
import flushPromises from 'flush-promises'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import urlJoin from "url-join";
const EXAMPLE_MAIN_URL = window.location.origin;

const mock = new MockAdapter(axios)

const mockData = {
      items: [
        {
          is_active: true,
          media: [{ type: 'image', url: 'image1.png' }],
          name: 'Product 1',
          item_code: 'ITEM001',
          brand: { name: 'Brand A' },
          category_slug: 'Category A',
        },
        {
          is_active: false,
          media: [],
          name: 'Product 2',
          item_code: 'ITEM002',
          brand: { name: 'Brand B' },
          category_slug: 'Category B',
        },
      ],
  }

let localVue
let wrapper
let router

describe('Test Home component', () => {
    beforeEach(async () => {
        localVue = createLocalVue();
        localVue.use(VueRouter)
        router = new VueRouter({
            routes: [
                {
                    path: `/company/:company_id/`,
                    component: Home,
                }                
            ],
        })
        
        router.push({
            path: `/company/1/`,
        })

        mock.onGet(urlJoin(EXAMPLE_MAIN_URL, '/api/products')).reply(
            200,
            mockData
        )
        mock.onGet(urlJoin(EXAMPLE_MAIN_URL, `/api/products/application/000000000000000000000001`)).reply(
            200,
            mockData
        )
        wrapper = shallowMount(Home, {
          localVue,
          router
        })
        await wrapper.vm.$nextTick()
        await flushPromises()
    })
    
    afterEach(() => {
        mock.reset();
    })

    it('Initial Rendering', async () => {
        expect(wrapper.exists()).toBeTruthy()
        expect(wrapper.element).toMatchSnapshot()
    });
    
    it('It should render product list for company', async() =>{
        expect(wrapper.vm.productList.length).toBe(2)
    });
    
    
    it('It should render product list for sales channel', async() =>{
        router = new VueRouter({routes: [
            { path: '/company/:company_id/application/:application_id', component: Home }
        ]})
        router.push('/company/1/application/000000000000000000000001');
        
        wrapper = shallowMount(Home, {
            localVue,
            router
        })
        expect(wrapper.element).toMatchSnapshot();
        expect(wrapper.exists()).toBeTruthy();
        await flushPromises()
        expect(wrapper.vm.productList.length).toBe(2)
    });
    
})