INSERT INTO USER(id, email, password, firstname, lastname, role) VALUES (1001, 'mechanic@klm.nl', 'Welkom01', 'Mechanic', 'mac', 1);
INSERT INTO USER(id, email, password, firstname, lastname, role) VALUES (1002,'admin@klm.nl', 'Welkom01', 'admin', 'admin', 0);
INSERT INTO USER(id, email, password, firstname, lastname, role) VALUES (1003,'runner@klm.nl', 'Welkom01', 'runner', 'runner', 2);

INSERT INTO CART(id, lat, lng, carttype, EQUIPMENT_STATUS, title) VALUES (50, 52.302916, 4.761736,'NITROGENCART', 'AVAILABLE', 'NITROGENCART');
INSERT INTO CART(id, lat, lng, carttype, EQUIPMENT_STATUS, title) VALUES (55, 52.305802, 4.773066,'NITROGENCART', 'AVAILABLE', 'NITROGENCART');
INSERT INTO CART(id, lat, lng, carttype, EQUIPMENT_STATUS, title) VALUES (60, 52.312676, 4.775512,'TIRECART', 'AVAILABLE','TIRECART');
INSERT INTO CART(id, lat, lng, carttype, EQUIPMENT_STATUS, title) VALUES (70, 52.308190, 4.773538, 'SKYDROLWAGEN', 'AVAILABLE','SKYDROLWAGEN');
INSERT INTO CART(id, lat, lng, carttype, EQUIPMENT_STATUS, title) VALUES (80, 52.314015, 4.754484, 'SKYDROL_CART', 'AVAILABLE','SKYDROL_CART');

INSERT INTO REQUEST(id, location, completion_time, deadline, plane_type, tail_type, wagon_type, selected_wagon, position, status, extra_info, request_created, request_updated, user_id)
VALUES (500, 'C3', current_time , current_time, 'BOEING737700', 'PH_AKA', 'Nitrogen Cart', null, 'Left', 'Pending', null, current_time, current_time , 1001);
INSERT INTO REQUEST(id, location, completion_time, deadline, plane_type, tail_type, wagon_type, selected_wagon, position, status, extra_info, request_created, request_updated, user_id)
VALUES (501, 'B5', current_time, current_time, 'BOEING737700', 'PH_AKA', 'Nitrogen Cart', null, 'Left', 'Delivered', null, current_time, current_time, 1002);
INSERT INTO REQUEST(id, location, completion_time, deadline, plane_type, tail_type, wagon_type, selected_wagon, position, status, extra_info, request_created, request_updated, user_id)
VALUES (502, 'B5', current_time, current_time, 'BOEING737700', 'PH_AKA', 'Skydrolwagen', null, 'Left', 'Pending', null, current_time, current_time, 1001);
INSERT INTO REQUEST(id, location, completion_time, deadline, plane_type, tail_type, wagon_type, selected_wagon, position, status, extra_info, request_created, request_updated, user_id)
VALUES (503, 'F7', current_time, current_time, 'BOEING737700', 'PH_AKA', 'Tires Cart', null, 'Left', 'Pending', 'N:2, M:1', current_time, current_time, 1002);
INSERT INTO REQUEST(id, location, completion_time, deadline, plane_type, tail_type, wagon_type, selected_wagon, position, status, extra_info, request_created, request_updated, user_id)
VALUES (504, 'F7', current_time, current_time, 'BOEING737700', 'PH_AKA', 'Nitrogen Cart', null, 'Left', 'Delivered', null, current_time, current_time, 1001);

-- '2019-12-27 15:20:33'
