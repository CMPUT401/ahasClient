import { test } from 'qunit';
import moduleForAcceptance from 'ahasweb/tests/helpers/module-for-acceptance';
import { authenticateSession, invalidateSession } from '../helpers/ember-simple-auth';



moduleForAcceptance('Acceptance | edit appointment');

//these are commented out because they will break all tests, becuase fake model is not correct for it is not correct in mirage/config atm

test('visiting /edit-appointment/ before login', function(assert) {
	invalidateSession(this.application);
	visit('/edit-appointment/1');

	andThen(function(){
		assert.notEqual(currentURL(), '/edit-appointment/1');
	});
});


test('visiting /edit-appointment', function(assert) {
   authenticateSession(this.application);
  visit('/edit-appointment/1');

  andThen(function() {
    assert.equal(currentURL(), '/edit-appointment/1');
  });
});
