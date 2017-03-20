import Ember from 'ember';

export default Ember.Controller.extend({
      medicine: [],
      vaccine: [],
      other: [],
      ajax: Ember.inject.service(),
      actions: {

          updateMedicalRecord(id){

             var self = this;

             var bcsvalue= document.getElementById('bcsvalue');
             var bcsVal = bcsvalue.options[bcsvalue.selectedIndex].text;

             var unit = document.getElementById('unit');
             var weightUnit = unit.options[unit.selectedIndex].text;

              
             var medicalRecord = this.get('ajax').put('/api/patients/'+ id+'/medical_records/19', {
             type: 'application/json',
             data: { 
                 medical_record: {
   
             //things that are not updateable on our form
             date: this.get('model.unixDate'),  
             patient_id: id,
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
         medications: gatherMedications(id),
        
    }
               });
                medicalRecord.then(function(response){
            if(response.success){
                showAlert("Record updated, record is editable until 12pm tonight", true);
            }
        //this is error from server condition
        }, function(response) {
            showAlert("Could not update", false);
            console.log("status is " + JSON.stringify(response));
					if (response === false){
						if (self.get('session.isAuthenticated')){
							self.get('session').invalidate();
							}
						self.transitionToRoute('/login');
					}
				});

        },
     // checks all of the N's and the BAR
     checkAll(){
          var normals = document.getElementsByClassName("norm");
          for (var i=0; i<normals.length; i++){
              normals[i].checked = true;
          }
      }, 
      // unchecks all of N's and BAR
      uncheckAll(){
          var normals = document.getElementsByClassName("norm");
          for (var i=0; i<normals.length; i++){
              normals[i].checked = false;
          }        
      },
      
      addMedication(){
          var divMedication = document.getElementById('medicationDiv');
          var textMedication = document.createElement('div');
          var buttonMedication =  document.createElement('button');
          buttonMedication.setAttribute('class', 'removeButton');
          buttonMedication.setAttribute('id', 'removeOther');
          buttonMedication.setAttribute('type', 'submit');
          buttonMedication.innerHTML = 'x';
          buttonMedication.onclick = function() { Ember.$(this).parent('div').remove();};

          var dateMedication =  document.createElement('input');
          dateMedication.setAttribute('id', 'reminderMedication');
          dateMedication.setAttribute('class', 'reminderMedication');
          dateMedication.setAttribute('placeholder', 'use calendar to set');
          dateMedication.onclick = function() {
               this.value= document.getElementById('datePickerMedication').value;
            };
     
          textMedication.innerHTML = "<input class='medication' placeholder='medication type'>";
          textMedication.appendChild(dateMedication);
          textMedication.appendChild(buttonMedication);
          divMedication.appendChild(textMedication);

      },

      addVaccine(){
          var divVaccine = document.getElementById('vaccineDiv');
          var textVaccine = document.createElement('div');
          var buttonVaccine =  document.createElement('button');
          buttonVaccine.setAttribute('class', 'removeButton');
          buttonVaccine.setAttribute('id', 'removeOther');
          buttonVaccine.setAttribute('type', 'submit');
          buttonVaccine.innerHTML = 'x';
          buttonVaccine.onclick = function() { Ember.$(this).parent('div').remove();};

          var dateVaccine =  document.createElement('input');
          dateVaccine.setAttribute('id', 'reminderVaccine');
          dateVaccine.setAttribute('class', 'reminderVaccine');
          dateVaccine.setAttribute('placeholder', 'use calendar to set');
          dateVaccine.onclick = function() {
               this.value= document.getElementById('datePickerVaccine').value;
            };

          textVaccine.innerHTML = "<input class='vaccine' placeholder='vaccine type'>"; 
          textVaccine.appendChild(dateVaccine);
          textVaccine.appendChild(buttonVaccine);
          divVaccine.appendChild(textVaccine);

      },

      addOther(){
          var divOther = document.getElementById('otherDiv');
          var textOther = document.createElement('div');
          var buttonOther =  document.createElement('button');
          buttonOther.setAttribute('class', 'removeButton');
          buttonOther.setAttribute('id', 'removeOther');
          buttonOther.setAttribute('type', 'submit');
          buttonOther.innerHTML = 'x';
          buttonOther.onclick = function() { Ember.$(this).parent('div').remove();};

          var dateOther =  document.createElement('input');
          dateOther.setAttribute('id', 'reminderOther');
          dateOther.setAttribute('class', 'reminderOther');
          dateOther.setAttribute('placeholder', 'use calendar to set');
          dateOther.onclick = function() {
              this.value= document.getElementById('datePickerOther').value;
          };

          textOther.innerHTML = "<input class='other' placeholder='other type'>";
          textOther.appendChild(dateOther);
          textOther.appendChild(buttonOther);
          divOther.appendChild(textOther);

      },

        //for (re)setting reminders on editable template, for old medications only, new use javascript onclick
        dateMedicationClick(item) {
              Ember.set(item, 'reminderToDisplay', document.getElementById('datePickerMedication').value );
               
            },

        dateVaccineClick(item) {
              Ember.set(item, 'reminderToDisplay', document.getElementById('datePickerVaccine').value );
               
            },

        dateOtherClick(item) {
              Ember.set(item, 'reminderToDisplay', document.getElementById('datePickerOther').value );
               
            },

        removeMedications(id){
            var newMeds = [];
            var medications = this.get('model.medications');
            for(var i =0; i<medications.length; i++){
                if (medications[i].id !== id){
                    newMeds.push(medications[i]);
                }
            }
            this.set('model.medications', newMeds);
        }, 
        removeVaccines(id){
            var newVaccines = [];
            var vaccines = this.get('model.vaccines');
            for(var j =0; j<vaccines.length; j++){
                if (vaccines[j].id !== id){
                    newVaccines.push(vaccines[j]);
                }
            }
            this.set('model.vaccines', newVaccines);
        },
        removeOthers(id){
            var newOthers = [];
            var others = this.get('model.others');
            for(var k =0; k<others.length; k++){
                if (others[k].id !== id){
                    newOthers.push(others[k]);
                }
            }
            this.set('model.others', newOthers);
        }
    }
});

//gathers all of the medications from the medication inputs and sorts them into an appropriate list to be sent to server
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

function showAlert(message, bool) {
        if(bool){
            Ember.$('#alert_placeholder_med').html('<div class="alert alert-success"><a class="close" data-dismiss="alert">×</a><span  id="statusGood">'+message+'</span></div>');
        }
        else{
             Ember.$('#alert_placeholder_med').html('<div class="alert alert-danger" ><a class="close" data-dismiss="alert">×</a><span id="statusBad">'+message+'</span></div>');
        }
 }
