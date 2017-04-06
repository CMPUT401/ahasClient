import Ember from 'ember';
import UnauthenticatedRouteMixin from 'ember-simple-auth/mixins/unauthenticated-route-mixin';
export default Ember.Route.extend(UnauthenticatedRouteMixin, {
      session: Ember.inject.service(),
      ajax: Ember.inject.service(),
      model(params) {
        return {
          resetToken: params.resetToken
        }
      }
});
