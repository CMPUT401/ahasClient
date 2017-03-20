import { test } from 'qunit';
import moduleForAcceptance from 'ahasweb/tests/helpers/module-for-acceptance';
import { authenticateSession} from '../helpers/ember-simple-auth';

 moduleForAcceptance('Acceptance | create patient');

test('visiting /new-patient/1', function(assert) {
  authenticateSession(this.application);
  visit('/new-patient/1');


   andThen(function() {
     assert.equal(currentURL(), '/new-patient/1');
   });
 });

