import { test } from 'qunit';
import moduleForAcceptance from 'ahasweb/tests/helpers/module-for-acceptance';
import { authenticateSession, invalidateSession } from '../helpers/ember-simple-auth';

moduleForAcceptance('Acceptance | client list');

test('visiting /client-list', function(assert) {
	authenticateSession(this.application)
	visit('/client-list');

	andThen(function() {
		assert.equal(currentURL(), '/client-list');
	});
});
