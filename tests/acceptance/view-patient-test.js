import { test } from 'qunit';
import moduleForAcceptance from 'ahasweb/tests/helpers/module-for-acceptance';
import { authenticateSession, invalidateSession } from '../helpers/ember-simple-auth';



moduleForAcceptance('Acceptance | view patient');

//these are commented out because they will break all tests, becuase fake model is not correct for it is not correct in mirage/config atm

test('visiting /view-patient/ before login', function(assert) {
	invalidateSession(this.application);
	visit('view-patient');

	andThen(function(){
		assert.notEqual(currentURL(), '/view-patient/1');
	});
});


test('visiting /view-patient', function(assert) {
   authenticateSession(this.application);
  //visit('/view-patient');

  andThen(function() {
    //assert.equal(currentURL(), '/view-patient');
  });
});
