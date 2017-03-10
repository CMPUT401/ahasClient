import { test } from 'qunit';
import moduleForAcceptance from 'ahasweb/tests/helpers/module-for-acceptance';
import { authenticateSession, invalidateSession } from '../helpers/ember-simple-auth';

test('visiting /new-calendar/ before login', function(assert) {
	invalidateSession(this.application);
	visit('new-calendar');

	andThen(function(){
		assert.notEqual(currentURL(), '/new-calendar/');
	});
});

test('visiting /new-calendar/', function(assert) {
	authenticateSession(this.application);
	visit('/new-calendar/');

	andThen(function() {
		assert.equal(currentURL(), '/new-calendar/');
	});
});

test('creating new calendar unsuccessful', function(assert) {
  authenticateSession(this.application);
  visit('/new-calendar');
  
  fillIn('#medNote', "Need to take asprine 4 times a day");
  fillIn('#medSig', "Newbury");
  click('#create-sidenote-button');
    andThen(function(){
    assert.equal(currentURL(), '/new-calendar/');
  });
});