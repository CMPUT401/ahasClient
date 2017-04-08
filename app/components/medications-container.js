import Ember from 'ember';

/**
* controller for the medication-container component
* This component dynamically renders new medications entries
* @class MedicationInputContainerComponentController
*/
export default Ember.Component.extend({
  patientID: 0,
  id:0,
  ajax: Ember.inject.service(),
  actions: {
    /** 
		*  Push an empty object to medicationList
		* @method addMedication
		*/
    addMedication: function () {
      this.get('medicationList').pushObject({
        med_type: this.medType,
        name: "",
        reminder: ""
      });
    },
     /** 
		*   On focus change from either element update the entire entry
		* @method updateMed
     * @param {int} index The index within the medicationList for the element to be updated
    * @param {string} name The name for the medication to update
    * @param {date} date The date for the medication to update
		*/
    updateMed: function (index, name, date) {
      Ember.set(this.get('medicationList').objectAt(index), 'name', name);
      Ember.set(this.get('medicationList').objectAt(index), 'reminder', date);
    },
     /** 
		* Remove current medication from the container
		* @method  deleteMed
    * @param {int} index The index within the medicationList for the element to be removed
		*/
    deleteMed: function (index) {
      var self = this; 

      var id = this.get('medicationList').objectAt(index).id;

      if(id === null || id === undefined){
        self.get('medicationList').removeAt(index);
    }
    else{
      var ajaxGet = new Ember.RSVP.Promise((resolve) =>
			 this.get('ajax').delete('api/patients/'+ this.patientID+'/medications/'+ id
				).then(function(data){
          self.get('medicationList').removeAt(index);
				}));
    }
  }


  }
});
