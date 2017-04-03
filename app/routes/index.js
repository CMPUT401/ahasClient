import Ember from 'ember';

/**
* Route for index
* @class IndexRoute
*/

export default Ember.Route.extend({
 
    //this route just defaults to login route
    beforeModel() {
       this.replaceWith('login');
  }
});

