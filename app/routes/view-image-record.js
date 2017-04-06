import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';


/**
* Route for view image record. This route is used to view both radiographies and lab results. Makes a get request for the base64 image when loaded.  
* @class ViewImageRecordRoute
*/
export default Ember.Route.extend(AuthenticatedRouteMixin, {
	session: Ember.inject.service(),
	ajax: Ember.inject.service(),
	model(param){
		var self = this;
		//ajax get request to populate field
		var ajaxGet = new Ember.RSVP.Promise((resolve) =>
		this.get('ajax').request('/api/patients/' + param.patientID + "/images/" + param.imageID
			).then(function(data){
				Ember.run(function() {
				resolve({
					name: deserialName(data.image),
					imgData: deserialData(data.image),
					date: deserialDate(data.image),
					type: deserialType(data.image)
				});
			  });
			
			},
			function(data){
				if (data === false){
					if (self.get('session.isAuthenticated')){
					self.get('session').invalidate();
					}
				self.transitionTo('/login');
				}
		}));
		return ajaxGet;
	}
});

/**
* deserializes the name attribute in the JSON object and converts it to a string.
* @method deserialName
* @param {object} img The image JSON object (data.image). 
*/
function deserialName(img){
	var name = img.name;
	if(name != null){
		return JSON.stringify(name).replace(/\"/g, "");
	}else{
		return " ";
	}
}

/**
* deserializes the data attribute in the JSON object. If it is a pdf, then it build a pdf viewer, otherwise, it makes an img HTML tag in the view to view the base64 encoded image. 
* @method ddeserialData
* @param {object} img The image JSON object (data.image). 
*/
function deserialData(img){
	var data = img.data;
	if(data != null){
		var image = JSON.stringify(data).replace(/\"/g, "");
		if(img.data_type === "application/pdf"){
			return pdfBuilder(image);
		}else{
			return '<img class="recordImage" src="' + image + '"/>';
		}
	}else{
		return "Image not found!!";
	}
}

/**
* deserializes the date attribute in the JSON object and converts from unix time into a readable string.
* @method deserialDate
* @param {object} img The image JSON object (data.image). 
*/
function deserialDate(img){
	var unixDate = img.date;
	if(unixDate != null){
		var date = new Date(JSON.stringify(unixDate)*1000); 
		return  date.getMonth() + "/" + date.getDate() + "/" + date.getFullYear();
	}else{
		return " ";
	}
}

/**
* deserializes the picture_type attribute in the JSON object and converts it to a string. Called by deserialData to determine if an image is a pdf or not
* @method deserialName
* @param {object} img The image JSON object (data.image). 
*/
function deserialType(img){
	var type = img.picture_type;
	if(type != null){
		return JSON.stringify(type).replace(/\"/g, "");
	} else{
		return "";
	}
}

/**
* builds an HTML pdf viewer for the view
* @method pdfBuilder
* @param {object} data The base64 ecoded data (data.image.data)
*/
function pdfBuilder(data){
	var objBuilder = '';
	objBuilder += ('<object width="100%" height="100%"      data="');
    objBuilder += (data);
    objBuilder += ('" type="application/pdf" class="internal">');
    objBuilder += ('<embed src="');
    objBuilder += (data);
    objBuilder += ('" type="application/pdf" />');
    objBuilder += ('</object>');
    return objBuilder
}
