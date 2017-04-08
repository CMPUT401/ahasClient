import { test } from 'qunit';
import moduleForAcceptance from 'ahasweb/tests/helpers/module-for-acceptance';
import { authenticateSession } from '../helpers/ember-simple-auth';

moduleForAcceptance('Acceptance | list side note');

test('visiting /new-side-note/', function(assert) {
	authenticateSession(this.application);
	visit('/new-side-note/');

	andThen(function() {
		assert.equal(currentURL(), '/new-side-note/');
	});
});