import Ember from 'ember';

//export default Ember.Controller.extend({
export default Ember.Controller.extend({
     session: Ember.inject.service('session'),
     isAdmin: "",
     init(){
         this._super(...arguments);
         console.log(this.get('session.data.authenticated.role'));
         this.addObserver('session.data.authenticated.role', function(){ 
             this.set('isAdmin', this.get('session.data.authenticated.role')==='Admin');
         });
         this.set('isAdmin', this.get('session.data.authenticated.role')==='Admin');
     }
});
