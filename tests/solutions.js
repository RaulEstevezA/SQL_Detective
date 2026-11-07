/**
 * Canonical query of every lead of the campaign, by case and in order. The tests run
 * them against the real tables to prove that each lead can be solved, in both languages.
 * `scripts/export-solutions.mjs` turns this file into a readable local answer sheet.
 *
 * A value may be a `{en, es}` pair when the query depends on localized text.
 */

const repeatVisitors = "SELECT person_id FROM camera_events WHERE zone = 'Restricted Gallery' GROUP BY person_id HAVING COUNT(*) >= 2";
const opsRanking = "SELECT operator_id, day, ROW_NUMBER() OVER (PARTITION BY day ORDER BY sent_at DESC) AS position FROM transmissions WHERE channel = 'OPS'";
const gaps = 'WITH steps AS (SELECT LAG(id) OVER (ORDER BY id) AS previous_id, id AS next_id FROM case_files)';
const lastActions = 'WITH latest AS (SELECT record_id, operator, action, ROW_NUMBER() OVER (PARTITION BY record_id ORDER BY logged_at DESC) AS position FROM audit_log)';
const tapeUnion = "WITH sources AS (SELECT DISTINCT 'manifests' AS source, person FROM tape_manifests UNION SELECT DISTINCT 'bank', person FROM tape_bank_records UNION SELECT DISTINCT 'phones', person FROM tape_phone_taps UNION SELECT DISTINCT 'land', person FROM tape_land_registry)";
const sessionsWithPeople = "FROM terminal_sessions s JOIN building_log b ON b.zone = 'Basement Two' AND b.entered_at <= s.login_at AND b.left_at >= s.logout_at";

