import { test } from 'qunit';
import moduleForAcceptance from 'ahasweb/tests/helpers/module-for-acceptance';
import { authenticateSession, invalidateSession } from '../helpers/ember-simple-auth';

moduleForAcceptance('Acceptance | view client');

test('visiting /view-client/1 before login', function(assert) {
	invalidateSession(this.application);
	visit('/view-client/1');

	andThen(function(){
		assert.notEqual(currentURL(), '/view-client/1');
	});
});

test('visiting /view-client/1', function(assert) {
	authenticateSession(this.application);
	visit('/view-client/1');

	andThen(function() {
		assert.equal(currentURL(), '/view-client/1');
	});
});

test('last name, first name is present', function(assert) {
	authenticateSession(this.application);
	visit('/view-client/1');

	andThen(function(){
		let item = find("#clientNameHeader").text().trim();
		assert.equal(item, "Johny Bravo");
	});
});

test('transitions to new-patient after clicking Add A Patient button', function(assert){
	authenticateSession(this.application);
	visit('/view-client/1');

	click('#add-patient-button');
	andThen(function(){
		assert.equal(currentURL(), '/new-patient');
	});
});