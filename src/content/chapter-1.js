/**
 * Chapter 1, "Basement Two": the first week of the analyst in the police archive.
 * Teaches SELECT, WHERE, ORDER BY, LIMIT, LIKE, DISTINCT, BETWEEN, IN, JOIN and GROUP BY.
 * The format of a chapter and of a mission is documented in `content/campaign.js`.
 */

import { bi } from '../core/localize.js';
import { fillerRows, shuffleIntoLog } from './world/noise.js';

const accessLog = [
  { id: 1, name: 'Clara Sanz', role: 'Clerk', room: 'C-02', entry_time: '18:50' },
  { id: 2, name: 'Omar Sol', role: 'Guard', room: 'A-12', entry_time: '19:05' },
  { id: 3, name: 'Leo Martín', role: 'Analyst', room: 'A-12', entry_time: '19:12' },
  { id: 4, name: 'Clara Sanz', role: 'Clerk', room: 'B-04', entry_time: '19:20' },
  { id: 5, name: 'Iris Vega', role: 'Archivist', room: 'B-04', entry_time: '19:40' },
  { id: 6, name: 'Iris Vega', role: 'Archivist', room: 'A-12', entry_time: '19:48' },
  { id: 7, name: 'Teo Ferrán', role: 'Archivist', room: 'B-04', entry_time: '19:55' },
  { id: 8, name: 'Leo Martín', role: 'Analyst', room: 'B-04', entry_time: '20:02' },
  { id: 9, name: 'Nora Vidal', role: 'Technician', room: 'A-12', entry_time: '20:17' },
  { id: 10, name: 'Omar Sol', role: 'Guard', room: 'C-02', entry_time: '20:31' },
];

const radioIntercepts = [
  { id: 21, frequency: '147.30', location: 'North pier', priority: 2, sent_at: '20:41' },
  { id: 22, frequency: '147.30', location: 'Fish market', priority: 3, sent_at: '20:58' },
  { id: 23, frequency: '151.05', location: 'Customs house', priority: 1, sent_at: '21:02' },
  { id: 24, frequency: '147.30', location: 'North pier', priority: 2, sent_at: '21:05' },
  { id: 25, frequency: '151.05', location: 'Old station', priority: 3, sent_at: '21:16' },
  { id: 26, frequency: '147.30', location: 'Glasshouse', priority: 1, sent_at: '21:22' },
  { id: 27, frequency: '151.05', location: 'Lighthouse road', priority: 2, sent_at: '21:31' },
  { id: 28, frequency: '147.30', location: 'Warehouse 9', priority: 3, sent_at: '21:44' },
  { id: 29, frequency: '151.05', location: 'Rope walk', priority: 2, sent_at: '21:49' },
  { id: 30, frequency: '147.30', location: 'Customs house', priority: 1, sent_at: '21:53' },
];

const hotelGuests = [
  { guest: 'Vale Stone', room: 12, check_in: '1987-09-14', paid: 'cash' },
  { guest: 'Vale Stone', room: 12, check_in: '1987-10-03', paid: 'cash' },
  { guest: 'Vale Stone', room: 12, check_in: '1987-10-21', paid: 'cash' },
  { guest: 'Vale Stone', room: 12, check_in: '1987-11-02', paid: 'cash' },
  { guest: 'Valen Moss', room: 8, check_in: '1987-09-30', paid: 'card' },
  { guest: 'Valeria North', room: 4, check_in: '1987-10-11', paid: 'card' },
  { guest: 'Duvale Reyes', room: 15, check_in: '1987-10-19', paid: 'card' },
];

const hotelFiller = fillerRows(101, 34, (random) => ({
  guest: random.name(),
  room: random.int(1, 22),
  check_in: `1987-${random.pick(['09', '10', '11'])}-${String(random.int(1, 28)).padStart(2, '0')}`,
  paid: random.pick(['card', 'card', 'cash']),
}));

const badgeFiller = fillerRows(102, 24, (random, index) => ({
  badge_id: random.pick([3, 8, 19, 31, 40, 52]),
  door: random.pick(['Loading bay', 'Corridor C', 'Lab 2', 'Cold store']),
  event_time: index % 2 ? random.time('00:05', '01:55') : random.time('03:05', '05:40'),
}));

const badgeEvents = shuffleIntoLog(
  [
    ...badgeFiller,
    { badge_id: 8, door: 'Corridor C', event_time: '02:12' },
    { badge_id: 27, door: 'Evidence store', event_time: '02:16' },
    { badge_id: 31, door: 'Loading bay', event_time: '02:20' },
    { badge_id: 14, door: 'Lab 2', event_time: '02:31' },
    { badge_id: 14, door: 'Lab 2', event_time: '02:02' },
  ],
  'event_time',
);

