import { test } from 'qunit';
import moduleForAcceptance from 'ahasweb/tests/helpers/module-for-acceptance';
import { authenticateSession, invalidateSession } from '../helpers/ember-simple-auth';

moduleForAcceptance('Acceptance | client info');

test('visiting /client-info/1', function(assert) {
	authenticateSession(this.application);
	visit('/client-info/1');

	andThen(function() {
		assert.equal(currentURL(), '/client-info/1');
	});
});
