INSERT INTO USER(id, email, password, firstname, lastname, role) VALUES (1001, 'mechanic@klm.nl', 'Welkom01', 'Mechanic', 'mac', 1);
INSERT INTO USER(id, email, password, firstname, lastname, role) VALUES (1002,'admin@klm.nl', 'Welkom01', 'admin', 'admin', 0);
INSERT INTO USER(id, email, password, firstname, lastname, role) VALUES (1003,'runner@klm.nl', 'Welkom01', 'runner', 'runner', 2);

INSERT INTO REQUEST(id, locatie, deadline, cart_types, type_vliegtuig, positie, tijd, status, user_id) VALUES (500,'F5', '14:00:33',1,2,'G5', '14:00:33',1, 1001);
INSERT INTO REQUEST(id, locatie, deadline, cart_types, type_vliegtuig, positie, tijd, status, user_id) VALUES (501,'F5', '14:00:33',1,2,'G5', '14:00:33',1, 1001);
INSERT INTO REQUEST(id, locatie, deadline, cart_types, type_vliegtuig, positie, tijd, status, user_id) VALUES (503,'F5', '14:00:33',1,2,'G5', '14:00:33',1, 1002);
INSERT INTO REQUEST(id, locatie, deadline, cart_types, type_vliegtuig, positie, tijd, status, user_id) VALUES (505,'F5', '14:00:33',1,2,'G5', '14:00:33',1, 1003);

INSERT INTO CART(id, lat, lng, carttype, EQUIPMENT_STATUS, title) VALUES (50, 52.311720, 4.767863,'NITROGENCART', 'AVAILABLE', 'THIS IS A CART');
INSERT INTO CART(id, lat, lng, carttype, EQUIPMENT_STATUS, title) VALUES (60, 52.311720, 4.767863,'TIRECART', 'AVAILABLE','THIS IS A CART');
INSERT INTO CART(id, lat, lng, carttype, EQUIPMENT_STATUS, title) VALUES (70, 52.311720, 4.767863, 'SKYDROLWAGEN', 'AVAILABLE','THIS IS A CART');
