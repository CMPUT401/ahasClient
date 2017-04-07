import { test } from 'qunit';
import moduleForAcceptance from 'ahasweb/tests/helpers/module-for-acceptance';
import { authenticateSession } from '../helpers/ember-simple-auth';

moduleForAcceptance('Acceptance | user',{
  beforeEach: function() {
    authenticateSession(this.application);
    window.localStorage.setItem('role', 'Admin');
  }
});

test('visiting /user', function(assert) {
  visit('admin/user/:id');

  andThen(function() {
    assert.equal(currentURL(), 'admin/user/:id');
  });
});



test('reset /user password', function(assert) {
  visit('admin/user/:id');
  click('#reset');
  andThen(function() {
    assert.equal(currentURL(), 'admin/user/:id');
    assert.equal(find('#statusGood').text(), "Password Reset!");
  });
});

test('delete /user', function(assert) {
  visit('admin/user/:id');
  click('#delete');
  andThen(function() {
    assert.equal(currentURL(), 'admin');
  });
});