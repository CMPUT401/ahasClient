import { test } from 'qunit';
import moduleForAcceptance from 'ahasweb/tests/helpers/module-for-acceptance';
import { authenticateSession } from '../helpers/ember-simple-auth';


 moduleForAcceptance('Acceptance | new client');
 
 test('visiting /new-client', function(assert) {
	 authenticateSession(this.application);
   visit('/new-client');

   andThen(function() {
     assert.equal(currentURL(), '/new-client');
   });
 });
