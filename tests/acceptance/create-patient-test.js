import { test } from 'qunit';
import moduleForAcceptance from 'ahasweb/tests/helpers/module-for-acceptance';
import { authenticateSession} from '../helpers/ember-simple-auth';

 moduleForAcceptance('Acceptance | create patient');

test('visiting /new-patient/', function(assert) {
  authenticateSession(this.application);
  visit('/new-patient/');


   andThen(function() {
     assert.equal(currentURL(), '/new-patient/');
   });
 });

