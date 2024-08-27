import Home from '../pages/Home.vue';
import NotFound from '../pages/NotFound.vue';
import router from '../router.js';

describe('Router Configuration', () => {
  it('Should have the correct routes', () => {
    const routes = router.options.routes;

    // Check the Home route
    const homeRoute = routes.find(route => route.name === 'Home');
    expect(homeRoute).toBeTruthy();
    expect(homeRoute.path).toBe('/company/:company_id/');
    expect(homeRoute.component).toBe(Home);

    // Check the AppHome route
    const appHomeRoute = routes.find(route => route.name === 'AppHome');
    expect(appHomeRoute).toBeTruthy();
    expect(appHomeRoute.path).toBe('/company/:company_id/application/:application_id');
    expect(appHomeRoute.component).toBe(Home);

    // Check the NotFound route
    const notFoundRoute = routes.find(route => route.name === 'NotFound');
    expect(notFoundRoute).toBeTruthy();
    expect(notFoundRoute.path).toBe('/:pathMatch(.*)*');
    expect(notFoundRoute.component).toBe(NotFound);
  });
});
