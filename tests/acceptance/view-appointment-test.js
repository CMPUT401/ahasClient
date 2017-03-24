import { test } from 'qunit';
import moduleForAcceptance from 'ahasweb/tests/helpers/module-for-acceptance';
import { authenticateSession, invalidateSession } from '../helpers/ember-simple-auth';



moduleForAcceptance('Acceptance |view appointment');

//these are commented out because they will break all tests, becuase fake model is not correct for it is not correct in mirage/config atm

test('visiting /view-appointment/ before login', function(assert) {
	invalidateSession(this.application);
	visit('view-appointment');

	andThen(function(){
		assert.notEqual(currentURL(), '/view-appoitment');
	});
});
