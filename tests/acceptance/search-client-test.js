import { test } from 'qunit';
import moduleForAcceptance from 'ahasweb/tests/helpers/module-for-acceptance';
import { authenticateSession, invalidateSession } from '../helpers/ember-simple-auth';

moduleForAcceptance('Acceptance | search client');

test('visiting /search-client before login', function(assert) {
	invalidateSession(this.application);
	visit('/search-client');

	andThen(function(){
		assert.notEqual(currentURL(), '/search-client');
	});
});

test('visiting /search-client', function(assert) {
	authenticateSession(this.application);
	visit('/search-client');

	andThen(function() {
		assert.equal(currentURL(), '/search-client');
	});
});

test('client list contains an item', function(assert){
	authenticateSession(this.application);
	visit('/search-client');

	andThen(function(){
		// let item = document.getElements("div.div.p").textContent;
		let item = find(".nameListItem").first().text().trim();
		assert.equal(item, "Johny Bravo");
	});
	
});

test('should transition to /search-client/1', function(assert){
	authenticateSession(this.application);
	visit('/search-client');
	
	click(".nameListItem");
	andThen(function(){
		assert.equal(currentURL(), '/view-client/1');
	});
});

test('should transition to /search-client on button click', function(assert){
	authenticateSession(this.application);
	visit('/search-client');
	
	click('#newClientLinkButton');
	andThen(function(){
		assert.equal(currentURL(), '/new-client');
	});
});