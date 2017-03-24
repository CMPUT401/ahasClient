import Ember from 'ember';

export default Ember.Controller.extend({
	 actions: {
         newEntry(patientId){
			this.transitionToRoute("/view-patient/"+patientId+"/medical-record");
		},
        uploadPicture(patientID){
            this.transitionToRoute("/upload-patient/"+patientID);
        },
        viewMedicalRecords(patient){ //want to be passed a date here from whatever med rec was clicked viewMedicalRecords(patient, date){
           // if ( checkUpdate(date) ){
            //    this.transitionToRoute('/view-patient/'+patient+'/view-medical-record-editable/1');
            //}
            //else{
                this.transitionToRoute('/view-patient/'+patient+'/view-medical-record/'+23);
            //}
            //this is still hardcoded for med rec number until i actually have a list to come from
     }

}

});

function checkUpdate(date){

    var day = date.getDay() ;
    var month = date.getMonth()  ;
    var year = date.getFullYear();

    var current = new Date();

    var currentDay = current.getDay() ;
    var currentMonth = current.getMonth()  ;
    var currentYear = current.getFullYear();
    var currentHours = current.getHours();

    //exact minute of midnight is when we will autofinalize
    if (currentDay === day && currentMonth === month && currentYear === year && currentHours <= 24 ){
        return(true);
    }
    return(false);
}