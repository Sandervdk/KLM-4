INSERT INTO USER(id, email, password, firstname, lastname, role) VALUES (1001, 'mechanic@klm.nl', 'Welkom01', 'Mechanic', 'mac', 1);
INSERT INTO USER(id, email, password, firstname, lastname, role) VALUES (1002,'admin@klm.nl', 'Welkom01', 'admin', 'admin', 0);
INSERT INTO USER(id, email, password, firstname, lastname, role) VALUES (1003,'runner@klm.nl', 'Welkom01', 'runner', 'runner', 2);

INSERT INTO CART(id, lat, lng, carttype, EQUIPMENT_STATUS, title) VALUES (50, 52.311720, 4.767863,'NITROGENCART', 'AVAILABLE', 'THIS IS A NITROGENCART');
INSERT INTO CART(id, lat, lng, carttype, EQUIPMENT_STATUS, title) VALUES (55, 52.311720, 4.767863,'NITROGENCART', 'AVAILABLE', 'THIS IS A NITROGENCART');
INSERT INTO CART(id, lat, lng, carttype, EQUIPMENT_STATUS, title) VALUES (60, 52.311720, 4.767863,'TIRECART', 'AVAILABLE','THIS IS A TIRECART');
INSERT INTO CART(id, lat, lng, carttype, EQUIPMENT_STATUS, title) VALUES (70, 52.311720, 4.767863, 'SKYDROLWAGEN', 'AVAILABLE','THIS IS A SKYDROLWAGEN');
INSERT INTO CART(id, lat, lng, carttype, EQUIPMENT_STATUS, title) VALUES (80, 52.311720, 4.767863, 'SKYDROL_CART', 'AVAILABLE','THIS IS A SKYDROL_CART');

INSERT INTO REQUEST(id, position, selected_wagon, extra_info, plane_type, tail_types, wagon_types, status, deadline, request_time, request_created, request_updated, user_id)
VALUES (500,'F5','','Dit is extra info',1, 2, 1,1, '14:00:33', '14:00:33', current_time, current_time , 1001);
INSERT INTO REQUEST(id, position, selected_wagon, extra_info, plane_type, tail_types, wagon_types, status, deadline, request_time, request_created, request_updated, user_id)
VALUES (501,'G5','','Dit is extra info',2, 2, 2,2, '14:00:33', '12:00:33',current_time, current_time , 1001);
INSERT INTO REQUEST(id, position, selected_wagon, extra_info, plane_type, tail_types, wagon_types, status, deadline, request_time, request_created, request_updated, user_id)
VALUES (502,'F5','','Dit is extra info',0, 1, 3,3, '14:00:33', '13:20:33',current_time, current_time , 1002);
INSERT INTO REQUEST(id, position, selected_wagon, extra_info, plane_type, tail_types, wagon_types, status, deadline, request_time, request_created, request_updated, user_id)
VALUES (503,'G5','','Dit is extra info',1, 2, 3,2, '14:00:33', '11:00:33',current_time, current_time , 1002);
INSERT INTO REQUEST(id, position, selected_wagon, extra_info, plane_type, tail_types, wagon_types, status, deadline, request_time, request_created, request_updated, user_id)
VALUES (504,'A5','','Dit is extra info',2, 1, 1,1, '14:00:33', '12:00:33',current_time, current_time , 1003);

