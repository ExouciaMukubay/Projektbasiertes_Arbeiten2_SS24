# Social Media App - A Custom project from Hilla

This project was created from https://start.vaadin.com.
The task of this project work is to deal with the development of applications through the use of REST interfaces using Spring Boot and Hilla.

### Description
This project explores the concept of Hilla, which enables the integration of Spring Boot and React to create seamless web applications based on a REST API. The aim is to present the concepts of Hilla in detail using a freely selectable web application, in this case a social media app, including its offerings as well as possible strengths, weaknesses and limitations.


The project does not cover all the functionalities marked “TODO” below. These will be implemented one day.
## Running the application

The project is a standard Maven project. To run it from the command line,
type `mvnw` (Windows), or `./mvnw` (Mac & Linux), then open
http://localhost:8080 in your browser.

Or you can simply run the SpringBootApplication `SocialMediaApp`.

You can also import the project to your IDE of choice as you would with any
Maven project.

# Functionality
- Register/ Sign up
- Login/Logout
- View own profile
- Edit profile
- Delete profile


- Publish post
- Edit post
- Delete post
- Like post
- View liked post
- Save post
- View saved post


- Publish comment
- Edit (your own) comment (By clicking on your comment)
- Delete (your own) comment (By clicking on your comment)


- Send friend request
- Accept friend request
- Decline friend request


- Search user 
- Suggest user you are not friends with


- [TODO] View other profile 
- [TODO] View, write, edit, delete message
- [TODO] View friendslist , remove friends
- [TODO] Styling for responsive 
- [TODO] Upload picture or video under post
- [TODO] Add, upload and change profile picture


# Technologies
## Backend
- Java
- Spring Boot
- Spring Security
- H2 database
- Spring JPA
- Maven

## Frontend
- React
- Vite
- Vaadin
- Lit

## Libraries 
- MUI Material UI
- Tailwind CSS
- Lombook

## Project structure

<table style="width:100%; text-align: left;">
  <tr><th>Directory</th><th>Description</th></tr>
  <tr><td><code>src/main/frontend/</code></td><td>Client-side source directory</td></tr>
  <tr><td>&nbsp;&nbsp;&nbsp;&nbsp;<code>themes/</code></td><td>Custom  
CSS styles</td></tr>
  <tr><td>&nbsp;&nbsp;&nbsp;&nbsp;<code>util/</code></td><td>Helper/Utility classes that provides constants, interfaces, custom styling and static methods
  <tr><td>&nbsp;&nbsp;&nbsp;&nbsp;<code>views/</code></td><td>UI view 
components</td></tr>
 <tr><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<code>MainLayout.tsx</code></td><td>Main 
layout component, contains the navigation menu, uses <a href="https://hilla.dev/docs/react/components/app-layout">
App Layout</a></td></tr>
  <tr><td>&nbsp;&nbsp;&nbsp;&nbsp;<code>index.html</code></td><td>HTML template</td></tr>
  <tr><td>&nbsp;&nbsp;&nbsp;&nbsp;<code>index.tsx</code></td><td>Frontend 
entrypoint, bootstraps a React application</td></tr>
  <tr><td><code>src/main/java/</code></td><td>Server-side 
source directory</td></tr>
 <tr><td>&nbsp;&nbsp;&nbsp;&nbsp;<code>data/</code></td><td>Entities</td></tr>
 <tr><td>&nbsp;&nbsp;&nbsp;&nbsp;<code>exceptions/</code></td><td>Custom exception classes</td></tr>
 <tr><td>&nbsp;&nbsp;&nbsp;&nbsp;<code>services/</code></td><td>Endpoints</td></tr>
  <tr><td>&nbsp;&nbsp;&nbsp;&nbsp;<code>SocialMediaApplication.java</code></td><td>Server entry-point</td></tr>
</table>

# Installation and usage
1) Clone this repository
```
git clone https://github.com/exouciam/Projektbasiertes_Arbeiten2_SS24.git
```
2) Install dependencies
```
cd hilla-social-media-app  
npm install
```
3) Run the server
```
Run SocialMediaApplication
```
View user credentials in `src/main/resources/data.sql`

4) [Optional] Open H2 database console in browser http://localhost:8080/h2-console
View credientials for h2-database in `src/main/resources/application.properties` 

## Useful links

- Read the documentation at [hilla.dev/docs](https://hilla.dev/docs/).
- Ask questions on [Stack Overflow](https://stackoverflow.com/questions/tagged/hilla) or join our [Discord channel](https://discord.gg/MYFq5RTbBn).
- Report issues, create pull requests in [GitHub](https://github.com/vaadin/hilla).
