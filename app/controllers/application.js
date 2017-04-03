import Ember from 'ember';

//export default Ember.Controller.extend({
export default Ember.Controller.extend({
     session: Ember.inject.service('session'),
     isAdmin: (localStorage.getItem('role') === 'Admin')
});
