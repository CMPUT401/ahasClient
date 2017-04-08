import { test } from 'qunit';
import moduleForAcceptance from 'ahasweb/tests/helpers/module-for-acceptance';
import { invalidateSession } from '../helpers/ember-simple-auth';

moduleForAcceptance('Acceptance | new user', { 
  beforeEach: function() {
    window.localStorage.setItem('role', 'Admin');
  }
});

test('visiting /new-user', function(assert) {
   invalidateSession(this.application);
  visit('/new-user/:inviteToken');

  andThen(function() {
    assert.equal(currentURL(), '/new-user/:inviteToken');
  });
  
});

test('adding new user valid', function(assert){
   invalidateSession(this.application);
  visit('/new-user/:inviteToken');

  fillIn('#userName', "Kristy");
  fillIn('#userEmail', "user@gmail.ca");
  fillIn('#password', "password");
  fillIn('#passwordConfirm', "password");
  click('#create-user-button');
  andThen(function(){
    assert.equal(currentURL(), '/login');
  });
});

  test('adding invalid user, too short password', function(assert){
     invalidateSession(this.application);
  visit('/new-user/:inviteToken');

  var pass = 'pass';

  fillIn('#userName', "Kristy");
  fillIn('#userEmail', "auser@gmail.com");
  fillIn('#password', pass);
  fillIn('#passwordConfirm', pass);
  click('#create-user-button');
  andThen(function(){
    assert.equal(find('#statusBad').text(), "Password too short, must be at least 7 characters!");
    assert.notEqual(find('#statusGood').text(), "Password too short, must be at least 7 characters!");
    assert.notEqual(currentURL(), '/login');
  });
  });
