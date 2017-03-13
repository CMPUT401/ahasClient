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
  
  fillIn('#first_name', "Kristy");
  fillIn('#last_name', "Newbury");
  fillIn('#phoneNumber', "123-123-1234");
  fillIn('#faxNumber', "123-123-1233");
  fillIn('#email', "k@gmail.ca");
  fillIn('#address', "12 st 53 ave");
  click('#create-contact-button');

  andThen(function(){
    assert.equal(currentURL(), '/search-contacts');
    
  });
});

test('creating new contact no first name', function(assert) {
  authenticateSession(this.application);
  visit('/create-contact');
  
  fillIn('#last_name', "Newbury");
  fillIn('#phoneNumber', "123-123-1234");
  fillIn('#faxNumber', "123-123-1233");
  fillIn('#email', "k@gmail.ca");
  fillIn('#address', "12 st 53 ave");
  click('#create-contact-button');

  andThen(function(){
    assert.equal(find('#statusBad').text(), 'First name cannot be blank');
  });
});