import Ember from 'ember';

export default Ember.Controller.extend({
	 actions: {
        uploadPicture(patientID){
            this.transitionToRoute("/upload-patient/"+patientID);
        }

}

});
