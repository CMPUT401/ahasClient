import { test } from 'qunit';
import moduleForAcceptance from 'ahasweb/tests/helpers/module-for-acceptance';
import { authenticateSession} from '../helpers/ember-simple-auth';

moduleForAcceptance('Acceptance | edit contact');

test('visiting /edit-contact/1', function(assert) {
  authenticateSession(this.application);
  visit('/edit-contact/1');

  andThen(function() {
    assert.equal(currentURL(), '/edit-contact/1');
  });
});

test('checking info added correctly', function(assert) {
  authenticateSession(this.application);
  visit('/edit-contact/1');

  andThen(function() {
    //this is all we can check on this page since we cannot grab input element values for some reason
    assert.equal(find('.heading').text().trim(), 'Editing: Justin Barclay');
  });
});

test('checking we can click done button', function(assert) {
  authenticateSession(this.application);
  visit('/edit-contact/1');

  fillIn('#phoneNumber', '780-555-5555');
  click('#done-edit-button');

  andThen(function() {
    assert.equal(currentURL(), '/view-contact/1');
  });
});
