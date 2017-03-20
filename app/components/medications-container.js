import Ember from 'ember';

// This component dynamically renders new medications entries
export default Ember.Component.extend({
  medications: [],
  actions: {
    addMedication: function () {
      // Push an empty object to medicationList
      this.get('medicationList').pushObject({
        med_type: this.medType,
        name: "",
        reminder: ""
      });
    },
    updateMed: function (index, name, date) {
      // On focus change from either element update the entire entry
      Ember.set(this.get('medicationList').objectAt(index), 'name', name);
      Ember.set(this.get('medicationList').objectAt(index), 'reminder', date);
    },
    deleteMed: function (index, name, date) {
      // Remove current medication from the container
      this.get('medicationList').removeAt(index);
    }
  }
});