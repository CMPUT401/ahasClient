import { test } from 'qunit';
import moduleForAcceptance from 'ahasweb/tests/helpers/module-for-acceptance';
//import { authenticateSession } from '../helpers/ember-simple-auth';


moduleForAcceptance('Acceptance | reset password');

test('visiting /reset-password', function(assert) {
  visit('reset-password/:resetToken');

  andThen(function() {
    assert.equal(currentURL(), 'reset-password/:resetToken');
  });
});

/*test('entering a blank password in /reset-password', function(assert){
  visit('reset-password/:resetToken');
  click('#reset-password-button');
  andThen(function() {
    assert.equal(find('#statusBad').text(), 'Password too short, must be at least 7 characters!');
    assert.equal(currentURL(), 'reset-password/:resetToken');
  });
});*/

test('entering a good password in /reset-password', function(assert){
  visit('reset-password/:resetToken');
  fillIn('#password', "password");
  fillIn('#passwordConfirm', "password");
  click('#reset-password-button');
  andThen(function() {
    assert.equal(currentURL(), '/login');
  });
});
/*
test('entering a short password in /reset-password', function(assert){
  visit('reset-password/:resetToken');
  fillIn('#password', "password");
  fillIn('#passwordConfirm', "passwords");
  click('#reset-password-button');
  andThen(function() {
    assert.equal(find('#statusBad').text(), 'Password and password confirmation do not match');
  });
});*/
