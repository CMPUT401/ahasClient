import Ember from 'ember';

/**
 * controller for the medication-input component
 * Simple container to capture state from entry boxes
 * @class MedicationInputComponentController
 */
export default Ember.Component.extend({
  session: Ember.inject.service('session'),
  actions: {
    invalidateSession() {
      return this.get('session').invalidate();
    }
  }
});