const museumVisitors = [
  { id: 1, name: 'Ada Ríos', ticket: 'V-104' },
  { id: 2, name: 'Bruno Paz', ticket: 'V-108' },
  { id: 3, name: 'Celia Mar', ticket: 'V-117' },
  { id: 4, name: 'Dario Luz', ticket: 'V-121' },
  { id: 5, name: 'Elsa Nin', ticket: 'V-126' },
  { id: 6, name: 'Fabio Roig', ticket: 'V-130' },
];

const museumSightings = [
  { id: 1, visitor_id: 1, wing: 'East Wing', seen_at: '18:02', note: null },
  { id: 2, visitor_id: 2, wing: 'West Wing', seen_at: '18:04', note: null },
  { id: 3, visitor_id: 3, wing: 'East Wing', seen_at: '18:06', note: null },
  { id: 4, visitor_id: 4, wing: 'Atrium', seen_at: '18:07', note: null },
  { id: 5, visitor_id: 1, wing: 'East Wing', seen_at: '18:11', note: null },
  { id: 6, visitor_id: 3, wing: 'Atrium', seen_at: '18:13', note: null },
  { id: 7, visitor_id: 5, wing: 'East Wing', seen_at: '18:14', note: null },
  { id: 8, visitor_id: 1, wing: 'East Wing', seen_at: '18:18', note: null },
  { id: 9, visitor_id: 6, wing: 'West Wing', seen_at: '18:20', note: null },
  { id: 10, visitor_id: 3, wing: 'East Wing', seen_at: '18:24', note: null },
  { id: 11, visitor_id: 0, wing: 'Archive link', seen_at: '00:00', note: bi('If you can read this, they gave you my desk. They told you I was transferred. Find the active locker that nobody rents at the Central Station. Trust the rows, not the people. I.B.', 'Si puedes leer esto, te han dado mi mesa. Te habrán dicho que me trasladaron. Busca en la Estación Central la taquilla activa que nadie alquila. Fíate de las filas, no de las personas. I.B.') },
  { id: 12, visitor_id: 1, wing: 'East Wing', seen_at: '18:33', note: null },
  { id: 13, visitor_id: 2, wing: 'Atrium', seen_at: '18:35', note: null },
];

