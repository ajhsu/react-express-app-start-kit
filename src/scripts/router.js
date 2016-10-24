import page from 'page';

class Router {
  constructor() {

  }
  setRoutes(routes, callback) {
    for(let key in routes){
      page(key, async (context, next) => {
        const pageComponent = await routes[key](context);
        callback(pageComponent);
      });
    }
    // Start the router immediately
    page.start();
  }
  push(route) {
    page.show(route);
  }
  redirect(route) {
    page.redirect(route);
  }
}

const instance = new Router();
export default instance;
