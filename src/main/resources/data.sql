/*Add social media users */
INSERT INTO social_media_user (id, username, firstname, lastname, email, password, biography, isonline) VALUES
('eb11e1d2-d496-482c-9fff-f96eb868a1b3','maxmustermann', 'Max', 'Mustermann', 'maxmustermann@email.com', 'password', 'Hi, I am Max!', true),
('39306676-6008-4b4b-9f34-2cb73c5150a0','emmascott', 'Emma', 'Scott', 'emmascott@email.com', 'password', 'Hi, I am Emma!', true),
('a9a32cf3-f92b-4c2a-8d2e-5236aabfda86','benjaminbrown', 'Benjamin', 'Brown', 'benjaminbrown@email.com', 'password', 'Hi, I am Benjamin!', false),
('b23f3721-aa9d-4163-b1fb-eaaf4e2555bb','miamadison', 'Mia', 'Madison', 'miamadison@email.com', 'password', 'Hi, I am Mia!', false),
('ab178187-ba2b-4626-93a5-0f1cd22cf125','oliviagrey', 'Olivia', 'Grey', 'oliviagrey@email.com', 'password', 'Hi, I am Olivia!', false),

('ea837494-9719-464d-ab71-8f3f941fe7c7', 'oliverthompson', 'Oliver','Thompson', 'o.thompson@gmail.com', 'password', 'Hi, I am Oliver!', false),
('c824945f-9c92-496d-bd4b-2ccf33001ac4', 'mariacarter', 'Maria','Carter', 'maria.carter@gmail.com', 'password', 'Hi, I am Maria!', true),
('e9ada583-3799-47b8-8237-21838a0a58b8', 'luisemadzy01', 'Luise','Madzy', 'lumad@gmail.com', 'password', 'Hi, I am Luise!', false),
('5a5c35f1-ae53-4c1b-b475-144cad88ce64', 'jenniferbrown', 'Jennifer','Brown', 'jlobrown@gmail.com', 'password', 'Hi, I am Jennifer!', true),
('037f13c4-0d7d-4d29-a8ee-223f0b47a4e6', 'christopherblake', 'Christopher','Blake', 'chris.blake@gmail.com', 'password', 'Hi, I am Christopher!', true);

/*Add user roles*/
INSERT INTO user_roles (user_id, roles) VALUES
('eb11e1d2-d496-482c-9fff-f96eb868a1b3', 'USER'),
('39306676-6008-4b4b-9f34-2cb73c5150a0', 'USER'),
('a9a32cf3-f92b-4c2a-8d2e-5236aabfda86', 'USER'),
('b23f3721-aa9d-4163-b1fb-eaaf4e2555bb', 'USER'),
('ab178187-ba2b-4626-93a5-0f1cd22cf125', 'USER'),
('ea837494-9719-464d-ab71-8f3f941fe7c7', 'USER'),
('c824945f-9c92-496d-bd4b-2ccf33001ac4', 'USER'),
('e9ada583-3799-47b8-8237-21838a0a58b8', 'USER'),
('5a5c35f1-ae53-4c1b-b475-144cad88ce64', 'USER'),
('037f13c4-0d7d-4d29-a8ee-223f0b47a4e6', 'USER');

/*Add posts*/
INSERT INTO posts (id, creationdatetime, content, imageurl, userid) VALUES
('f61f18db-ef04-41e7-95d0-da45966e42b3', '2024-10-04 15:10:57.750622', 'Hello world!','', 'eb11e1d2-d496-482c-9fff-f96eb868a1b3'),
('e050d796-515e-4345-91ea-118e1195d247', '2024-10-04 15:11:58.750622', 'Hello test!','', 'eb11e1d2-d496-482c-9fff-f96eb868a1b3'),
('aeef735e-d77f-40c9-ba11-18c467c49297', '2024-10-05 16:11:58.750622', 'Hello guys, this is my pet!','', '39306676-6008-4b4b-9f34-2cb73c5150a0'),
('98846443-7ce4-4e7d-9e94-78522efb82ac', '2024-10-07 17:11:58.750622', 'Hello guys, I love Germany!','', 'a9a32cf3-f92b-4c2a-8d2e-5236aabfda86'),
('fe71f7d0-d8c5-4b9b-8891-4c87e5259f08', '2024-10-09 19:11:58.750622', 'Hello guys, I live my best life!','', 'ea837494-9719-464d-ab71-8f3f941fe7c7'),
('872b5ba5-0025-4b2f-9724-086b2074c404', '2024-10-03 20:11:58.750622', 'Hello guys, I love my job!','', 'c824945f-9c92-496d-bd4b-2ccf33001ac4');

/*Add comments */
INSERT INTO comments(id, text, creationdatetime, userid, postid) VALUES
('63224967-b502-42c5-8f3e-5280a731e39a', 'Best comment of the year', '2024-10-04 15:11:57.750622', 'eb11e1d2-d496-482c-9fff-f96eb868a1b3','f61f18db-ef04-41e7-95d0-da45966e42b3'),
('f995cd08-25cf-40f1-9f50-30b1044ebf06', 'Best article', '2024-10-04 15:12:57.750622', '39306676-6008-4b4b-9f34-2cb73c5150a0','f61f18db-ef04-41e7-95d0-da45966e42b3'),
('94d1df99-715e-4a25-9912-53518ceaac8d', 'I agree with you', '2024-10-09 19:12:57.750622', 'ea837494-9719-464d-ab71-8f3f941fe7c7','98846443-7ce4-4e7d-9e94-78522efb82ac');


/*TODO: friends, messages... */



