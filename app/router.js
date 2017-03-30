import Ember from 'ember';
import config from './config/environment';
import AuthConfig from 'ember-simple-auth/configuration';

Ember.Route.reopen({
  // By default, all routes are authenticated. i.e. they will need to be signed in
  // To make a route non authenticated, set authenticated to false.
  //
  // If a user tries entering an non authenticated route and they are authenticated,
  // they will be redirected to the route which is displayed after authentication.
  // This is useful for login pages and pages you don't want the user to see when they
  // are signed in.
  //
  // This creates a strict dichotomy of pages which the user can see when they are
  // signed in and signed out which may not be appropriate. It might be worth separating
  // out unauthenticated route into its own flag.

  authenticated: true,

  beforeModel(transition) {
    // TODO Double check this

    this._super(transition);
    // We don't want to authenticate the application route as this gets called before every route.

    if (this.routeName === 'application') {
      return;
    }
    const sessionAuthenticated = this.get('session.isAuthenticated');

    // Authenticated route and currently not authenticated

    if (this.get('authenticated') && !sessionAuthenticated) {
      transition.abort();
      this.get('session').set('attemptedTransition', transition);
      transition.send('authenticateSession');

    // Unauthenticated route and currently authenticated

    } else if (!this.get('authenticated') && sessionAuthenticated) {
      transition.abort();

      // Direct them back to the route after authentication

      this.transitionTo(AuthConfig.routeAfterAuthentication);
    }
  }
});


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
  this.route('edit-contact', { path: '/edit-contact/:contact_id' });
  this.route('search-patient');
  this.route('new-side-note');
  this.route('view-side-note', {path: '/view-patient/:patientID/view-medical-record/:recordID/notes/:notesID'});
  this.route('client-list');
  this.route('client-info', {path: '/client-info/:clientID'});
  this.route('medical-record', {path: '/view-patient/:patientID/medical-record'});
  this.route('view-medical-record-editable', {path: '/view-patient/:patientID/view-medical-record-editable/:recordID'});
  this.route('view-medical-record', {path: '/view-patient/:patientID/view-medical-record/:recordID'});

  this.route('view-calendar');
  this.route('new-calendar');
  this.route('list-side-note', {path: '/view-patient/:patientID/view-medical-record/:recordID/notes'});
  this.route('create-contact');
  this.route('test');
  this.route('edit-client', {path: 'edit-client/:clientID'});
  this.route('lab-result-upload', {path: '/lab-result-upload/:patientID'});
  this.route('radiography-upload', {path: '/radiography-upload/:patientID'});
  this.route('admin');
  this.route('user', {path: '/admin/users/:id'});
  this.route('view-appointment', {path: '/view-appointment/:appointmentid'});
  this.route('view-image-record', {path: 'view-patient/:patientID/view-image-record/:imageID'});
  this.route('view-appointment', {path: '/view-appointment/:appointmentid'});
  this.route('upload-patient' , {path: '/upload-patient/:patientID'});
  
  this.route('not-found', { path: '/*path' });
});

export default Router;