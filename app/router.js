import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
  
});

Router.map(function() {
  this.route('login');
  this.route('new-patient', {path: '/new-patient/:clientID'});
  this.route('create-user');
  this.route('new-client');
<<<<<<< HEAD
  this.route('view-patient',{path: '/view-patient/:patientID'});
=======
  this.route('view-contact', { path: '/view-contact/:contact_id' });
  this.route('search-contacts');
  this.route('view-patient');
>>>>>>> master
  this.route('search-patient');
  this.route('new-side-note',{path: '/new-side-note/:IDs'});
  this.route('view-side-note');
  this.route('client-list');
  this.route('client-info', {path: '/client-info/:clientID'});
  this.route('unauthorized');
<<<<<<< HEAD
  this.route('view-calendar');
  this.route('new-calendar');
  this.route('list-side-note');
=======
  this.route('create-contact');
>>>>>>> master
});

export default Router;

