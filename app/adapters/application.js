import ActiveModelAdapter from 'active-model-adapter';  
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';  
import config from '../config/environment';
import DS from 'ember-data';
import AjaxServiceSupport from 'ember-ajax/mixins/ajax-support';


export default ActiveModelAdapter.extend(DataAdapterMixin, {  
	host: `${config.host}`,
	authorizer: 'authorizer:custom', 
	headers: Ember.computed('session.data.authenticated.token', function() {
    return {
    	Authorization: 'Bearer' //${this.get(session.data.authenticated.token')} ')
		};
	})
});

export default DS.JSONAPIAdapter.extend(AjaxServiceSupport, {
	session: Ember.inject.service('session'),
  headers: Ember.computed('session.data.authenticated.token', function() {
    return {
      'Authorization': 'Bearer' + this.get('session.data.authenticated.token')
	};
  })
});

