import Ember from 'ember';

export default Ember.Controller.extend({
    ajax: Ember.inject.service(),   
    actions: {

       
        createMedicalRecord(){
            
            
             var medicalRecord = this.get('ajax').post('/api/medical-record', {
             type: 'application/json',
             data: { 
                 medical_record: {
             
           

             temperatureText: this.get('temperatureText'),
             eyesText: this.get('eyesText'),
             oralText: this.get('oralText'),
             earsText: this.get('earsText'),
             glandsText: this.get('glandsText'),
             skinText: this.get('skinText'),
             abdomenText: this.get('abdomenText'),
             urogentialText: this.get('urogentialText'),
             nervousSystemText: this.get('nervousSystemText'),
             musculoskeletalText: this.get('musculoskeletalText'),
             cardiovascularText: this.get('cardiovascularText'),
             hrText: this.get('hrText'),
             respiratoryText1: this.get('respiratoryText1'),
             respiratoryText2: this.get('respiratoryText2'),

             
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
             respiratoryA: document.getElementById('respiratoryA').checked,



             notes: this.get('notes'), 
             medications: this.get('medications'),

        }
    }
    });

        medicalRecord.then(function(response){
            if(response.success){
                showAlert("Record created, record is editable until 12pm tonight", true);
            }
        //this is error from server condition
        }, function(response) {
            console.log("status is " + JSON.stringify(response));
					if (response === false){
						if (self.get('session.isAuthenticated')){
							self.get('session').invalidate();
							}
						self.transitionToRoute('/unauthorized');
					}
				});
        }

    }
});

function showAlert(message, bool) {
        if(bool){
            Ember.$('#alert_placeholder').html('<div class="alert alert-success"><a class="close" data-dismiss="alert">×</a><span  id="statusGood">'+message+'</span></div>');
        }
        else{
             Ember.$('#alert_placeholder').html('<div class="alert alert-danger" ><a class="close" data-dismiss="alert">×</a><span id="statusBad">'+message+'</span></div>');
        }
 }

