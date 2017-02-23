import { test } from 'qunit';
import moduleForAcceptance from 'ahasweb/tests/helpers/module-for-acceptance';
import { authenticateSession} from '../helpers/ember-simple-auth';

moduleForAcceptance('Acceptance | create contact');

test('visiting /create-contact', function(assert) {
  authenticateSession(this.application);
  visit('/create-contact');

  andThen(function() {
    assert.equal(currentURL(), '/create-contact');
  });
});

test('creating new contact successful', function(assert) {
  authenticateSession(this.application);
  visit('/create-contact');
  
  fillIn('#name', "kristy");
  fillIn('#phoneNumber', "123-123-1234");
  fillIn('#faxNumber', "123-123-1233");
  fillIn('#email', "k@gmail.ca");
  fillIn('#address', "k@gmail.ca");
  click('#create-contact-button');

  andThen(function(){
    assert.equal(find('#statusGood').text(), 'Contact created!');
  });
});