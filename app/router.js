import Ember from 'ember';
import config from './config/environment';
import AuthConfig from 'ember-simple-auth/configuration';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
  
});

Router.map(function() {
  this.route('login');

  this.route('new-patient');

  this.route('new-user', {path: '/new-user/:inviteToken'});
  this.route('reset-password', {path:'/reset-password/:resetToken'});
  this.route('new-client');
  this.route('new-side-note');
  this.route('new-calendar');
  this.route('new-contact');
  this.route('new-medical-record', {path: '/view-patient/:patientID/new-medical-record'});

  this.route('edit-contact', { path: '/edit-contact/:contact_id' });
  this.route('edit-client', {path: 'edit-client/:clientID'});

  this.route('view-patient',{path: '/view-patient/:patientID'});
  this.route('view-contact', { path: '/view-contact/:contact_id' });
  this.route('view-side-note', {path: '/view-patient/:patientID/view-medical-record/:recordID/notes/:notesID'});
  this.route('view-appointment', {path: '/view-appointment/:appointmentid'});
  this.route('view-image-record', {path: 'view-patient/:patientID/view-image-record/:imageID'});
  this.route('view-appointment', {path: '/view-appointment/:appointmentid'});
  this.route('upload-patient' , {path: '/upload-patient/:patientID'});

  this.route('search-contact');
  this.route('search-patient');
  this.route('search-client');

  this.route('view-client', {path: '/view-client/:clientID'});
  this.route('view-medical-record-editable', {path: '/view-patient/:patientID/view-medical-record-editable/:recordID'});
  this.route('view-medical-record', {path: '/view-patient/:patientID/view-medical-record/:recordID'});
  this.route('view-calendar');

  this.route('list-side-note', {path: '/view-patient/:patientID/view-medical-record/:recordID/notes'});
  this.route('lab-result-upload', {path: '/lab-result-upload/:patientID'});
  this.route('radiography-upload', {path: '/radiography-upload/:patientID'});

  this.route('admin');
  this.route('user', {path: '/admin/users/:id'});
  this.route('invite-user' , {path: '/admin/invite-user'});
  this.route('not-found', { path: '/*path' });
});

export default Router;