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
// function handleFileSelect(evt){
// 	console.log("handling file select");
// 	var files = evt.target.files; // FileList object of File objects

// 	var output = [];
// 	for(var i = 0, f; f = files[i]; i++){
// 		output.push('<li><strong>', escape(f.name), '</strong> (', f.type || 'n/a', ') - ',
// 			f.size, 'bytes, last modified: ', f.lastModifiedDate ? 
// 			f.lastModifiedDatetoLocalDateString(): 'n/a', '</li>');
// 	}
// 	document.getElementById('list').innerHTML = '<ul>' + output.join('') + '</ul>';
// }
