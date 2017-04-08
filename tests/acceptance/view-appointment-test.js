import { test } from 'qunit';
import moduleForAcceptance from 'ahasweb/tests/helpers/module-for-acceptance';
import { invalidateSession } from '../helpers/ember-simple-auth';



moduleForAcceptance('Acceptance |view appointment');


test('visiting /view-appointment/ before login', function(assert) {
	invalidateSession(this.application);
	visit('/view-appointment/1');

	andThen(function(){
		assert.notEqual(currentURL(), '/view-appointment/1');
	});
});
