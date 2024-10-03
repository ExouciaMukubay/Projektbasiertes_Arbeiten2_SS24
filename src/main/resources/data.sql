/*Add social media users */
INSERT INTO social_media_user (id, username, firstname, lastname, email, password, biography, isonline) VALUES
('eb11e1d2-d496-482c-9fff-f96eb868a1b3','maxmustermann', 'Max', 'Mustermann', 'maxmustermann@email.com', 'password', 'Hi, I am Max!', true),
('39306676-6008-4b4b-9f34-2cb73c5150a0','emmascott', 'Emma', 'Scott', 'emmascott@email.com', 'password', 'Hi, I am Emma!', true),
('a9a32cf3-f92b-4c2a-8d2e-5236aabfda86','benjaminbrown', 'Benjamin', 'Brown', 'benjaminbrown@email.com', 'password', 'Hi, I am Benjamin!', false),
('b23f3721-aa9d-4163-b1fb-eaaf4e2555bb','miamadison', 'Mia', 'Madison', 'miamadison@email.com', 'password', 'Hi, I am Mia!', false),
('ab178187-ba2b-4626-93a5-0f1cd22cf125','oliviagrey', 'Olivia', 'Grey', 'oliviagrey@email.com', 'password', 'Hi, I am Olivia!', false);

/*Add user roles*/
INSERT INTO user_roles (user_id, roles) VALUES
('eb11e1d2-d496-482c-9fff-f96eb868a1b3', 'USER'),
('39306676-6008-4b4b-9f34-2cb73c5150a0', 'USER'),
('a9a32cf3-f92b-4c2a-8d2e-5236aabfda86', 'USER'),
('b23f3721-aa9d-4163-b1fb-eaaf4e2555bb', 'USER'),
('ab178187-ba2b-4626-93a5-0f1cd22cf125', 'USER');
