import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
  
});

Router.map(function() {
  this.route('login');
  this.route('new-patient');
  this.route('create-user', {path: '/creat-user/:token'});
  this.route('new-client');

  this.route('view-patient',{path: '/view-patient/:patientID'});

  this.route('view-contact', { path: '/view-contact/:contact_id' });
  this.route('search-contacts');
  this.route('edit-contact', { path: '/edit-contact/:contact_id' });
  this.route('search-patient');
  this.route('new-side-note');
  this.route('view-side-note');
  this.route('client-list');
  this.route('client-info', {path: '/client-info/:clientID'});
  this.route('medical-record', {path: '/view-patient/:patientID/medical-record'});
  this.route('view-medical-record-editable', {path: '/view-patient/:patientID/view-medical-record-editable/:recordID'});
  this.route('view-medical-record', {path: '/view-patient/:patientID/view-medical-record/:recordID'});

  this.route('view-calendar');
  this.route('new-calendar');
  this.route('list-side-note');
  this.route('create-contact');
  this.route('test');
  this.route('edit-client', {path: 'edit-client/:clientID'});
  this.route('lab-result-upload', {path: '/lab-result-upload/:patientID'});
  this.route('admin');
  this.route('user', {path: '/admin/users/:id'});

  this.route('view-appointment', {path: '/view-appointment/:appointmentid'});
  this.route('view-image-record', {path: 'view-patient/:patientID/view-image-record/:imageID'});
});

export default Router;


