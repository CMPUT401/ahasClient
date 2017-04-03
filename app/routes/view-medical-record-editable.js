import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

/**
* Route for view medical record editable
* @class ViewMedicalRecordEditableRoute
*/

export default Ember.Route.extend( AuthenticatedRouteMixin , {
    ajax: Ember.inject.service(),
    index : 1,
	model(params) { 

        var self = this;		


		var ajaxGet = new Ember.RSVP.Promise((resolve) =>

		this.get('ajax').request('/api/patients/'+params.patientID+'/medical_records/'+params.recordID 
			).then(function(data){
				
               self.set('index' , 1);
            
				Ember.run(function() {
       			 resolve({ 
						   
                            unixDate: data.medical_record.date,
                            date: parseDate(new Date(data.medical_record.date * 1000)),
                            date_created: data.medical_record.created_at, 
                            patient_id: data.medical_record.patient_id, 
                            id: data.medical_record.id, 
                            
                            signature: data.medical_record.signature, 

                            temperature: data.medical_record.temperature,
                            eyes: data.medical_record.eyes,
                            oral: data.medical_record.oral,
                            ears: data.medical_record.ears,
                            glands: data.medical_record.glands,
                            skin: data.medical_record.skin,
                            abdomen: data.medical_record.abdomen,
                            urogenital: data.medical_record.urogenital,
                            nervousSystem: data.medical_record.nervousSystem,
                            musculoskeletal: data.medical_record.musculoskeletal,
                            cardiovascular: data.medical_record.cardiovascular,
                            heart_rate: data.medical_record. heart_rate,
                            respiratory: data.medical_record.respiratory,
                            respiratory_rate: data.medical_record.respiratory_rate,

                            
                            attitudeBAR: data.medical_record.attitudeBAR ,
                            attitudeQAR: data.medical_record.attitudeQAR, 
                            attitudeDepressed: data.medical_record.attitudeDepressed,
                            eyesN: data.medical_record.eyesN,
                            eyesA: data.medical_record.eyesA,
                            oralN: data.medical_record.oralN,
                            oralA: data.medical_record.oralA,
                            mmN: data.medical_record.mmN, 
                            mmPale: data.medical_record.mmPale, 
                            mmJaundiced: data.medical_record.mmJaundiced, 
                            mmTacky: data.medical_record.mmTacky, 
                            earsN: data.medical_record.earsN, 
                            earsA: data.medical_record.earsA, 
                            earsEarMites: data.medical_record.earsEarMites, 
                            earsAU: data.medical_record.earsAU, 
                            earsAD: data.medical_record.earsAD, 
                            earsAS: data.medical_record.earsAS, 
                            glandsN: data.medical_record.glandsN, 
                            glandsA: data.medical_record.glandsA,  
                            skinN: data.medical_record.skinN,
                            skinA: data.medical_record.skinA,   
                            abdomenN: data.medical_record.abdomenN,
                            abdomenA: data.medical_record.abdomenA, 
                            urogenitalN: data.medical_record.urogenitalN,
                            urogenitalA: data.medical_record.urogenitalA,
                            nervousSystemN: data.medical_record.nervousSystemN,
                            nervousSystemA: data.medical_record.nervousSystemA,
                            musculoskeletalN: data.medical_record.musculoskeletalN,
                            musculoskeletalA: data.medical_record.musculoskeletalA,
                            cardiovascularN: data.medical_record.cardiovascularN,
                            cardiovascularA: data.medical_record.cardiovascularA,
                            respiratoryN: data.medical_record.respiratoryN,
                            respiratoryA: data.medical_record.respiratoryA,

                            mcsN: data.medical_record.mcsN,
                            mcsMild: data.medical_record.mcsMild,
                            mcsMod: data.medical_record.mcsMod,
                            mcsSevere: data.medical_record.mcsSevere,
                            weight: data.medical_record.weight,

                            //dropdowns
                            weightUnit: setDropdowns(data.medical_record.weightUnit), 
                            bcsVal1: setDropdownBCS(data.medical_record.bcsVal, self),
                            bcsVal2: setDropdownBCS(data.medical_record.bcsVal, self),
                            bcsVal3: setDropdownBCS(data.medical_record.bcsVal, self),
                            bcsVal4: setDropdownBCS(data.medical_record.bcsVal, self),
                            bcsVal5: setDropdownBCS(data.medical_record.bcsVal, self),
                            bcsVal6: setDropdownBCS(data.medical_record.bcsVal, self),
                            bcsVal7: setDropdownBCS(data.medical_record.bcsVal, self),
                            bcsVal8: setDropdownBCS(data.medical_record.bcsVal, self),
                            bcsVal9: setDropdownBCS(data.medical_record.bcsVal, self),


                            exam_notes: data.medical_record.exam_notes, 
                            followUpNotes: data.medical_record.follow_up_instructions,
                            summary: data.medical_record.summary ,

                            //to determine if edit button is disabled or not
                            editable: checkUpdate( new Date(data.medical_record.date * 1000)) ,

                            //medications
                            medicine: deserialAttributesMedicines(data.medications), 
                            vaccine: deserialAttributesVaccines(data.medications),
                            other:deserialAttributesOthers(data.medications) 
                          
				
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
		return(ajaxGet);
	}

});

/**  
  * returns new Date parsed in a nice way to display at the top of the medical record
  * format example: Monday January 21, 2017 5:12
  * where time is in twenty four hour clock
  * @method parseDate
  * @param {Date} date to parse
  */ 

function parseDate(date){
        var days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
        var months = ["January","February","March","April","May","June","July", "August", "September", "October", "November", "December"];
        var day = date.getDay() ;
        var month = date.getMonth()  ;
        var year = date.getFullYear();
        var hours = date.getHours();
        var mins = (date.getMinutes()<10?'0':'') + date.getMinutes();
        var whole = days[day] +" "+ months[month]+ " " + date.getDate().toString() +", "+ year.toString() + " "+ hours.toString() + ":" + mins.toString();
        return(whole);
}

/**  
  * sets a boolean to determine the load state of the dropdown for weight unit
  * @method setDropdowns
  * @param {string} value the string that is the weight unit 
  */ 

function setDropdowns(value){
    if (value === "kg"){
        return(true);
    }
    return(false);
}

/**  
  * used to determine the load state of the dropdown for the BCS value
  * when it finds the value between 1 and 9 that is stored it returns true else false
  * this uses the index attribute of the route which is incremented with each iteration
  * the attribute is used so that this function is generic, the attribute is reset on each route load
  * @method setDropdownBCS
  * @param {string} value the string that is the weight unit
  * @param {route} self the route
  */ 

function setDropdownBCS(value, self){
    if(value === self.get('index') ){
        self.set('index' , self.get('index')+1);
        return(true);
    }
    self.set('index' , self.get('index')+1);
    return(false);
}

/**  
  * checks to see if we can update this particular medical record
  * if it the same month year day and hours for the day are before midnight we can update
  * this boolean will set whether the button on this page is disabled or not
  * this check is actually only a second precaution on update ability
  * the idea is that we wont get to this route if its not updateable, but if they navigate
  * there manually with a url we still need precautions
  * @method checkUpdate
  * @param {Date} date
  */ 

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

/**  
  * iterates through the array of medications and sorts into types
  * assigns the inner attributes of a medication to the inner attributes of the object that is
  * created so that the list of objects can be accessed in the route
  * @method deserialAttributesMedicines
  * @param {array} medications
  */ 

function deserialAttributesMedicines(medications){
	var deserial = [];
	for(var i = 0; i < medications.length; i++) {

        //bc at some point data was created with both (over component integration period)
		if(medications[i].med_type === 'medicine' || medications[i].med_type === 'Medicine'  ){
		var medication = medications[i];
		medication.name = medication.name;
        medication.id = medication.id;
        medication.patient_id = medication.patient_id;
        medication.medical_record_id = medication.medical_record_id;
        medication.reminder = format(medication.reminder);
		deserial.push(medication);
	}
  }
	return(deserial);
}

/**  
  * iterates through the array of medications and sorts into types
  * assigns the inner attributes of a medication to the inner attributes of the object that is
  * created so that the list of objects can be accessed in the route
  * @method deserialAttributesVaccines
  * @param {array} vaccines
  */ 

function deserialAttributesVaccines(vaccines){
	var deserial = [];
	for(var i = 0; i < vaccines.length; i++) {

		if(vaccines[i].med_type === 'vaccine'||vaccines[i].med_type === 'Vaccine'){
		var vaccine = vaccines[i];
		vaccine.name = vaccine.name;
        vaccine.reminder= format(vaccine.reminder);
        vaccine.id = vaccine.id;
        vaccine.patient_id = vaccine.patient_id;
        vaccine.medical_record_id = vaccine.medical_record_id;
		deserial.push(vaccine);
	}
  }
	return(deserial);
}

/**  
  * iterates through the array of medications and sorts into types
  * assigns the inner attributes of a medication to the inner attributes of the object that is
  * created so that the list of objects can be accessed in the route
  * @method deserialAttributesOthers
  * @param {array} others
  */ 

function deserialAttributesOthers(others){
	var deserial = [];
	for(var i = 0; i < others.length; i++) {

		if(others[i].med_type === 'other'|| others[i].med_type === 'Other'){
		var other = others[i];
		other.name = other.name;
        other.id = other.id;
        other.patient_id = other.patient_id;
        other.medical_record_id = other.medical_record_id;
        other.reminder = format(other.reminder);
		deserial.push(other);
	}
  }
	return(deserial);
}

/** 
 * used to format the dates that we display in the medications
 * converts from unix time in seconds to format of mm/dd/yyyy
 * @method   formatDate
 * @param {date} date the date to be formatted
 */ 

function format(date){
    var partialDate = new Date(date * 1000);
    var day = (partialDate.getDate()<10?'0':'' )+ partialDate.getDate();
    var month = (partialDate.getMonth()<10?'0':'' )+ (partialDate.getMonth()+1);
    return(new Date(month+"/"+ day +"/"+partialDate.getFullYear()));
}