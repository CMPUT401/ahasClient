import Ember from 'ember';

export default Ember.Controller.extend({
	ajax: Ember.inject.service(),
	session: Ember.inject.service(),
	actions: 
	{
		submitNewCalendar()
		{
			console.log(JSON.stringify(formatDate(document.getElementById("appointmentStart").value, this.get('appointmentStartTime'))));
			document.getElementById("create-appointment-button").disabled = true;
			var self = this;
			let ajaxPost = this.get('ajax').request('/api/schedules',
			{
				method: 'POST',
				type: 'application/json',
				data: { schedule:
					{
					appointmentStartDate: 	JSON.stringify(formatDate(document.getElementById("appointmentStart").value, this.get('appointmentStartTime'))),
					clientId: 				this.get('c_ID'),
					reason: 				this.get('appointmentReason'),
					notes: 					this.get('appointmentNote'),
					location: 				this.get('appointmentLocation'),
					appointmentEndDate: 	JSON.stringify(formatDate(document.getElementById("appointmentEnd").value, this.get('appointmentEndTime')))
				}
			
			}, 
		
			});
			ajaxPost.then(function(data){
				//console.log("status is " + model.clientid);
				showAlert("Appointment created!", true);
				self.transitionToRoute('view-calendar')
			},
			function(data){
				document.getElementById("create-appointment-button").disabled = false;
				if (data === false){
					if (self.get('session.isAuthenticated')){
						self.get('session').invalidate();
							}
					self.transitionToRoute('/unauthorized');
				}
			});
		return ajaxPost;
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


function formatDate(date,time){
	var splitdate = date.split("/");
	var splittime = time.split(":");
  	var newdate = [];
  	newdate.push(splitdate[2]);
  	newdate.push(splitdate[0]);
  	newdate.push(splitdate[1]);
  	var rightdate = newdate.concat(splittime);
  	var formatted = moment(rightdate).unix();
  	//var half = new Date(date);
  	//var formatted = Math.floor(half.getTime() / 1000);
  	return(formatted);
}
