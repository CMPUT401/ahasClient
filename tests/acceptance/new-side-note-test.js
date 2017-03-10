import { test } from 'qunit';
import moduleForAcceptance from 'ahasweb/tests/helpers/module-for-acceptance';
import { authenticateSession, invalidateSession } from '../helpers/ember-simple-auth';

moduleForAcceptance('Acceptance | new side note');

test('visiting /new-side-note/ before login', function(assert) {
	invalidateSession(this.application);
	visit('/new-side-note/');

	andThen(function(){
		assert.notEqual(currentURL(), '/new-side-note/');
	});
});

test('visiting /new-side-note/', function(assert) {
	authenticateSession(this.application);
	visit('/new-side-note/');

	andThen(function() {
		assert.equal(currentURL(), '/new-side-note/');
	});
});

test('creating new side note successful', function(assert) {
  authenticateSession(this.application);
  visit('/new-side-note');
  
  fillIn('#medNote', "Need to take asprine 4 times a day");
  fillIn('#medSig', "Newbury");
  click('#create-sidenote-button');
    andThen(function(){
    assert.notEqual(currentURL(), '/new-side-note/');
  });
});


test('creating new side note unsuccessful', function(assert) {
  authenticateSession(this.application);
  visit('/new-side-note');
  
  fillIn('#medNote', "");
  fillIn('#medSig', "");
  click('#create-sidenote-button');
    andThen(function(){
    assert.Equal(currentURL(), '/new-side-note/');
  });
});