export const solutions = {
  'missing-key': [
    'SELECT name, room FROM access_log;',
    "SELECT name, entry_time FROM access_log WHERE room = 'A-12';",
    "SELECT name, role FROM access_log WHERE room = 'A-12' AND entry_time > '20:00';",
  ],
  'coded-message': [
    'SELECT sent_at, location FROM radio_intercepts WHERE priority = 3 ORDER BY sent_at DESC;',
    'SELECT location FROM radio_intercepts WHERE priority = 3 ORDER BY sent_at DESC LIMIT 1;',
  ],
  'alias-in-ledger': [
    "SELECT DISTINCT guest FROM bookings WHERE guest LIKE 'Vale%';",
    "SELECT guest, COUNT(*) AS stays FROM bookings WHERE guest LIKE 'Vale%' GROUP BY guest;",
    "SELECT check_in FROM bookings WHERE guest = 'Vale Stone' ORDER BY check_in;",
  ],
  'silent-window': [
    "SELECT badge_id, door, event_time FROM badge_events WHERE event_time BETWEEN '02:10' AND '02:25';",
    "SELECT badge_id, event_time FROM badge_events WHERE event_time BETWEEN '02:10' AND '02:25' AND badge_id IN (14, 27);",
    'SELECT holder, company FROM badge_registry WHERE badge_id = 27;',
  ],
  'museum-alibi': [
    "SELECT visitors.name, sightings.seen_at FROM sightings JOIN visitors ON sightings.visitor_id = visitors.id WHERE sightings.wing = 'East Wing' ORDER BY sightings.seen_at;",
    "SELECT visitors.name, COUNT(*) AS sightings FROM sightings JOIN visitors ON sightings.visitor_id = visitors.id WHERE sightings.wing = 'East Wing' GROUP BY visitors.name ORDER BY sightings DESC LIMIT 1;",
    'SELECT note FROM sightings WHERE visitor_id = 0;',
  ],
  'unclaimed-locker': [
    'SELECT lockers.number FROM lockers LEFT JOIN contracts ON lockers.id = contracts.locker_id WHERE lockers.active = 1 AND contracts.id IS NULL;',
    "SELECT lockers.number, inspections.note FROM lockers JOIN inspections ON lockers.id = inspections.locker_id WHERE lockers.number IN ('L-11', 'L-19');",
  ],
  'warehouse-pattern': [
    "SELECT courier_id, COUNT(*) AS visits FROM collections WHERE warehouse = 'Warehouse 9' GROUP BY courier_id HAVING COUNT(*) >= 5;",
    "SELECT courier_id, COUNT(*) AS visits, SUM(weight_kg) AS total_kg FROM collections WHERE warehouse = 'Warehouse 9' AND collected_at >= '22:00' GROUP BY courier_id HAVING COUNT(*) >= 3;",
    'SELECT name, company FROM couriers WHERE id = 6;',
  ],
  'three-way-trail': [
    "SELECT people.name FROM vehicles JOIN people ON vehicles.owner_id = people.id WHERE vehicles.plate = 'VX-204';",
    "SELECT people.name, phones.phone FROM vehicles JOIN people ON vehicles.owner_id = people.id JOIN phones ON people.id = phones.person_id WHERE vehicles.plate = 'VX-204';",
    "SELECT vehicles.plate, people.name FROM vehicles JOIN people ON vehicles.owner_id = people.id JOIN employers ON people.id = employers.person_id WHERE employers.company = 'Naviera Vent';",
  ],
  'above-average-transfer': [
    'SELECT AVG(amount) AS average FROM transfers;',
    'SELECT account, amount FROM transfers WHERE amount > 3 * (SELECT AVG(amount) FROM transfers);',
    'SELECT accounts.holder, COUNT(*) AS times FROM transfers JOIN accounts ON transfers.account = accounts.code WHERE transfers.amount > 3 * (SELECT AVG(amount) FROM transfers) GROUP BY accounts.holder HAVING COUNT(*) > 1;',
  ],
  'harbor-conspiracy': [
    'SELECT detail FROM incident_reports WHERE pier = 3;',
    "SELECT vans.plate FROM vans JOIN gate_logs ON vans.id = gate_logs.van_id WHERE vans.color = 'blue' AND gate_logs.pier = 3;",
    "SELECT drivers.name AS driver FROM vans JOIN drivers ON vans.driver_id = drivers.id WHERE vans.plate = 'NX-77';",
    "SELECT people.name AS coordinator FROM calls JOIN drivers ON calls.driver_id = drivers.id JOIN people ON calls.person_id = people.id WHERE drivers.name = 'Mina Costa' AND calls.duration < 60 AND calls.called_at > '22:11';",
  ],
  'coded-risk': [
    "SELECT CASE WHEN country = 'ES' THEN 'domestic' ELSE 'foreign' END AS scope, COUNT(*) AS total FROM withdrawals GROUP BY scope;",
    "SELECT account, SUM(CASE WHEN country <> 'ES' THEN amount * 2 ELSE amount END) AS risk FROM withdrawals GROUP BY account ORDER BY risk DESC LIMIT 1;",
    "SELECT holder FROM account_holders WHERE account = 'K-1';",
  ],
  'inside-contact': [
    'SELECT c.name AS caller, r.name AS receiver FROM calls JOIN staff AS c ON calls.caller_id = c.id JOIN staff AS r ON calls.receiver_id = r.id WHERE calls.id = 70;',
    "SELECT e.name AS employee, m.name AS manager FROM staff AS e JOIN staff AS m ON e.manager_id = m.id WHERE e.department = 'Security';",
    "SELECT c.name AS caller, r.name AS receiver, calls.called_at FROM calls JOIN staff AS c ON calls.caller_id = c.id JOIN staff AS r ON calls.receiver_id = r.id WHERE calls.called_on = '1987-11-12' AND c.department <> r.department;",
  ],
  'night-route': [
    "WITH route AS (SELECT t.passenger_id, (strftime('%s', r.picked_up_at) - strftime('%s', t.arrived_at)) / 60 AS minutes FROM train_arrivals t JOIN taxi_rides r ON t.passenger_id = r.passenger_id WHERE t.train = 'N7') SELECT p.name, route.minutes FROM route JOIN passengers p ON route.passenger_id = p.id;",
    "WITH route AS (SELECT t.passenger_id, r.destination, (strftime('%s', r.picked_up_at) - strftime('%s', t.arrived_at)) / 60 AS minutes FROM train_arrivals t JOIN taxi_rides r ON t.passenger_id = r.passenger_id WHERE t.train = 'N7') SELECT p.name, route.minutes FROM route JOIN passengers p ON route.passenger_id = p.id WHERE route.minutes <= 20 AND route.destination = 'Glass Gallery';",
  ],
  'double-books': [
    'SELECT code FROM insured_items EXCEPT SELECT code FROM catalogue;',
    'SELECT SUM(insured_value) AS total FROM insured_items WHERE code IN (SELECT code FROM insured_items EXCEPT SELECT code FROM catalogue);',
    "SELECT code, 'ghost' AS status FROM insured_items WHERE code NOT IN (SELECT code FROM catalogue) UNION SELECT code, 'uninsured' FROM catalogue WHERE code NOT IN (SELECT code FROM insured_items);",
  ],
  'glass-gallery': [
    "SELECT people.name, COUNT(*) AS visits FROM camera_events JOIN people ON camera_events.person_id = people.id WHERE camera_events.zone = 'Restricted Gallery' GROUP BY people.name HAVING COUNT(*) >= 2;",
    `WITH repeat_visitors AS (${repeatVisitors}) SELECT people.name FROM repeat_visitors JOIN people ON repeat_visitors.person_id = people.id LEFT JOIN tickets ON people.id = tickets.person_id WHERE tickets.person_id IS NULL;`,
    `WITH repeat_visitors AS (${repeatVisitors}) SELECT people.name, coat_checks.item FROM repeat_visitors JOIN people ON repeat_visitors.person_id = people.id LEFT JOIN tickets ON people.id = tickets.person_id JOIN coat_checks ON people.id = coat_checks.person_id WHERE tickets.person_id IS NULL;`,
    "SELECT people.name FROM camera_events JOIN people ON camera_events.person_id = people.id LEFT JOIN tickets ON people.id = tickets.person_id WHERE camera_events.zone = 'Restricted Gallery' AND camera_events.seen_at < '20:04' AND tickets.person_id IS NULL GROUP BY people.name HAVING COUNT(*) >= 2;",
  ],
  'dirty-ledger': [
    "SELECT COUNT(DISTINCT payee) AS spellings FROM payments WHERE payee LIKE '%naviera%';",
    "SELECT UPPER(TRIM(REPLACE(REPLACE(payee, '.', ''), '  ', ' '))) AS clean, COUNT(*) AS payments FROM payments WHERE payee LIKE '%naviera%' GROUP BY clean;",
    "SELECT SUM(COALESCE(amount, estimate)) AS total FROM payments WHERE payee LIKE '%naviera%';",
  ],
  'burned-index': [
    "SELECT name FROM sqlite_master WHERE type = 'table' ORDER BY name;",
    "SELECT name FROM sqlite_master WHERE sql LIKE '%deleted_by%';",
    'SELECT deleted_by, COUNT(*) AS records FROM z_custody GROUP BY deleted_by ORDER BY records DESC LIMIT 1;',
  ],
  'missing-numbers': [
    `${gaps} SELECT previous_id, next_id FROM steps WHERE next_id - previous_id > 1;`,
    `${gaps} SELECT SUM(next_id - previous_id - 1) AS missing FROM steps;`,
    'SELECT record_id, title FROM tape_index WHERE record_id NOT IN (SELECT id FROM case_files) ORDER BY record_id;',
  ],
  'audit-trail': [
    `${lastActions} SELECT record_id, operator FROM latest WHERE position = 1 AND action = 'DELETE';`,
    `${lastActions} SELECT operator, COUNT(*) AS deletions FROM latest WHERE position = 1 AND action = 'DELETE' GROUP BY operator;`,
    "SELECT holder, status, left_on FROM operator_registry WHERE operator = 'OP-31';",
  ],
  'inside-man': [
    "SELECT login_at, logout_at FROM terminal_sessions WHERE operator = 'OP-31' ORDER BY login_at;",
    `SELECT b.name ${sessionsWithPeople} WHERE s.operator = 'OP-31' AND s.login_at LIKE '1987-11-17%';`,
    `SELECT b.name, COUNT(DISTINCT s.id) AS nights ${sessionsWithPeople} WHERE s.operator = 'OP-31' GROUP BY b.name HAVING COUNT(DISTINCT s.id) = (SELECT COUNT(*) FROM terminal_sessions WHERE operator = 'OP-31');`,
    "SELECT assigned_to FROM terminal_assignments WHERE terminal = 'B2-3';",
  ],
  'shell-companies': [
    "SELECT parent FROM ownership WHERE company = 'Faro Servicios';",
    "WITH RECURSIVE chain(company, parent, depth) AS (SELECT company, parent, 0 FROM ownership WHERE company = 'Faro Servicios' UNION ALL SELECT o.company, o.parent, c.depth + 1 FROM ownership o JOIN chain c ON o.company = c.parent) SELECT company, depth FROM chain ORDER BY depth;",
    "SELECT name, role FROM foundation_board WHERE foundation = 'Fundación Nereida' AND role = 'Chair';",
  ],
  'follow-money': [
    'SELECT given_on, SUM(amount) OVER (ORDER BY given_on) AS running FROM donations ORDER BY given_on;',
    'WITH totals AS (SELECT given_on, donor, SUM(amount) OVER (ORDER BY given_on) AS running FROM donations) SELECT given_on, donor FROM totals WHERE running >= 1000000 ORDER BY given_on LIMIT 1;',
    'SELECT f.address, p.buyer, CAST(julianday(p.bought_on) - julianday(f.fire_on) AS INTEGER) AS days FROM fires f JOIN land_purchases p ON f.address = p.address WHERE julianday(p.bought_on) - julianday(f.fire_on) BETWEEN 0 AND 30;',
  ],
  'last-signal': [
    "SELECT detail FROM incident_reports WHERE system = 'Relay';",
    "SELECT day, terminal_id, activated_at FROM relay_events WHERE signature = 'SIG-9' ORDER BY day;",
    "SELECT DISTINCT terminals.code, terminals.room FROM relay_events JOIN terminals ON relay_events.terminal_id = terminals.id WHERE relay_events.signature = 'SIG-9';",
    `WITH ranked AS (${opsRanking}) SELECT ranked.day, operators.name FROM ranked JOIN operators ON ranked.operator_id = operators.id WHERE ranked.position = 1 ORDER BY ranked.day;`,
    "SELECT operators.name FROM badge_entries JOIN operators ON badge_entries.operator_id = operators.id WHERE badge_entries.room = 'Relay Room' GROUP BY operators.name HAVING COUNT(DISTINCT badge_entries.day) = 2;",
    `WITH ranked AS (${opsRanking}), senders AS (SELECT operator_id FROM ranked WHERE position = 1 GROUP BY operator_id HAVING COUNT(DISTINCT day) = 2), access AS (SELECT operator_id FROM badge_entries WHERE room = 'Relay Room' GROUP BY operator_id HAVING COUNT(DISTINCT day) = 2) SELECT operators.name FROM senders JOIN access USING (operator_id) JOIN operators ON senders.operator_id = operators.id;`,
    "SELECT technicians.name, maintenance_logs.action FROM maintenance_logs JOIN technicians ON maintenance_logs.technician_id = technicians.id JOIN terminals ON maintenance_logs.terminal_id = terminals.id WHERE terminals.code = 'T-9' AND maintenance_logs.day < '1987-12-02' ORDER BY maintenance_logs.day DESC LIMIT 1;",
    "SELECT operators.name AS operator, technicians.name AS technician, COUNT(*) AS calls FROM calls JOIN operators ON calls.operator_id = operators.id JOIN technicians ON calls.technician_id = technicians.id WHERE calls.duration < 60 GROUP BY operators.id, technicians.id HAVING COUNT(DISTINCT calls.day) = 2;",
    {
      en: "SELECT technicians.name, equipment_loans.item FROM equipment_loans JOIN technicians ON equipment_loans.technician_id = technicians.id WHERE equipment_loans.returned_at IS NULL AND equipment_loans.item LIKE '%signal bridge%';",
      es: "SELECT technicians.name, equipment_loans.item FROM equipment_loans JOIN technicians ON equipment_loans.technician_id = technicians.id WHERE equipment_loans.returned_at IS NULL AND equipment_loans.item LIKE '%puente de señal%';",
    },
  ],
  'cabinet-a12': [
    `${tapeUnion} SELECT person, COUNT(*) AS sources FROM sources GROUP BY person HAVING COUNT(*) >= 3;`,
    "SELECT met_on, place FROM meetings WHERE person IN ('Oriol Vent', 'Ricardo Salas', 'Alba Grau') GROUP BY met_on HAVING COUNT(DISTINCT person) = 3;",
    "SELECT COUNT(*) AS fires, SUM(casualties) AS casualties FROM fires WHERE fire_on > '1987-08-30';",
  ],
};
