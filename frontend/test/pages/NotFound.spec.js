import { shallowMount } from '@vue/test-utils';
import NotFound from '../../pages/NotFound.vue';

describe('NotFound.vue', () => {
  it('Renders correctly with the expected content', () => {
    const wrapper = shallowMount(NotFound);
    expect(wrapper.find('h1').text()).toBe('404');
    expect(wrapper.find('p').text()).toBe('Oops! The page you are looking for does not exist. Please update relevent path.');
  });
});
