import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
  
});

Router.map(function() {
  this.route('login');
  this.route('new-patient');
  this.route('create-user');
  this.route('new-client');

  this.route('view-patient',{path: '/view-patient/:patientID'});

  this.route('view-contact', { path: '/view-contact/:contact_id' });
  this.route('search-contacts');
  this.route('search-patient');
  this.route('new-side-note');
  this.route('view-side-note');
  this.route('client-list');
  this.route('client-info', {path: '/client-info/:clientID'});
  this.route('medical-record', {path: '/view-patient/:patientID/medical-record'});
  this.route('view-medical-record-editable', {path: '/view-patient/:patientID/view-medical-record-editable/:recordID'});
  this.route('view-calendar');
  this.route('new-calendar');
  this.route('list-side-note');
  this.route('create-contact');


  this.route('view-medical-record');
});

export default Router;

