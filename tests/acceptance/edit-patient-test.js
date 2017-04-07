import { test } from 'qunit';
import moduleForAcceptance from 'ahasweb/tests/helpers/module-for-acceptance';
import { authenticateSession, invalidateSession } from '../helpers/ember-simple-auth';



moduleForAcceptance('Acceptance | edit patient');

//these are commented out because they will break all tests, becuase fake model is not correct for it is not correct in mirage/config atm

test('visiting /edit-patient/ before login', function(assert) {
	invalidateSession(this.application);
	visit('/edit-patient/1');

	andThen(function(){
		assert.notEqual(currentURL(), '/edit-patient/1');
	});
});


test('visiting /edit-patient', function(assert) {
   authenticateSession(this.application);
  visit('/edit-patient/1');

  andThen(function() {
    assert.equal(currentURL(), '/edit-patient/1');
  });
});
