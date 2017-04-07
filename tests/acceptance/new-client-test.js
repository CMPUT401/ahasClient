import { test } from 'qunit';
import moduleForAcceptance from 'ahasweb/tests/helpers/module-for-acceptance';
import { authenticateSession } from '../helpers/ember-simple-auth';


 moduleForAcceptance('Acceptance | new client',{
  beforeEach: function() {
    authenticateSession(this.application);
    window.localStorage.setItem('role', 'Admin');
  }
});
 
 test('visiting /new-client', function(assert) {
   visit('/new-client');

   andThen(function() {
     assert.equal(currentURL(), '/new-client');
   });
 });
