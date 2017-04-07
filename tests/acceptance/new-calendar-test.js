import { test } from 'qunit';
import moduleForAcceptance from 'ahasweb/tests/helpers/module-for-acceptance';
import { authenticateSession, invalidateSession } from '../helpers/ember-simple-auth';

moduleForAcceptance('Acceptance | new-calendar');

test('visiting /new-calendar/ before login', function(assert) {
	invalidateSession(this.application);
	visit('new-calendar');

	andThen(function(){
		assert.notEqual(currentURL(), '/new-calendar');
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
  visit('/new-calendar/');
  
  fillIn('#appointmentStart', "tttt");
  fillIn('#appointmentStartTime', "sssy");
  click('#create-appointment-button');
    andThen(function(){
    assert.equal(currentURL(), '/new-calendar/');
  });
});