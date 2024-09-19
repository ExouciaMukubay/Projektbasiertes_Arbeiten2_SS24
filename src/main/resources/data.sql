/*Add social media users */
INSERT INTO social_media_user (id, username, firstname, lastname, email, password, biography, phonenumber, isonline) VALUES ('eb11e1d2-d496-482c-9fff-f96eb868a1b3','maxmustermann', 'Max', 'Mustermann', 'maxmustermann@email.com', 'password', 'Hallo, ich bin der Max und komme aus Berlin!','+49123456789', true);
INSERT INTO social_media_user (id, username, firstname, lastname, email, password, biography, phonenumber, isonline) VALUES ('39306676-6008-4b4b-9f34-2cb73c5150a0','emmascott', 'Emma', 'Scott', 'emmascott@email.com', 'password', 'Hello, I am Emma. I am from London!','+44123456789', true);
INSERT INTO social_media_user (id, username, firstname, lastname, email, password, biography, phonenumber, isonline) VALUES ('a9a32cf3-f92b-4c2a-8d2e-5236aabfda86','benjaminbrown', 'Benjamin', 'Brown', 'benjaminbrown@email.com', 'password', 'Hello, I am Benjamin. I am from New York!','+121222222222', false);
INSERT INTO social_media_user (id, username, firstname, lastname, email, password, biography, phonenumber, isonline) VALUES ('b23f3721-aa9d-4163-b1fb-eaaf4e2555bb','miamadison', 'Mia', 'Madison', 'miamadison@email.com', 'password', 'Hello, I am Mia. I am from California!','+121322344556', false);
INSERT INTO social_media_user (id, username, firstname, lastname, email, password, biography, phonenumber, isonline) VALUES ('ab178187-ba2b-4626-93a5-0f1cd22cf125','oliviagrey', 'Olivia', 'Grey', 'oliviagrey@email.com', 'password', 'Hello, I am Olivia. I am from Madrid!','+342322111', false);

/*Add user roles*/
INSERT INTO user_roles (user_id, roles) VALUES ('eb11e1d2-d496-482c-9fff-f96eb868a1b3', 'USER');
INSERT INTO user_roles (user_id, roles) VALUES ('39306676-6008-4b4b-9f34-2cb73c5150a0', 'USER');
INSERT INTO user_roles (user_id, roles) VALUES ('a9a32cf3-f92b-4c2a-8d2e-5236aabfda86', 'USER');
INSERT INTO user_roles (user_id, roles) VALUES ('b23f3721-aa9d-4163-b1fb-eaaf4e2555bb', 'USER');
INSERT INTO user_roles (user_id, roles) VALUES ('ab178187-ba2b-4626-93a5-0f1cd22cf125', 'USER');
