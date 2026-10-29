import test from 'node:test';
import assert from 'node:assert/strict';
import initSqlJs from 'sql.js';
import {cases} from '../src/data/cases.js';
import {executeSql,matchesExpected,validateReadOnly} from '../src/lib/sql-engine.js';
import {isCaseLocked,tutorialComplete} from '../src/lib/progression.js';
import {sqlReference} from '../src/locales/translations.js';

const queries={
  'missing-key':"SELECT name, role FROM access_log WHERE room = 'A-12' AND time > '20:00';",
  'coded-message':'SELECT location FROM messages WHERE priority = 3 ORDER BY sent_at DESC LIMIT 1;',
  'museum-alibi':"SELECT visitors.name, COUNT(*) AS sightings FROM visitors JOIN sightings ON visitors.id = sightings.visitor_id WHERE sightings.wing = 'East Wing' GROUP BY visitors.name ORDER BY sightings DESC LIMIT 1;",
  'alias-in-ledger':"SELECT guest FROM bookings WHERE guest LIKE 'Vale%' GROUP BY guest HAVING COUNT(*) > 1;",
  'silent-window':"SELECT badge_id, time FROM badge_events WHERE time BETWEEN '02:10' AND '02:25' AND badge_id IN (14, 27);",
  'unclaimed-locker':'SELECT lockers.number FROM lockers LEFT JOIN contracts ON lockers.id = contracts.locker_id WHERE lockers.active = 1 AND contracts.id IS NULL;',
  'warehouse-pattern':'SELECT courier_id, COUNT(*) AS visits FROM collections GROUP BY courier_id HAVING COUNT(*) >= 3;',
  'above-average-transfer':'SELECT account, amount FROM transfers WHERE amount > (SELECT AVG(amount) FROM transfers);',
  'three-way-trail':"SELECT people.name, phones.phone FROM vehicles JOIN people ON vehicles.owner_id = people.id JOIN phones ON people.id = phones.person_id WHERE vehicles.plate = 'VX-204';",
  'coded-risk':"SELECT account, SUM(CASE WHEN country <> 'ES' THEN amount * 2 ELSE amount END) AS risk FROM withdrawals GROUP BY account ORDER BY risk DESC LIMIT 1;",
  'night-route':"WITH connections AS (SELECT train_arrivals.passenger_id, taxi_rides.connection_minutes FROM train_arrivals JOIN taxi_rides ON train_arrivals.passenger_id = taxi_rides.passenger_id WHERE train_arrivals.train = 'N7') SELECT passengers.name FROM connections JOIN passengers ON connections.passenger_id = passengers.id WHERE connection_minutes <= 20;",
  'inside-contact':'SELECT caller.name AS caller, receiver.name AS receiver FROM calls JOIN people AS caller ON calls.caller_id = caller.id JOIN people AS receiver ON calls.receiver_id = receiver.id WHERE calls.id = 70;',
  'harbor-conspiracy':"SELECT drivers.name AS driver, people.name AS coordinator FROM vans JOIN drivers ON vans.driver_id = drivers.id JOIN gate_logs ON vans.id = gate_logs.van_id JOIN calls ON drivers.id = calls.driver_id JOIN people ON calls.person_id = people.id WHERE vans.color = 'blue' AND gate_logs.pier = 3 AND gate_logs.left_at BETWEEN '22:00' AND '22:20' AND calls.duration < 60;",
  'glass-gallery':"WITH visits AS (SELECT person_id, COUNT(*) AS total FROM camera_events WHERE zone = 'Restricted Gallery' GROUP BY person_id HAVING COUNT(*) >= 2) SELECT people.name FROM visits JOIN people ON visits.person_id = people.id LEFT JOIN tickets ON people.id = tickets.person_id JOIN coat_checks ON people.id = coat_checks.person_id WHERE tickets.person_id IS NULL AND coat_checks.item = 'brass key';",
  'last-signal':"WITH ranked AS (SELECT operator_id, day, ROW_NUMBER() OVER (PARTITION BY day ORDER BY sent_at DESC) AS rank FROM transmissions), leaders AS (SELECT operator_id FROM ranked WHERE rank = 1 GROUP BY operator_id HAVING COUNT(*) = 2) SELECT operators.name FROM leaders JOIN operators ON leaders.operator_id = operators.id JOIN badge_entries ON operators.id = badge_entries.operator_id WHERE badge_entries.room = 'Relay Room';"
};

const run=(query,tables)=>executeSql(query,tables,options=>initSqlJs({...options,locateFile:file=>`node_modules/sql.js/dist/${file}`}));

test('all fifteen cases have a valid solving query',async()=>{
  assert.equal(cases.length,15);
  for(const item of cases){
    const rows=await run(queries[item.id],item.tables);
    assert.equal(matchesExpected(rows,item.expected),true,`solution failed for ${item.id}`);
  }
});

test('every case has a difficulty from zero to five stars',()=>{
  for(const item of cases)assert.equal(Number.isInteger(item.rating)&&item.rating>=0&&item.rating<=5,true);
});

test('every case has complete lore in English and Spanish',()=>{
  for(const item of cases){
    assert.equal(item.lore.en.length>=2,true,`missing English lore for ${item.id}`);
    assert.equal(item.lore.es.length>=2,true,`missing Spanish lore for ${item.id}`);
    assert.equal(item.lore.en.every(paragraph=>paragraph.length>80),true,`short English lore for ${item.id}`);
    assert.equal(item.lore.es.every(paragraph=>paragraph.length>80),true,`short Spanish lore for ${item.id}`);
  }
});

test('four and five star cases expose no hints or example query',()=>{
  for(const item of cases.filter(item=>item.rating>=4)){
    assert.deepEqual(item.hints,{en:[],es:[]});
    assert.equal(item.example,null);
  }
});

test('SQL reference entries are available in English and Spanish',()=>{
  const items=sqlReference.flatMap(section=>section.items);
  assert.equal(items.length>=20,true);
  for(const section of sqlReference){
    assert.ok(section.group.en);
    assert.ok(section.group.es);
  }
  for(const item of items){
    assert.ok(item.name);
    assert.ok(item.syntax);
    assert.ok(item.description.en);
    assert.ok(item.description.es);
  }
});

test('write and multi-statement queries are blocked',()=>{
  assert.throws(()=>validateReadOnly('DELETE FROM access_log'),/READ_ONLY/);
  assert.throws(()=>validateReadOnly('SELECT * FROM access_log; SELECT 1'),/ONE_STATEMENT/);
});

test('tutorial unlocks sequentially and then opens every investigation',()=>{
  assert.equal(isCaseLocked(1,[],cases),true);
  assert.equal(isCaseLocked(1,[cases[0].id],cases),false);
  assert.equal(isCaseLocked(3,[cases[0].id,cases[1].id],cases),true);
  const tutorial=cases.slice(0,3).map(item=>item.id);
  assert.equal(tutorialComplete(tutorial,cases),true);
  for(let index=3;index<cases.length;index++)assert.equal(isCaseLocked(index,tutorial,cases),false);
});
