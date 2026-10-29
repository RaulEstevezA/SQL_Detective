const bi=(en,es)=>({en,es});

export const caseLore={
  'missing-key':bi([
    'Rain had emptied the municipal archive before the evening shift ended. When the last archivist went to seal room A-12, the brass key assigned to its evidence cabinet was no longer on the control board.',
    'Nothing had been forced and the corridor camera had been offline for maintenance. The electronic access log is the only reliable record: it lists every person, role, room and entry time from that evening.'
  ],[
    'La lluvia había vaciado el archivo municipal antes de que terminara el turno de tarde. Cuando la última archivera fue a cerrar la sala A-12, la llave de latón de su armario de pruebas ya no estaba en el panel de control.',
    'No se había forzado ninguna puerta y la cámara del pasillo estaba desconectada por mantenimiento. El registro electrónico de accesos es la única prueba fiable: conserva cada persona, cargo, sala y hora de entrada de aquella tarde.'
  ]),
  'coded-message':bi([
    'For forty minutes, an unregistered transmitter sent short encrypted bursts from different points in the industrial district. Then the signal disappeared as suddenly as it had begun.',
    'The decoding team could recover only the priority, transmission time and location embedded in each message. They believe the final priority-three burst names the place where the group intended to meet.'
  ],[
    'Durante cuarenta minutos, un transmisor sin registrar envió breves ráfagas cifradas desde distintos puntos del distrito industrial. Después, la señal desapareció tan repentinamente como había comenzado.',
    'El equipo de descifrado solo pudo recuperar la prioridad, la hora y la ubicación incrustadas en cada mensaje. Creen que la última ráfaga de prioridad tres indica el lugar donde el grupo pretendía reunirse.'
  ]),
  'museum-alibi':bi([
    'A hand-drawn navigation map vanished during a private evening at the city museum. Guests insist they remained in the atrium, but the east wing cameras tell a less orderly story.',
    'Each camera event identifies a visitor without repeating the personal details stored in the guest register. Investigators want to know who was recorded most often inside the restricted wing.'
  ],[
    'Un mapa de navegación dibujado a mano desapareció durante una velada privada en el museo de la ciudad. Los invitados aseguran que permanecieron en el atrio, pero las cámaras del ala este cuentan una historia menos ordenada.',
    'Cada evento de cámara identifica a un visitante sin repetir los datos personales guardados en el registro de invitados. Los investigadores quieren saber quién fue captado más veces dentro del ala restringida.'
  ]),
  'alias-in-ledger':bi([
    'The small hotel opposite the central station appears repeatedly in the travel records of a smuggling inquiry. Several bookings were paid in cash, and the guests used similar surnames beginning with “Vale”.',
    'A clerk remembers that one of those identities returned under the exact same name. The booking ledger can distinguish the repeated alias from the innocent guests with similar names.'
  ],[
    'El pequeño hotel frente a la estación central aparece repetidamente en los movimientos de una investigación por contrabando. Varias reservas se pagaron en efectivo y los huéspedes usaron apellidos parecidos que empezaban por «Vale».',
    'Una recepcionista recuerda que una de esas identidades regresó usando exactamente el mismo nombre. El libro de reservas permite distinguir el alias repetido de los huéspedes inocentes con nombres similares.'
  ]),
  'silent-window':bi([
    'At 02:10, the alarm protecting a laboratory storage floor lost power. It came back fifteen minutes later, with no broken lock and no sign of a forced entrance.',
    'Only two maintenance badges were authorized for overnight work. The reader preserved every badge event around the outage, so the authorized credential used inside that narrow window can still be identified.'
  ],[
    'A las 02:10, la alarma que protegía la planta de almacenamiento de un laboratorio perdió la corriente. Volvió quince minutos después, sin cerraduras rotas ni señales de entrada forzada.',
    'Solo dos credenciales de mantenimiento tenían autorización nocturna. El lector conservó todos los accesos cercanos al apagón, por lo que todavía puede identificarse la credencial autorizada utilizada dentro de esa franja.'
  ]),
  'unclaimed-locker':bi([
    'During an inventory at the old railway station, inspectors found sealed envelopes inside a locker marked as active. According to policy, every active locker must belong to a current rental contract.',
    'The locker registry and the contract book were exported separately. One active locker has no corresponding renter, making it the only place where the envelopes could have been left anonymously.'
  ],[
    'Durante un inventario en la antigua estación, los inspectores encontraron sobres sellados dentro de una taquilla marcada como activa. Según el reglamento, toda taquilla activa debe pertenecer a un contrato vigente.',
    'El registro de taquillas y el libro de contratos se exportaron por separado. Una taquilla activa no tiene arrendatario asociado, lo que la convierte en el único lugar donde pudieron dejarse los sobres de forma anónima.'
  ]),
  'warehouse-pattern':bi([
    'A warehouse supervisor reported a courier collecting small, unlabelled packages over several days. A single visit is ordinary business; a repeated pattern may indicate someone testing the depot routine.',
    'The collection system records only the courier account used for each visit. Investigators have defined three or more collections as the threshold for opening a formal review.'
  ],[
    'El encargado de un almacén informó de un mensajero que recogía pequeños paquetes sin etiqueta durante varios días. Una sola visita es trabajo rutinario; un patrón repetido puede indicar que alguien está estudiando el funcionamiento del depósito.',
    'El sistema de recogidas solo conserva la cuenta de mensajería utilizada en cada visita. Los investigadores han fijado tres o más recogidas como umbral para abrir una revisión formal.'
  ]),
  'above-average-transfer':bi([
    'Shortly before midnight, four transfers crossed accounts linked to a dormant investigation. None exceeded the bank’s automatic alert limit, but one looked disproportionate beside the others.',
    'Rather than choosing an arbitrary amount, the financial team defines suspicious activity as any transfer strictly above the average value of that night’s complete batch.'
  ],[
    'Poco antes de medianoche, cuatro transferencias pasaron por cuentas vinculadas a una investigación inactiva. Ninguna superó el límite automático del banco, pero una parecía desproporcionada frente a las demás.',
    'En lugar de elegir una cantidad arbitraria, el equipo financiero considera sospechosa cualquier transferencia estrictamente superior al valor medio del lote completo de aquella noche.'
  ]),
  'three-way-trail':bi([
    'A traffic camera photographed plate VX-204 leaving the service road behind a burgled depot. The image proves the vehicle was present, but the camera system stores no owner or contact details.',
    'Those details live in separate vehicle, people and telephone records. Following the identifiers across all three sources will reveal who owns the car and which number investigators can trace.'
  ],[
    'Una cámara de tráfico fotografió la matrícula VX-204 saliendo de la vía de servicio situada detrás de un depósito asaltado. La imagen demuestra que el vehículo estuvo allí, pero el sistema de cámaras no guarda datos del propietario ni de contacto.',
    'Esos datos están separados entre los registros de vehículos, personas y teléfonos. Seguir los identificadores a través de las tres fuentes revelará quién posee el coche y qué número pueden rastrear los investigadores.'
  ]),
  'coded-risk':bi([
    'The fraud desk intercepted a series of withdrawals split across several accounts and countries. No individual operation was large enough to trigger a conventional alert.',
    'Analysts therefore use a weighted score: domestic withdrawals count once and foreign withdrawals count twice. The account with the highest combined score is the one that must be escalated.'
  ],[
    'El equipo antifraude interceptó una serie de retiradas repartidas entre varias cuentas y países. Ninguna operación individual era lo bastante grande como para activar una alerta convencional.',
    'Por eso, los analistas usan una puntuación ponderada: las retiradas nacionales cuentan una vez y las extranjeras, dos. La cuenta con el total más alto es la que debe pasar a investigación.'
  ]),
  'night-route':bi([
    'A witness saw a suspected courier board the final N7 train and later enter a taxi outside the terminal. The station and taxi company keep independent records, so neither source tells the whole journey.',
    'Investigators consider a taxi connected to the train only when it departs within twenty minutes of the passenger’s arrival. The combined route must identify every N7 passenger who fits that window.'
  ],[
    'Un testigo vio a un supuesto mensajero subir al último tren N7 y entrar después en un taxi frente a la terminal. La estación y la compañía de taxis guardan registros independientes, así que ninguna fuente cuenta el trayecto completo.',
    'Los investigadores consideran que un taxi está conectado con el tren solo si sale durante los veinte minutos posteriores a la llegada del pasajero. La ruta combinada debe identificar a cada pasajero del N7 que encaje en esa franja.'
  ]),
  'inside-contact':bi([
    'Minutes before the evidence room was opened without authorization, one employee placed a brief internal call to another. The call record contains two identifiers but no repeated names.',
    'Both identifiers point back to the same personnel directory: one represents the caller and the other the receiver. Call 70 is the conversation the internal affairs team needs reconstructed.'
  ],[
    'Minutos antes de que la sala de pruebas se abriera sin autorización, una persona empleada realizó una breve llamada interna a otra. El registro contiene dos identificadores, pero no repite los nombres.',
    'Ambos identificadores remiten al mismo directorio de personal: uno representa a quien llamó y el otro a quien recibió la llamada. La conversación 70 es la que asuntos internos necesita reconstruir.'
  ]),
  'harbor-conspiracy':bi([
    'A sealed crate disappeared from Pier 3 while a storm delayed the night shift. A dockworker remembers a blue van crossing the gate, but rain obscured its plate and the paper manifest was later found incomplete.',
    'Digital gate records can place vehicles at the pier, while driver and call records can connect the person behind the wheel with a possible coordinator. Investigators are interested in the van that left between 22:00 and 22:20 and in a call brief enough to resemble a confirmation signal.'
  ],[
    'Una caja sellada desapareció del muelle 3 mientras una tormenta retrasaba el turno de noche. Un estibador recuerda una furgoneta azul cruzando la salida, pero la lluvia ocultó la matrícula y el manifiesto en papel apareció incompleto.',
    'Los registros digitales pueden situar los vehículos en el muelle, mientras que los datos de conductores y llamadas pueden conectar a quien iba al volante con una posible persona coordinadora. Interesa la furgoneta que salió entre las 22:00 y las 22:20 y una llamada lo bastante breve como para parecer una señal de confirmación.'
  ]),
  'glass-gallery':bi([
    'During the winter gala, a crystal miniature vanished from a locked display in the restricted gallery. The crowd, temporary staff and borrowed invitations made the ordinary guest list unreliable.',
    'Three independent traces survived: camera passages through the restricted zone, official gala tickets and the objects declared at the coat check. The culprit crossed the gallery at least twice, had no ticket record and left a coat containing a brass key.'
  ],[
    'Durante la gala de invierno, una miniatura de cristal desapareció de una vitrina cerrada en la galería restringida. La multitud, el personal temporal y las invitaciones prestadas hicieron que la lista normal de asistentes dejara de ser fiable.',
    'Sobrevivieron tres rastros independientes: los pasos de cámara por la zona restringida, las entradas oficiales y los objetos declarados en consigna. La persona culpable cruzó la galería al menos dos veces, no tenía entrada registrada y dejó un abrigo con una llave de latón.'
  ]),
  'last-signal':bi([
    'For two consecutive nights, an encrypted relay transmitted from a protected room after every other signal had gone quiet. Whoever controlled it waited until the day’s final transmission to hide among routine traffic.',
    'The transmission archive can rank each operator’s activity within each day, while the badge system records who physically entered the Relay Room. The same operator must be the final sender on both nights and must also have opened that room.'
  ],[
    'Durante dos noches consecutivas, un repetidor cifrado transmitió desde una sala protegida cuando todas las demás señales ya habían callado. Quien lo controlaba esperaba hasta la última transmisión del día para ocultarse entre el tráfico rutinario.',
    'El archivo de transmisiones permite ordenar la actividad de cada operador dentro de cada día, mientras que el sistema de credenciales registra quién entró físicamente en la sala del repetidor. La misma persona debe ser la última emisora de ambas noches y haber abierto también esa sala.'
  ])
};
