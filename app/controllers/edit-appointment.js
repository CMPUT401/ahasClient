import Ember from 'ember';
/**
* Controller for the new calendar page
* This shows all of the appointments stuff for the user to enter
* @class new-calendar Controller
*/
export default Ember.Controller.extend({
	ajax: Ember.inject.service(),
	session: Ember.inject.service(),
	actions: 
	{
		/**
        * Does a post on the backend with the fields passed in
        * @method submitNewCalendar
        */
		doAppointment(aid)
		{
			document.getElementById("create-appointment-button").disabled = true;
			console.log("cuns");
			var self = this;
			let ajaxPost = this.get('ajax').request('/api/schedules/'+aid,
			{
				method: 'PATCH',
				type: 'application/json',
				data: { schedule:
					{
					appointmentStartDate: 	JSON.stringify(formatDate(document.getElementById("appointmentStart").value, document.getElementById('appointmentStartTime').value)),
					reason: 				this.get('appointmentReason'),
					notes: 					this.get('appointmentNote'),
					location: 				this.get('appointmentLocation'),
					duration: 	this.get('appointmentEndTime')
				}
			
			}, 
		
			});
			ajaxPost.then(function(data){
				//console.log("status is " + model.clientid);
				showAlert("Appointment created!", true);
				self.transitionToRoute('view-calendar');
			},
			function(data){
				document.getElementById("create-appointment-button").disabled = false;
				if (data === false){
					if (self.get('session.isAuthenticated')){
						self.get('session').invalidate();
							}
					self.transitionToRoute('/login');
				}
			});
		return ajaxPost;
	},
	         /** 
		* handles action called when user clicks delete-appointment-button
        * sends a put request to the server to delete the appointment that we are currently on
		* @method  deleteAppointment
		* @param {int} id The id of the appointment to delete
		*/
    deleteAppointment: function(id) {

    var self = this;

    var user = this.get('ajax').delete('/api/schedules/' + aid, {
    
     });
     user.then(function(response){
    
            if(response.success){
            
                showAlert("Appointment deleted", true);
                self.transitionToRoute('/view-calendar');
            }

        //this is error from server condition
        }, function(response) {
            showAlert("Could not delete", false);
					if (response === false){
						if (self.get('session.isAuthenticated')){
							self.get('session').invalidate();
							}
						self.transitionToRoute('/login');
					}
				});

     }
}
	
});
		/**
        * Should show up with an alert if something went wrong
        * @method showAlert
        * @params {?,bool} 
        */
 function showAlert(message, bool) {
        if(bool){
            Ember.$('#alert_placeholder').html('<div class="alert alert-success"><a class="close" data-dismiss="alert">×</a><span  id="statusGood">'+message+'</span></div>');
        }
        else{
             Ember.$('#alert_placeholder').html('<div class="alert alert-danger" ><a class="close" data-dismiss="alert">×</a><span id="statusBad">'+message+'</span></div>');
        }
 }
/**
* Formate Date, changes the date from unix time to human readable one
* @method formatDate
* @params {date, object} date in unix, time in time
*/

function formatDate(date,time){
	var splitdate = date.split("/");
	var splittime = time.split(":");
  	var newdate = [];
  	newdate.push(splitdate[2]);
  	newdate.push(splitdate[0] -1);
  	newdate.push(splitdate[1]);
  	var rightdate = newdate.concat(splittime);
  	var formatted = moment(rightdate).unix();
  	//var half = new Date(date);
  	//var formatted = Math.floor(half.getTime() / 1000);
  	return(formatted);
}
