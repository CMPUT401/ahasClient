import ActiveModelAdapter from 'active-model-adapter';  
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';  
import config from '../config/environment';
import DS from 'ember-data';


export default ActiveModelAdapter.extend(DataAdapterMixin, {  
	host: `${config.host}`,
	    authorizer: 'authorizer:custom'
	    });

export default DS.JSONAPIAdapter.extend({
  namespace: 'api'
});