import Ember from 'ember';

//export default Ember.Controller.extend({
export default Ember.Controller.extend({
     session: Ember.inject.service('session'),
     isAdmin: "",
     init(){
         this._super(...arguments);
         // Observe role , for inital log in.
         this.addObserver('session.data.authenticated.role', function(){ 
             this.set('isAdmin', this.get('session.data.authenticated.role')==='Admin');
         });
         // Set initial isAdmin status, if user is all ready logged in and refreshing
         this.set('isAdmin', this.get('session.data.authenticated.role')==='Admin');
     }
});