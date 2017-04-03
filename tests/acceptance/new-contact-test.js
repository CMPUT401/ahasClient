import { test } from 'qunit';
import moduleForAcceptance from 'ahasweb/tests/helpers/module-for-acceptance';
import { authenticateSession} from '../helpers/ember-simple-auth';

moduleForAcceptance('Acceptance | new contact');

test('visiting /new-contact', function(assert) {
  authenticateSession(this.application);
  visit('/new-contact');

  andThen(function() {
    assert.equal(currentURL(), '/new-contact');
  });
});

test('creating new contact successful', function(assert) {
  authenticateSession(this.application);
  visit('/new-contact');
  
  fillIn('#first_name', "Kristy");
  fillIn('#last_name', "Newbury");
  fillIn('#phoneNumber', "123-123-1234");
  fillIn('#faxNumber', "123-123-1233");
  fillIn('#email', "k@gmail.ca");
  fillIn('#address', "12 st 53 ave");
  click('#create-contact-button');

  andThen(function(){
    assert.equal(currentURL(), '/search-contact');
    
  });
});

test('creating new contact no first name', function(assert) {
  authenticateSession(this.application);
  visit('/new-contact');
  
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