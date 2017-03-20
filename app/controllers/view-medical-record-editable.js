import Ember from 'ember';

export default Ember.Controller.extend({
      ajax: Ember.inject.service(),
      actions: {
          updateMedicalRecord(){

             var bcsvalue= document.getElementById('bcsvalue');
             var bcsVal = bcsvalue.options[bcsvalue.selectedIndex].text;

             var unit = document.getElementById('unit');
             var weightUnit = unit.options[unit.selectedIndex].text;

              
             var medicalRecord = this.get('ajax').put('/api/patients/'+ this.get('model.patientID')+'/medical_records', {
             type: 'application/json',
             data: { 
                 medical_record: {
   
             //things that are not updateable
             date: this.get('model.date'),  
             patient_id: this.get('model.patientID'),
             signature: this.get('model.signature'), 

             //inputs
             temperature: document.getElementById('temperatureText').value,
             eyes: document.getElementById('eyesText').value,
             oral: document.getElementById('oralText').value,
             ears: document.getElementById('earsText').value,
             glands: document.getElementById('glandsText').value,
             skin: document.getElementById('skinText').value,
             abdomen: document.getElementById('abdomenText').value,
             urogential: document.getElementById('urogentialText').value,
             nervousSystem: document.getElementById('nervousSystemText').value,
             musculoskeletal: document.getElementById('musculoskeletalText').value,
             cardiovascular: document.getElementById('cardiovascularText').value,
             heart_rate: document.getElementById('hrText').value,
             respiratory: document.getElementById('respiratoryText1').value,
             respiratory_rate: document.getElementById('respiratoryText2').value,

             //checkboxes
             attitudeBAR: document.getElementById('attitudeBAR').checked,
             attitudeQAR: document.getElementById('attitudeQAR').checked, 
             attitudeDepressed: document.getElementById('attitudeDepressed').checked,
             eyesN: document.getElementById('eyesN').checked,
             eyesA: document.getElementById('eyesA').checked,
             oralN: document.getElementById('oralN').checked,
             oralA: document.getElementById('oralA').checked,
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
             urogentialN: document.getElementById('urogenitalN').checked,
             urogentialA: document.getElementById('urogenitalA').checked,
             nervousSystemN: document.getElementById('nervousSystemN').checked,
             nervousSystemA: document.getElementById('nervousSystemA').checked,
             musculoskeletalN: document.getElementById('musculoskeletalN').checked,
             musculoskeletalA: document.getElementById('musculoskeletalA').checked,
             cardiovascularN: document.getElementById('cardiovascularN').checked,
             cardiovascularA: document.getElementById('cardiovascularA').checked,
             respiratoryN: document.getElementById('respiratoryN').checked,
             respiratoryA: document.getElementById('respiratoryA').checked,

             mcsN: document.getElementById('mcsN').checked,
             mcsMild: document.getElementById('mcsMild').checked,
             mcsMod: document.getElementById('mcsMod').checked,
             mcsSevere: document.getElementById('mcsSevere').checked,
             weight: document.getElementById('weight').value,

             //dropdown values
             weightUnit: weightUnit, 
             bcsVal: bcsVal,


             //textareas
             follow_up_instructions: document.getElementById('followUpNotes').value,
             exam_notes: document.getElementById('notes').value, 
             summary: document.getElementById('summary').value

           
        },
         medications: gatherMedications(this.get('model.patientID')),
        
    }
               });
                medicalRecord.then(function(response){
            if(response.success){
                showAlert("Record updated, record is editable until 12pm tonight", true);
            }
        //this is error from server condition
        }, function(response) {
            console.log("status is " + JSON.stringify(response), response);
					if (response === false){
						if (self.get('session.isAuthenticated')){
							self.get('session').invalidate();
							}
						self.transitionToRoute('/login');
					}
				});

          },
    checkAll(){
          var normals = document.getElementsByClassName("norm");
          for (var i=0; i<normals.length; i++){
              normals[i].checked = true;
          }
      }, 
      uncheckAll(){
          var normals = document.getElementsByClassName("norm");
          for (var i=0; i<normals.length; i++){
              normals[i].checked = false;
          }        
      }
    }
});

function gatherMedications(id){
    var medications = [];
    var medication = document.getElementsByClassName('medication');
    var medicationReminders = document.getElementsByClassName('reminderMedication');
    for (var i  = 0; i<medication.length; i++){
        var nondateMedication = medicationReminders[i].value;
        var halfformattedDateMedication = new Date(nondateMedication);
        var formattedDateMedication = Math.floor(halfformattedDateMedication.getTime() / 1000);
        var formattedMed = { med_type:"medicine" , name:medication[i].value, reminder:formattedDateMedication, patient_id:id };
        medications.push(formattedMed);

          }

    var vaccine = document.getElementsByClassName('vaccine');
    var vaccineReminders = document.getElementsByClassName('reminderVaccine');
    for (var j  = 0; j<vaccine.length; j++){
        var nondateVaccine = vaccineReminders[j].value;
        var halfformattedDateVaccine = new Date(nondateVaccine);
        var formattedDateVaccine = Math.floor(halfformattedDateVaccine.getTime() / 1000);
        var formattedVaccine = { med_type:"vaccine" , name:vaccine[j].value, reminder:formattedDateVaccine, patient_id:id};
        medications.push(formattedVaccine);

          }

    var other = document.getElementsByClassName('other');
    var otherReminders = document.getElementsByClassName('reminderOther');
    for (var k  = 0; k<other.length; k++){
        var nondateOther = otherReminders[k].value;
        var halfformattedDateOther = new Date(nondateOther);
        var formattedDateOther = Math.floor(halfformattedDateOther.getTime() / 1000);
        var formattedOther = { med_type:"other" , name:other[k].value, reminder:formattedDateOther, patient_id:id};
        medications.push(formattedOther);

          }
    console.log(medications);
    return(medications);
    
}