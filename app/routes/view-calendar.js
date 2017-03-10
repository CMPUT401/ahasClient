import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
 
export default Ember.Route.extend(AuthenticatedRouteMixin , {
    model: function() {
        return {
        	defaultView: 'agendaWeek',
            events: Ember.A([{
                title: 'Partayyyy',
                start: '2017-03-06T10:10:10',
                end: '2017-03-06T11:11:11'},
                {
                title: 'Dance',
                start: '2017-03-03T10:10:10',
                end: '2017-03-03T11:11:11'

            }])
  	};
    }
});