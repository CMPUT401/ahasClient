import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('login');
  this.route('afterlogin');
  this.route('new-patient');
  this.route('create-user');
  this.route('new-client');
  this.route('view-contact', { path: '/view-contact/:contact_id' });
  this.route('search-contacts');
  this.route('view-patient');
  this.route('unauthorized');
  this.route('edit-contact');
});

export default Router;