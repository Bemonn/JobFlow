# JobFlow

## Deployed link (Heroku): https://jobflow-d14d2890d879.herokuapp.com/ 

  ![GitHub](https://img.shields.io/badge/license-mit-blue)

## Table of Contents
 - [Project Description](#Project-Description)
 - [User Stories](#User-Stories)
 - [Acceptance Criteria](#Acceptance-Criteria)
 - [Usage](#Installation-and-Usage) 
 - [Screenshots](#Screenshots)
 - [Credits](#Credits)
 - [Deployment Links](#Deployment-Links)

## Project Description

As coding students, we worked together as a team to build a Task management App for Project 2 of the bootcamp.

Functionally, Jobflow is a website that allows you to create an account and post task so you and fellow employees can track their progress. 

The website lets you make an account providing your first name, last name, position and personal password. Once you have made an account you can key in the details you used to log into the site. You are then presented with a task dashboard and you can view and create task. 

The task dashboard contains a brief overview of all task in their respective statuses. You are able to see the Task ID, name, deadline. Employees assigned to it can be checked via their icons, hovering your mouse over icons allows you to see the employee's name.

The three major columns in the dashboard show what is Open, In Progress and Completed for ease of access and viewing. Task In Progress are centred on the screen. The new technology we used is sortableJS, this allows us to drag and drop cards within the same column and with that we can prioritise what is the most important task at hand.

By creating a task you can assign them to whoever who is working on them if they have an account. Your task can contain a brief description, task name, deadlines and it's status. Fellow employees who also have an account will be able to view these task. 

Once you have keyed in the information and selected to save changes you are able to view the task, employees assigned, edit, update or delete these task. 

In the topright you are able to access a dropdown upon clicking your user icon. Where you can see your name, postion and a logout button. If you choose to logout and you will be brought back to the home screen to log in again.  

On the backend the storage of data is done via routes and models. With the database storing information obtained from the views and the User or Employee's interactions with the site. 

In summary, JobFlow is a interactive fullstack application that allows the user to have a complete overview and management of employees and tasks

This was built using HTML, CSS, Javascript powered by Handlebars, bootstrap, jQuery, sortableJs, Express, Node.js, mySql2 / Sequelize, bcrypt,   dotenv, eslint and shared love from Group 2.

## User Stories
- User Story 1: As a business owner I want an app so that my employees can fill out their tasks after each day.

- User Story 2: As an employee at a company
I want a daily tasks list allocated by my manager/owner so that I know and can prioritise my tasks for the day.

- User Story 3: As an employee I aim to streamline project management, assign tasks to my team, monitor task progress, and ensure the availability of necessary building materials.

## Acceptance Criteria
- As an employee presented with a login screen, if I am not a registered employee, I must signup.
- When I click signup, I am directed to fill out a signup form.
- When I click submit, I am directed to login with my new user info.
- When I login, I am directed to the Team Taskboard.
- On the Taskboard, I can see tasks that are open, in progress, or completed.
- When I click on a task, I can modify the progress of the task, add a description, add members, and choose a deadline.
- When I click on save changes, my changes will be saved, and the task will fall into the correct status row.
- When I click on DELETE, the task will be removed.
- When I view the top-right of the dashboard, I will see my username.
- When I click on the username, I am presented with the name of the person logged in (me), the position of the employee, and a logout button.
- When I click on 'logout', I am safely logged out and redirected to the login screen.

## Installation and Usage

The application can run in any Web browser such as Chrome or Safari. It can also run on smaller screens such as tablets or phones.

For further information about running the application look at the project description at the top of this readme on how to use the site.

## Screenshots

## Credits
Group 2 Members: Ruihang Hou (Horus), Tristan Brennan, Nils Heyman, Xisheng Chen (Raymond), Ying Jie Puk

- Horace https://github.com/Ruihang2017 
- Nils https://github.com/njheymann  
- Raymond https://github.com/Raymond-XishengChen 
- Tristan https://github.com/Bemonn 
- Ying https://github.com/YJPuk 

And of course TA's from the USyd eDX bootcamp that provided a lot useful information in helping us deploy our works.

## Deployment Links

Slideshow Document: https://docs.google.com/presentation/d/1CxCLYcMaQ7Di91g1UJWbaDvXZACBCuqvAfpehgIRkhc/edit?usp=sharing

Github Repository: https://github.com/Bemonn/JobFlow

Heroku Link: https://jobflow-d14d2890d879.herokuapp.com/