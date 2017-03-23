import Ember from 'ember';

export default Ember.Route.extend({
	init(){
		checkFileApiSupport();
		//document.getElementById('files').addEventListener('change', handleFileSelect, false);
		//console.log(document.getElementById('files'));
	},
	model(param){
		return {
			patientId: param.patientID
		};
	}
});

function checkFileApiSupport(){
	if (window.File && window.FileReader && window.FileList && window.Blob){
		console.log("File API is supported");
		return true;
	} else{
		console.log("File API is not supported");
		alert("The File APIs are not fully supported in this browser. ");
		return false;
	}
}
