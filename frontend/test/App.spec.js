import { mount } from '@vue/test-utils';
import App from '../App.vue';

describe('App.vue', () => {
  it('Renders App component successfully', () => {
    const wrapper = mount(App);
    expect(wrapper.find('#app').exists()).toBe(true);
    expect(wrapper.find('router-view').exists()).toBe(true);
  });
});