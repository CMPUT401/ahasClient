import Ember from 'ember';
import {isAjaxError, isNotFoundError, isForbiddenError} from 'ember-ajax/errors';

export default Ember.Route.extend({
	ajax: Ember.inject.service(),
	model() {
		//return this.store.createRecord('newClient');
		//return this.get('ajax').request('/api/client');
		const ajax = this.get('ajax');

		return ajax.request('/api/client').catch(function(error){
			if (isNotFoundError(error)) {
	          // handle 404 errors here 
	          return;
	        }
	 
	        if (isForbiddenError(error)) {
	          // handle 403 errors here 
	          return;
	        }
	 
	        if(isAjaxError(error)) {
	          // handle all other AjaxErrors here 
	          return;
	        }
	 
	        // other errors are handled elsewhere 
	        throw error;
		});
	}
	// actions:{
	// 	createNewClient(){
	// 		let clientInfo = this.modelFor(this.routeName);
	// 		clientInfo.save().then(function () {
	// 			//sendRequest();
	// 			//this.transitionTo('new-client');
	// 		}).catch(function (reason){

	// 		});
	// 	}
	// }
});
