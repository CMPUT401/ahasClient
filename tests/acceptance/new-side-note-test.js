import { test } from 'qunit';
import moduleForAcceptance from 'ahasweb/tests/helpers/module-for-acceptance';
import { authenticateSession, invalidateSession } from '../helpers/ember-simple-auth';

moduleForAcceptance('Acceptance | new side note');

test('visiting /new-side-note/', function(assert) {
	authenticateSession(this.application);
	visit('/new-side-note/');

	andThen(function() {
		assert.equal(currentURL(), '/new-side-note/');
	});
});


test('creating new side note successful', function(assert) {
  invalidateSession(this.application);
  visit('/new-side-note');
  
  fillIn('#medNotes', "Need to take asprine 4 times a day");
  fillIn('#medSignature', "Newbury");
  click('#create-sidenote-button');
    andThen(function(){
    assert.notEqual(currentURL(), '/new-side-note /');
  });
});


test('creating new side note unsuccessful', function(assert) {
  authenticateSession(this.application);
  visit('/new-side-note');
  
  fillIn('#medNotes', "");
  fillIn('#medSignature', "");
  click('#create-sidenote-button');
    andThen(function(){
    assert.equal(currentURL(), '/new-side-note');
  });
});