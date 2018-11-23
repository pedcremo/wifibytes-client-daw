import {Router} from '../src/router.js'; //Knows what to do for every single URL 

it('Router routes add and delete works', () => {
     
    expect(Router.routes.length).toBe(0);
    Router.add(/legal/, function() {});
    expect(Router.routes.length).toBe(1);
    Router.add(/route2/, function() {});
    expect(Router.routes.length).toBe(2);
    Router.remove(/route2/);
    expect(Router.routes.length).toBe(1);
    Router.flush();
    expect(Router.routes.length).toBe(0);
    Router.add(/products\/\/edit\/(.*)/,function(){});
    Router.navigate("/products/edit/2").listen(function(){
        console.log("Router->"+Router.getFragment());
    });

});