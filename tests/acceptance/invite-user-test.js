import { test } from 'qunit';
import moduleForAcceptance from 'ahasweb/tests/helpers/module-for-acceptance';
import { authenticateSession } from '../helpers/ember-simple-auth';

moduleForAcceptance('Acceptance | invite user', { 
  beforeEach: function() {
    authenticateSession(this.application);
    window.localStorage.setItem('role', 'Admin');
  }
});

test('visiting /invite-user', function(assert) {
  visit('/admin/invite-user');

  andThen(function() {
    assert.equal(currentURL(), '/admin/invite-user');
  });
});


test('entering information reenables the invitebutton in /invite-user', function(assert) {
  visit('/admin/invite-user');
  fillIn('#name', "Justin Barclay");
  fillIn('#email', "jbarclay@gmail.com");
  andThen(function() {
    let element = find('#inviteButton');
    assert.notOk(element.disable);
  });
});

test('entering wrong information shows an altert in /invite-user', function(assert) {
  visit('/admin/invite-user');
  fillIn('#name', "Justin Barclay");
  fillIn('#email', "jbarclay@gmail");
  click('#inviteButton');
  andThen(function() {
    assert.equal(find('#statusBad').text(), "Please enter a valid email");
    let element = find('#inviteButton');
    assert.notOk(element.disable);
  });
});

test('/invite-user should get an email response', function(assert) {
  visit('/admin/invite-user');
  fillIn('#name', "Justin Barclay");
  fillIn('#email', "jbarclay@gmail.com");
  click('#inviteButton');
  andThen(function() {
       assert.equal(currentURL(), '/admin');
  });
});
