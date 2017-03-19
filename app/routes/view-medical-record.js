import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend( AuthenticatedRouteMixin , {
    ajax: Ember.inject.service(),
	model(params) { //params as param


     
		
        var self = this;

        //undefined because the promise in the routes tranistion to method resolves after all of the below....
        console.log('our id', this.controllerFor('view-medical-record'), this.controllerFor('view-medical-record').p_ID, this.controllerFor('view-medical-record').get('p_ID'));

		var ajaxGet = new Ember.RSVP.Promise((resolve) =>

		this.get('ajax').request('/api/patients/'+params.patientID+'/medical_records/1' //  + params.contact_id
			).then(function(data){
				
              
            
				Ember.run(function() {
       			 resolve({ 
						   

                            date_created: data.medical_record.created_at, 
                            patient_id: data.medical_record.id, 
                            
                            signature: data.medical_record.signature, 

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
                            urogentialN: data.medical_record.urogentialN,
                            urogentialA: data.medical_record.urogentialA,
                            nervousSystemN: data.medical_record.nervousSystemN,
                            nervousSystemA: data.medical_record.nervousSystemA,
                            musculoskeletalN: data.medical_record.musculoskeletalN,
                            musculoskeletalA: data.medical_record.musculoskeletalA,
                            cardiovascularN: data.medical_record.cardiovascularN,
                            cardiovascularA: data.medical_record.cardiovascularA,
                            respiratoryN: data.medical_record.respiratoryN,
                            respiratoryA: data.medical_record.respiratoryA,



                            exam_notes: data.medical_record.exam_notes, 
                            medications: data.medical_record.medications,
                            followUpNotes: data.medical_record.follow_up_instructions,
                            //vaccines: data.medical_record.vaccines, //currently not implemented back end i think as per api
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

