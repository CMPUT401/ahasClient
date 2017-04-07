import { test } from 'qunit';
import moduleForAcceptance from 'ahasweb/tests/helpers/module-for-acceptance';
import { authenticateSession, invalidateSession } from '../helpers/ember-simple-auth';
moduleForAcceptance('Acceptance | search patient');

test('visiting /search-patient/ before login', function(assert) {
	invalidateSession(this.application);
	visit('search-patient');

	andThen(function(){
		assert.notEqual(currentURL(), '/search-patient/');
	});
});

test('visiting /search-patient/', function(assert) {
	authenticateSession(this.application);
	visit('/search-patient/');

	andThen(function() {
		assert.equal(currentURL(), '/search-patient/');
	});
});

test('checking search info rendered before search', function(assert) {
  authenticateSession(this.application);
  visit('/search-patient');

  andThen(function() {
    let item = find(".list-group-item").first().text().trim();
		assert.equal(item, "Chairman Meow");
   
  });
});