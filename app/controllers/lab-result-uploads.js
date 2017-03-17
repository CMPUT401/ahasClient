import Ember from 'ember';

export default Ember.Controller.extend({
	actions: {
		clickChooseFile: function(){
			console.log("click choose file");
			document.getElementById('files').addEventListener('change', handleFileSelect, false);
		}
	}
});

function handleFileSelect(evt){
	console.log("handling file select");
	var files = evt.target.files; // FileList object of File objects

	var output = [];
	for(var i = 0, f; f = files[i]; i++){
		output.push('<li><strong>', escape(f.name), '</strong> (', f.type || 'n/a', ') - ',
			f.size, 'bytes, last modified: ', f.lastModifiedDate ? 
			f.lastModifiedDatetoLocalDateString(): 'n/a', '</li>');
	}
	document.getElementById('list').innerHTML = '<ul>' + output.join('') + '</ul>';
}
