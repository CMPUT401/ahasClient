import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend( AuthenticatedRouteMixin , {
    ajax: Ember.inject.service(),
	model() { //params as param
		var self = this;
		var ajaxGet = new Ember.RSVP.Promise((resolve) =>
        //for nowwwwww
		this.get('ajax').request('/api/patients/1/medical_records/1' //  + params.contact_id
			).then(function(data){
				console.log(data, data.success, data.medical_record);
				Ember.run(function() {
       			 resolve({ 
						   
                            date_created: data.medical_record.created_at, 
                            patient_id: data.medical_record.id, 
                            
                            signature: data.medical_record.id, 

                            temperature: data.medical_record.temperature,
                            eyes: data.medical_record.eyes,
                            oral: data.medical_record.oral,
                            ears: data.medical_record.ears,
                            glands: data.medical_record.glands,
                            skin: data.medical_record.skin,
                            abdomen: data.medical_record.abdomen,
                            urogential: data.medical_record.urogentials,
                            nervousSystem: data.medical_record.nervousSystem,
                            musculoskeletal: data.medical_record.musculoskeletal,
                            cardiovascular: data.medical_record.cardiovascular,
                            heart_rate: data.medical_record. heart_rate,
                            respiratory: data.medical_record.respiratory,
                            respiratory_rate: data.medical_record.respiratory_rate,

                            /*
                            attitudeBAR: document.getElementById('attitudeBAR').checked,
                            attitudeQAR: document.getElementById('attitudeQAR').checked, 
                            attitudeDepressed: document.getElementById('attitudeDepressed').checked,
                            eyesN: document.getElementById('eyesN').checked,
                            eyesA: document.getElementById('eyesA').checked,
                            mmN: document.getElementById('mmN').checked, 
                            mmPale: document.getElementById('mmPale').checked, 
                            mmJaundiced: document.getElementById('mmJaundiced').checked, 
                            mmTacky: document.getElementById('mmTacky').checked, 
                            earsN: document.getElementById('earsN').checked, 
                            earsA: document.getElementById('earsA').checked, 
                            earsEarMites: document.getElementById('earsEarMites').checked, 
                            earsAU: document.getElementById('earsAU').checked, 
                            earsAD: document.getElementById('earsAD').checked, 
                            earsAS: document.getElementById('earsAS').checked, 
                            glandsN: document.getElementById('glandsN').checked, 
                            glandsA: document.getElementById('glandsA').checked,  
                            skinN: document.getElementById('skinN').checked,
                            skinA: document.getElementById('skinA').checked,   
                            abdomenN: document.getElementById('abdomenN').checked,
                            abdomenA: document.getElementById('abdomenA').checked, 
                            urogentialN: document.getElementById('urogentialN').checked,
                            urogentialA: document.getElementById('urogentialA').checked,
                            nervousSystemN: document.getElementById('nervousSystemN').checked,
                            nervousSystemA: document.getElementById('nervousSystemA').checked,
                            musculoskeletalN: document.getElementById('musculoskeletalN').checked,
                            musculoskeletalA: document.getElementById('musculoskeletalA').checked,
                            cardiovascularN: document.getElementById('cardiovascularN').checked,
                            cardiovascularA: document.getElementById('cardiovascularA').checked,
                            respiratoryN: document.getElementById('respiratoryN').checked,
                            respiratoryA: document.getElementById('respiratoryA').checked,*/



                            exam_notes: data.medical_record.exam_notes, 
                            medications: data.medical_record.medications,
                            summary: data.medical_record.summary

				
				});
    		  });
			
			},
			function(data){
				if (data === false){
				self.transitionTo('/unauthorized');
				console.log("status is " + JSON.stringify(data));
				}
		}));
		return(ajaxGet);
	},

});