export const chapter1 = {
  id: 1,
  title: bi('Basement Two', 'Sótano Dos'),
  subtitle: bi('Nobody is sent to the archive because they are good. You are about to be the exception.', 'Al archivo nadie llega por sus méritos. Estás a punto de ser la excepción.'),
  prologue: {
    signal: bi('PUERTO CENIZA · NOVEMBER 1987 · 08:02', 'PUERTO CENIZA · NOVIEMBRE DE 1987 · 08:02'),
    title: bi('The desk of someone who left in a hurry', 'La mesa de alguien que se fue con prisa'),
    paragraphs: bi(
      [
        'It has rained on Puerto Ceniza for eleven days. The port smells of diesel and wet rope, and the police headquarters smells of the port. Your assignment letter sends you two floors below the street, to the Records Bureau: Basement Two, where cases go when nobody wants to look at them again.',
        'The bureau has just finished moving forty years of paper into ATLAS, a terminal the size of a wardrobe that answers only in SQL. Everyone upstairs is afraid of it, which is how a new analyst ends up with the only job in the building that matters.',
        'They give you the desk of Inés Bosch, “transferred last December”. Her mug is still there, with a ring of dried coffee. So is a note under the keyboard, in small careful handwriting: “The table never lies. It just does not show everything.”',
      ],
      [
        'Lleva once días lloviendo sobre Puerto Ceniza. El puerto huele a gasóleo y a cuerda mojada, y la Jefatura huele al puerto. Tu carta de destino te manda dos plantas por debajo de la calle, al Negociado de Registros: el Sótano Dos, adonde van los casos que nadie quiere volver a mirar.',
        'El negociado acaba de pasar cuarenta años de papel a ATLAS, un terminal del tamaño de un armario que solo contesta en SQL. Arriba le tienen miedo, y por eso quien acaba de llegar se queda con el único trabajo del edificio que importa.',
        'Te dan la mesa de Inés Bosch, «trasladada el pasado diciembre». Su taza sigue ahí, con un cerco de café seco. También una nota bajo el teclado, con letra pequeña y cuidadosa: «La tabla nunca miente. Solo que no lo enseña todo».',
      ],
    ),
    speaker: bi('TEO FERRÁN · ARCHIVIST', 'TEO FERRÁN · ARCHIVERO'),
    quote: bi('“Thirty-one years down here, kid. People lie, paper burns. Learn to ask this machine properly and you will know more than the Commissioner. Coffee is on the left. Do not touch the mug.”', '«Treinta y un años aquí abajo. La gente miente y el papel arde. Aprende a preguntarle bien a esta máquina y sabrás más que el Comisario. El café está a la izquierda. La taza no la toques.»'),
    action: bi('Sit at the desk', 'Sentarte a la mesa'),
  },
  missions: [
    {
      id: 'missing-key',
      rating: 1,
      concepts: ['SELECT', 'WHERE'],
      title: bi('The missing key', 'La llave perdida'),
      location: bi('Records Bureau · Monday · 20:45', 'Negociado de Registros · Lunes · 20:45'),
      scene: bi(
        [
          'Your first day is ending when Iris Vega comes up from the stacks without any colour in her face. The brass key of the evidence cabinet in room A-12 is gone from the control board. Nothing is forced. The corridor camera has been “under maintenance” since the summer.',
          'Teo does not look up from his crossword. “Comisaria Quiroga will be down here in ten minutes asking who did it, and she does not like the word ‘maybe’. The door reader writes to ATLAS. Go on. Ask it.”',
        ],
        [
          'Tu primer día está terminando cuando Iris Vega sube del depósito sin color en la cara. La llave de latón del armario de pruebas de la sala A-12 ya no está en el panel. Nada forzado. La cámara del pasillo lleva «en mantenimiento» desde el verano.',
          'Teo no levanta la vista del crucigrama. «La comisaria Quiroga bajará en diez minutos a preguntar quién ha sido, y no le gusta la palabra “quizá”. El lector de la puerta escribe en ATLAS. Venga. Pregúntale.»',
        ],
      ),
      tables: { access_log: accessLog },
      stages: [
        {
          title: bi('Read the whole log', 'Lee el registro entero'),
          briefing: bi('Teo: “Never start with a theory. Look at everything first.” Return the name and room of every entry in access_log.', 'Teo: «Nunca empieces con una teoría. Primero míralo todo». Devuelve name y room de cada entrada de access_log.'),
          expected: accessLog.map(({ name, room }) => ({ name, room })),
          hints: [bi('SELECT lists the columns you want, separated by commas. FROM names the table.', 'SELECT enumera las columnas que quieres, separadas por comas. FROM indica la tabla.'), bi('SELECT name, room FROM access_log;', 'SELECT name, room FROM access_log;')],
          clue: bi('Six people went through the building that evening.', 'Seis personas pasaron por el edificio aquella tarde.'),
          reaction: bi('Teo: Six names. Five of them have been here longer than the wiring. Now stop reading and start filtering.', 'Teo: Seis nombres. Cinco llevan aquí más que el cableado. Ahora deja de leer y empieza a filtrar.'),
        },
        {
          title: bi('Only room A-12', 'Solo la sala A-12'),
          briefing: bi('The cabinet is in A-12. Return name and entry_time of the entries to that room.', 'El armario está en A-12. Devuelve name y entry_time de las entradas a esa sala.'),
          expected: [
            { name: 'Omar Sol', entry_time: '19:05' },
            { name: 'Leo Martín', entry_time: '19:12' },
            { name: 'Iris Vega', entry_time: '19:48' },
            { name: 'Nora Vidal', entry_time: '20:17' },
          ],
          hints: [bi("WHERE keeps only the rows that meet a condition. Text goes in single quotes: WHERE room = 'A-12'.", "WHERE conserva solo las filas que cumplen una condición. El texto va entre comillas simples: WHERE room = 'A-12'.")],
          clue: bi('Four people entered A-12. Iris confirms the key was still there at 19:48.', 'Cuatro personas entraron en A-12. Iris confirma que la llave seguía allí a las 19:48.'),
          reaction: bi('Iris: I counted the board when I went in. The key was there. I swear it was there.', 'Iris: Conté el panel al entrar. La llave estaba. Te juro que estaba.'),
        },
        {
          title: bi('After the board was counted', 'Después del recuento'),
          briefing: bi('The board was last counted at 20:00. Return the name and role of whoever entered A-12 after that time.', 'El último recuento del panel fue a las 20:00. Devuelve name y role de quien entró en A-12 después de esa hora.'),
          expected: [{ name: 'Nora Vidal', role: 'Technician' }],
          hints: [bi("Join two conditions with AND. HH:MM times can be compared as text: entry_time > '20:00'.", "Une dos condiciones con AND. Las horas HH:MM se pueden comparar como texto: entry_time > '20:00'.")],
          clue: bi('Nora Vidal, technician, entered A-12 at 20:17.', 'Nora Vidal, técnica, entró en A-12 a las 20:17.'),
        },
      ],
      closing: bi(
        [
          'Quiroga comes down with a cigarette she is not allowed to smoke and has Nora Vidal in the chair by nine. Nora has a work order to check the wiring in A-12, and it is genuine: stamped, numbered, signed. She never touched the board. She looks more scared of the paper than of the police.',
          '“Who signed your order?” Quiroga asks. Nora slides it across the table. The signature is small and careful: I. Bosch. The date is last Thursday. Inés Bosch was transferred eleven months ago.',
          'You look at Teo. For the first time today he has stopped filling in his crossword. “Clerical error,” he says, and goes to make more coffee.',
        ],
        [
          'Quiroga baja con un cigarrillo que no puede fumarse y a las nueve ya tiene a Nora Vidal en la silla. Nora trae una orden de trabajo para revisar el cableado de A-12, y es auténtica: sellada, numerada, firmada. Nunca tocó el panel. Parece tener más miedo del papel que de la policía.',
          '«¿Quién firma tu orden?», pregunta Quiroga. Nora la desliza por la mesa. La firma es pequeña y cuidadosa: I. Bosch. La fecha, el jueves pasado. A Inés Bosch la trasladaron hace once meses.',
          'Miras a Teo. Por primera vez en todo el día ha dejado de rellenar el crucigrama. «Error administrativo», dice, y se va a hacer más café.',
        ],
      ),
    },
    {
      id: 'coded-message',
      rating: 1,
      concepts: ['ORDER BY', 'LIMIT'],
      title: bi('Priority three', 'Prioridad tres'),
      location: bi('Radio room · Tuesday · 22:10', 'Sala de radio · Martes · 22:10'),
      scene: bi(
        [
          'For seventy minutes somebody has been broadcasting short coded bursts from all over the harbour district. The Coast Guard cannot read the content, but the header of each burst survives decoding: frequency, time, location and a priority from one to three.',
          'Comisaria Marta Quiroga has been awake for two days. “Three means something is moving tonight. I have one car and one chance to send it to the right place. You are the new one? Good. You do not have any friends here yet. Tell me where the last priority three came from.”',
        ],
        [
          'Durante setenta minutos alguien ha estado emitiendo breves ráfagas cifradas por todo el distrito del puerto. Guardacostas no puede leer el contenido, pero la cabecera de cada ráfaga sobrevive: frecuencia, hora, ubicación y una prioridad de uno a tres.',
          'La comisaria Marta Quiroga lleva dos días despierta. «Tres significa que algo se mueve esta noche. Tengo un coche y una oportunidad de mandarlo al sitio correcto. ¿Acabas de llegar? Bien. Todavía no le debes nada a nadie aquí. Dime de dónde salió la última de prioridad tres.»',
        ],
      ),
      tables: { radio_intercepts: radioIntercepts },
      stages: [
        {
          title: bi('The urgent bursts, newest first', 'Las urgentes, primero las recientes'),
          briefing: bi('Return sent_at and location of the priority 3 bursts, from the most recent to the oldest.', 'Devuelve sent_at y location de las ráfagas de prioridad 3, de la más reciente a la más antigua.'),
          ordered: true,
          expected: [
            { sent_at: '21:44', location: 'Warehouse 9' },
            { sent_at: '21:16', location: 'Old station' },
            { sent_at: '20:58', location: 'Fish market' },
          ],
          hints: [bi('Filter with WHERE priority = 3. Numbers do not take quotes.', 'Filtra con WHERE priority = 3. Los números no llevan comillas.'), bi('ORDER BY sent_at DESC goes after WHERE and sorts from highest to lowest.', 'ORDER BY sent_at DESC va después de WHERE y ordena de mayor a menor.')],
          clue: bi('Three urgent bursts move across the district towards the piers.', 'Tres ráfagas urgentes avanzan por el distrito hacia los muelles.'),
          reaction: bi('Quiroga: Fish market, station, warehouses. They are walking something down to the water. I only need one line. Give me one line.', 'Quiroga: Lonja, estación, almacenes. Están bajando algo hasta el agua. Solo necesito una línea. Dame una línea.'),
        },
        {
          title: bi('One line for the car', 'Una línea para el coche'),
          briefing: bi('Return only the location of the most recent priority 3 burst: exactly one row.', 'Devuelve solo la location de la ráfaga de prioridad 3 más reciente: exactamente una fila.'),
          expected: [{ location: 'Warehouse 9' }],
          hints: [bi('LIMIT 1 keeps only the first row of a sorted result. It always goes last.', 'LIMIT 1 conserva solo la primera fila de un resultado ordenado. Siempre va al final.')],
          clue: bi('The final urgent burst came from Warehouse 9, on Pier 3.', 'La última ráfaga urgente salió del Almacén 9, en el muelle 3.'),
        },
      ],
      closing: bi(
        [
          'The car gets to Warehouse 9 eleven minutes too late. Inside: an oil stain, fresh tyre marks and a crate lid stencilled with a name half the city works for: VENT.',
          'Quiroga reads the report standing up. “Oriol Vent owns the piers, the tugs and a good part of the Harbour Commission. He also paid for the new wing of this building. Nobody writes that name in a report unless they are retiring.” She tears the page in half, puts one half in her coat and leaves the other on your desk.',
        ],
        [
          'El coche llega al Almacén 9 once minutos tarde. Dentro: una mancha de aceite, marcas de neumático recientes y la tapa de una caja con un nombre del que vive media ciudad: VENT.',
          'Quiroga lee el parte de pie. «Oriol Vent es dueño de los muelles, de los remolcadores y de buena parte de la Comisión del Puerto. También pagó el ala nueva de este edificio. Nadie escribe ese nombre en un informe salvo que se jubile.» Rompe la hoja por la mitad, se guarda un trozo en el abrigo y deja el otro en tu mesa.',
        ],
      ),
    },
    {
      id: 'alias-in-ledger',
      rating: 2,
      concepts: ['LIKE', 'DISTINCT', 'GROUP BY'],
      title: bi('A guest called Vale', 'Un huésped llamado Vale'),
      location: bi('Hotel Miramar · Wednesday · 11:30', 'Hotel Miramar · Miércoles · 11:30'),
      scene: bi(
        [
          'The Hotel Miramar faces the Central Station and has not been painted since the war. Its receptionist, who is proud of never having seen anything, has at least remembered something: a man who pays in cash, tips badly and always asks for a room on the same floor. Different surnames on some nights, she thinks, but all of them started with “Vale”.',
          'Teo has had the hotel ledger sent down to ATLAS. “Aliases are like bad habits. People change the ending and keep the beginning.” He taps the screen with a pencil. “Same rule for your queries. Do not search for the name. Search for the beginning.”',
        ],
        [
          'El Hotel Miramar da a la Estación Central y no lo pintan desde la guerra. Su recepcionista, orgullosa de no haber visto nunca nada, al menos recuerda algo: un hombre que paga en efectivo, deja propinas malas y siempre pide habitación en la misma planta. Algunas noches con otro apellido, cree, pero todos empezaban por «Vale».',
          'Teo ha hecho pasar el libro del hotel a ATLAS. «Los alias son como las malas costumbres. La gente cambia el final y conserva el principio.» Da un golpecito a la pantalla con el lápiz. «Lo mismo con tus consultas. No busques el nombre. Busca el principio.»',
        ],
      ),
      tables: { bookings: shuffleIntoLog([...hotelGuests, ...hotelFiller], 'check_in') },
      stages: [
        {
          title: bi('The names that begin the same way', 'Los nombres que empiezan igual'),
          briefing: bi('Return each different guest whose name begins with Vale, without repeating any.', 'Devuelve cada guest distinto cuyo nombre empiece por Vale, sin repetir ninguno.'),
          expected: [{ guest: 'Vale Stone' }, { guest: 'Valen Moss' }, { guest: 'Valeria North' }],
          hints: [bi("LIKE 'Vale%' matches anything that begins with Vale: % stands for any text.", "LIKE 'Vale%' coincide con todo lo que empieza por Vale: % representa cualquier texto."), bi('SELECT DISTINCT removes repeated rows from the result.', 'SELECT DISTINCT elimina las filas repetidas del resultado.')],
          clue: bi('Three identities in the ledger begin with Vale.', 'Tres identidades del libro empiezan por Vale.'),
          reaction: bi('Teo: Notice Duvale Reyes is not on your list. That is the difference between a search and an accusation.', 'Teo: Fíjate en que Duvale Reyes no está en tu lista. Esa es la diferencia entre una búsqueda y una acusación.'),
        },
        {
          title: bi('Who keeps coming back?', '¿Quién vuelve?'),
          briefing: bi('Count the bookings of each of those identities. Return guest and the count with the name stays.', 'Cuenta las reservas de cada una de esas identidades. Devuelve guest y el recuento con el nombre stays.'),
          expected: [{ guest: 'Vale Stone', stays: 4 }, { guest: 'Valen Moss', stays: 1 }, { guest: 'Valeria North', stays: 1 }],
          hints: [bi('GROUP BY guest makes one row per guest, and COUNT(*) counts the rows of each group.', 'GROUP BY guest crea una fila por huésped y COUNT(*) cuenta las filas de cada grupo.'), bi('Name a calculated column with AS: COUNT(*) AS stays.', 'Da nombre a una columna calculada con AS: COUNT(*) AS stays.')],
          clue: bi('Vale Stone stayed four times; the others, once each.', 'Vale Stone se alojó cuatro veces; los demás, una sola.'),
        },
        {
          title: bi('The dates of Vale Stone', 'Las fechas de Vale Stone'),
          briefing: bi('Return the check_in dates of Vale Stone in chronological order.', 'Devuelve las fechas check_in de Vale Stone en orden cronológico.'),
          ordered: true,
          expected: [{ check_in: '1987-09-14' }, { check_in: '1987-10-03' }, { check_in: '1987-10-21' }, { check_in: '1987-11-02' }],
          hints: [bi('Dates written as YYYY-MM-DD sort correctly as text with ORDER BY.', 'Las fechas escritas como AAAA-MM-DD se ordenan bien como texto con ORDER BY.')],
          clue: bi('Vale Stone: 14 Sep, 3 Oct, 21 Oct and 2 Nov. Room 12, always in cash.', 'Vale Stone: 14 sep, 3 oct, 21 oct y 2 nov. Habitación 12, siempre en efectivo.'),
        },
      ],
      closing: bi(
        [
          'You leave the four dates on a sticky note and go for coffee. When you come back, Teo has placed next to it a clipping from La Voz del Puerto: four warehouses burned down in the Old Quarter this autumn. Accidental fires, according to the Fire Department. All four the night after one of your dates.',
          '“An old building, wet electrics, what do you expect,” Teo says, not sounding as if he believes it. Then he takes the clipping back, folds it very small and puts it in his shirt pocket. “You did not get that from me.”',
        ],
        [
          'Dejas las cuatro fechas en un papel y vas a por café. Al volver, Teo ha colocado al lado un recorte de La Voz del Puerto: cuatro almacenes ardieron este otoño en el Barrio Viejo. Fuegos fortuitos, según Bomberos. Los cuatro, la noche siguiente a una de tus fechas.',
          '«Edificio viejo, electricidad mojada, qué quieres», dice Teo, sin sonar convencido. Después recupera el recorte, lo dobla muy pequeño y se lo guarda en el bolsillo de la camisa. «Esto no te lo he dado yo.»',
        ],
      ),
    },
    {
      id: 'silent-window',
      rating: 2,
      concepts: ['BETWEEN', 'IN'],
      title: bi('Fifteen silent minutes', 'Quince minutos de silencio'),
      location: bi('Forensic Laboratory · Thursday · 07:15', 'Laboratorio forense · Jueves · 07:15'),
      scene: bi(
        [
          'At 02:10 last night the alarm of the Forensic Laboratory lost power. At 02:25 it came back as if nothing had happened. The only thing missing from the evidence store is a sealed box of burned wiring: the samples from the fourth Old Quarter fire. Someone wanted them gone before anyone asked for them.',
          'The doors have kept working on their own battery. Only badges 14 and 27 are cleared for overnight maintenance, and Quiroga wants to know which of them was walking around when the building was blind. “And I want it in writing that you checked the others too. Somebody here is going to tell me I made it up.”',
        ],
        [
          'A las 02:10 de anoche, la alarma del Laboratorio Forense se quedó sin corriente. A las 02:25 volvió como si nada. Lo único que falta del depósito de pruebas es una caja sellada de cableado quemado: las muestras del cuarto incendio del Barrio Viejo. Alguien las quería fuera antes de que nadie las pidiera.',
          'Las puertas han seguido funcionando con su propia batería. Solo las credenciales 14 y 27 tienen permiso de mantenimiento nocturno, y Quiroga quiere saber cuál de las dos andaba por ahí mientras el edificio estaba ciego. «Y quiero por escrito que has mirado también las demás. Aquí alguien va a decirme que me lo he inventado.»',
        ],
      ),
      tables: {
        badge_events: badgeEvents,
        badge_registry: [
          { badge_id: 14, holder: 'Paula Gil', company: 'Municipal Services' },
          { badge_id: 27, holder: 'Joel Serra', company: 'Faro Servicios' },
          { badge_id: 8, holder: 'Ana Cruz', company: 'Forensic Laboratory' },
          { badge_id: 31, holder: 'Marc Tena', company: 'Forensic Laboratory' },
        ],
      },
      stages: [
        {
          title: bi('Everything during the blackout', 'Todo lo del apagón'),
          briefing: bi('Return badge_id, door and event_time of every event between 02:10 and 02:25, both included.', 'Devuelve badge_id, door y event_time de cada evento entre las 02:10 y las 02:25, ambas incluidas.'),
          expected: [
            { badge_id: 8, door: 'Corridor C', event_time: '02:12' },
            { badge_id: 27, door: 'Evidence store', event_time: '02:16' },
            { badge_id: 31, door: 'Loading bay', event_time: '02:20' },
          ],
          hints: [bi("BETWEEN includes both ends: event_time BETWEEN '02:10' AND '02:25'.", "BETWEEN incluye ambos extremos: event_time BETWEEN '02:10' AND '02:25'.")],
          clue: bi('Three badges moved during the blackout: 8, 27 and 31.', 'Tres credenciales se movieron durante el apagón: 8, 27 y 31.'),
        },
        {
          title: bi('Only the cleared badges', 'Solo las autorizadas'),
          briefing: bi('Add the second filter: keep only badges 14 and 27. Return badge_id and event_time.', 'Añade el segundo filtro: conserva solo las credenciales 14 y 27. Devuelve badge_id y event_time.'),
          expected: [{ badge_id: 27, event_time: '02:16' }],
          hints: [bi('IN (14, 27) is a shorter way of writing badge_id = 14 OR badge_id = 27.', 'IN (14, 27) es una forma corta de escribir badge_id = 14 OR badge_id = 27.')],
          clue: bi('Badge 27 opened the evidence store at 02:16.', 'La credencial 27 abrió el depósito de pruebas a las 02:16.'),
          reaction: bi('Quiroga: Badge 14 was at the same door twenty minutes either side and never inside the window. That is a very tidy person or a very lucky one. Who holds the 27?', 'Quiroga: La 14 pasó por allí veinte minutos antes y después, nunca dentro de la franja. O es muy ordenada o tiene mucha suerte. ¿Quién tiene la 27?'),
        },
        {
          title: bi('A name for the badge', 'Un nombre para la credencial'),
          briefing: bi('Look up badge 27 in badge_registry. Return holder and company.', 'Busca la credencial 27 en badge_registry. Devuelve holder y company.'),
          expected: [{ holder: 'Joel Serra', company: 'Faro Servicios' }],
          hints: [bi('A second, simple query on the other table is enough. Each query starts from scratch.', 'Basta con una segunda consulta sencilla sobre la otra tabla. Cada consulta empieza de cero.')],
          clue: bi('Badge 27 belongs to Joel Serra, of a contractor called Faro Servicios.', 'La credencial 27 es de Joel Serra, de una contrata llamada Faro Servicios.'),
        },
      ],
      closing: bi(
        [
          'Faro Servicios cleans, repairs and “maintains” half the public buildings in the city, including, according to its contract, the wiring of this one. Its offices are a brass plate on a door that does not open. Joel Serra has not been home for two days.',
          'Quiroga pins the name to the inside of her locker, not on the board in the squad room. When you ask why, she looks at you for a moment. “Because that board gets read by people. Keep your queries, analyst, and print nothing.”',
        ],
        [
          'Faro Servicios limpia, repara y «mantiene» media administración de la ciudad, incluido, según su contrato, el cableado de este edificio. Su sede es una placa de latón en una puerta que no se abre. Joel Serra lleva dos días sin aparecer por casa.',
          'Quiroga clava el nombre por dentro de su taquilla, no en la pizarra de la brigada. Cuando le preguntas por qué, te mira un momento. «Porque esa pizarra la lee gente. Guárdate las consultas, analista, y no imprimas nada.»',
        ],
      ),
    },
    {
      id: 'museum-alibi',
      rating: 2,
      concepts: ['JOIN', 'GROUP BY', 'COUNT'],
      title: bi('The row that did not belong', 'La fila que no encajaba'),
      location: bi('City Museum · Friday · 21:00', 'Museo de la Ciudad · Viernes · 21:00'),
      scene: bi(
        [
          'A hand-drawn chart of the old harbour has vanished during a private viewing at the City Museum: 1871, ink on linen, showing the drainage tunnels under the Old Quarter. Six guests had access. All six swear they stayed in the atrium with a glass in their hand.',
          'The museum cameras disagree, although the system is as stingy as its budget: each sighting stores only the number of a visitor, and their names are in another table. Teo pushes a chair towards you with his bad leg. “This is the day you learn why databases are built in pieces. Put the pieces together.”',
        ],
        [
          'Un plano a mano del puerto antiguo ha desaparecido durante una velada privada en el Museo de la Ciudad: 1871, tinta sobre lino, con los túneles de desagüe bajo el Barrio Viejo. Seis invitados tuvieron acceso. Los seis juran que no salieron del atrio con su copa en la mano.',
          'Las cámaras del museo opinan otra cosa, aunque el sistema es tan tacaño como su presupuesto: cada avistamiento guarda solo el número de un visitante, y los nombres están en otra tabla. Teo te acerca una silla con la pierna mala. «Hoy aprendes por qué las bases de datos se construyen a trozos. Junta los trozos.»',
        ],
      ),
      tables: { visitors: museumVisitors, sightings: museumSightings },
      stages: [
        {
          title: bi('Names in the East Wing', 'Nombres en el ala este'),
          briefing: bi('The chart hung in the East Wing. Return the name and seen_at of each sighting there, in order of time.', 'El plano colgaba en East Wing. Devuelve name y seen_at de cada avistamiento allí, por orden de hora.'),
          ordered: true,
          expected: [
            { name: 'Ada Ríos', seen_at: '18:02' },
            { name: 'Celia Mar', seen_at: '18:06' },
            { name: 'Ada Ríos', seen_at: '18:11' },
            { name: 'Elsa Nin', seen_at: '18:14' },
            { name: 'Ada Ríos', seen_at: '18:18' },
            { name: 'Celia Mar', seen_at: '18:24' },
            { name: 'Ada Ríos', seen_at: '18:33' },
          ],
          hints: [bi('JOIN links two tables through a shared value: FROM sightings JOIN visitors ON sightings.visitor_id = visitors.id.', 'JOIN enlaza dos tablas por un valor compartido: FROM sightings JOIN visitors ON sightings.visitor_id = visitors.id.'), bi("Add WHERE wing = 'East Wing' and ORDER BY seen_at after the JOIN.", "Añade WHERE wing = 'East Wing' y ORDER BY seen_at después del JOIN.")],
          clue: bi('Three guests entered the East Wing: Ada Ríos, Celia Mar and Elsa Nin.', 'Tres invitadas entraron en el ala este: Ada Ríos, Celia Mar y Elsa Nin.'),
        },
        {
          title: bi('Who could not keep away?', '¿Quién no podía alejarse?'),
          briefing: bi('Find the person seen most often in the East Wing. Return name and the count as sightings, in one row.', 'Encuentra a la persona vista más veces en East Wing. Devuelve name y el recuento como sightings, en una fila.'),
          expected: [{ name: 'Ada Ríos', sightings: 4 }],
          hints: [bi('GROUP BY name, then ORDER BY sightings DESC and LIMIT 1. A calculated column can be sorted by its alias.', 'GROUP BY name, después ORDER BY sightings DESC y LIMIT 1. Una columna calculada se puede ordenar por su alias.')],
          clue: bi('Ada Ríos passed the chart four times in half an hour.', 'Ada Ríos pasó cuatro veces ante el plano en media hora.'),
          reaction: bi('Teo: Now count the rows of sightings, and count what your JOIN gives you without a filter. Go on, humour an old man.', 'Teo: Ahora cuenta las filas de sightings y cuenta las que da tu JOIN sin filtrar. Venga, dale el gusto a un viejo.'),
        },
        {
          title: bi('The visitor who does not exist', 'La visitante que no existe'),
          briefing: bi('A JOIN silently discards rows with no match. One sighting has visitor_id 0, which is nobody. It was recorded at midnight, in a wing the museum does not have. Return its note.', 'Un JOIN descarta en silencio las filas sin pareja. Un avistamiento tiene visitor_id 0, que no es nadie. Se registró a medianoche, en un ala que el museo no tiene. Devuelve su note.'),
          expected: [{ note: museumSightings[10].note }],
          hints: [bi('No JOIN this time. A plain WHERE visitor_id = 0 on sightings will do.', 'Esta vez sin JOIN. Basta con un WHERE visitor_id = 0 sobre sightings.')],
          clue: bi('A note from I.B. hidden in the data: find the active locker that nobody rents at the Central Station.', 'Una nota de I.B. escondida en los datos: buscar en la Estación Central la taquilla activa que nadie alquila.'),
        },
      ],
      closing: bi(
        [
          'Ada Ríos gives back the chart without a fight. Her grandfather drew it, she says, and the Harbour Commission has been buying up every copy. A curious thing to want, for a company that is only interested in the surface of the Old Quarter. Quiroga takes the statement and closes the file. It is the first file you have closed. Nobody claps; this is the basement.',
          'You, however, are looking at a row that was never recorded by any camera. Somebody with ATLAS credentials wrote it directly into a table of a case that was going to come down to this desk. Somebody who knew which desk. Somebody who knows how you think, because she sat here and thought it first.',
          'You look up. Teo is doing his crossword. You switch off the screen before going home, and it occurs to you that this is the first time you have done it because you are afraid.',
        ],
        [
          'Ada Ríos devuelve el plano sin pelear. Lo dibujó su abuelo, dice, y la Comisión del Puerto lleva tiempo comprando todas las copias. Curioso interés, en una empresa a la que solo le importa la superficie del Barrio Viejo. Quiroga toma la declaración y cierra el expediente. Es el primero que cierras. Nadie aplaude; esto es el sótano.',
          'Tú, en cambio, estás mirando una fila que ninguna cámara registró jamás. Alguien con credenciales de ATLAS la escribió directamente en la tabla de un caso que iba a bajar a esta mesa. Alguien que sabía qué mesa. Alguien que sabe cómo piensas, porque se sentó aquí y lo pensó antes.',
          'Levantas la vista. Teo hace su crucigrama. Apagas la pantalla antes de irte a casa, y se te ocurre que es la primera vez que lo haces por miedo.',
        ],
      ),
    },
  ],
};
