# Intentions

Intentions is a productivity app built to help users keep track of their skills and hobbies while implementing actionable exercises that they can organize into scheduled To-Do lists.

## Live Site

Visit the live site here: https://intentions-app.herokuapp.com/


## Technologies Used
* Frontend: 
   * React
   * Redux
   * Chakra UI
   * react-calendar
   * react-quill
   * react-icons
* Backend:
   * Flask
   * SQLAlchemy
   * PostgreSQL
   * Alembic
   * WTForms
* Deployment:
   * Heroku
   * Docker

## Documentation
[Database Schema](https://github.com/r-w-chen/intentions/wiki/Database-Schema)

[Feature List](https://github.com/r-w-chen/intentions/wiki/Feature-List)

[Wireframes](https://github.com/r-w-chen/intentions/wiki/Frontend-Routes-(w--Wireframes))

## Features

### Dashboard
Registered Users gain access to a dashboard where they can begin tracking Skills they wish to improve.
#### Skills
- Under the Skills page, a user can create a new Skill that they want to track
- After a Skill has been made, a new Skill deck will appear
- When the user clicks on the Skill name, they will be redirected to that Skill's sessions
- A user can also edit an existing Skill's name or delete the Skill
#### Exercises
- Under the Exercises page, a user can create a new Exercise corresponding to an existing Skill
- The user can add notes on an exercise using a rich text editor
- All Exercises created by the user are viewable by Skill
- Clicking on an Exercise will render the Exercise's notes
- The Exercise can be edited or deleted
#### Sessions
- Users can create Session cards that consist of a list of Exercises
- Exercises can be mixed and matched with multiple Session cards
#### Scheduled To-Do Sessions
- A Session can be scheduled once Exercises have been added to it
- Any Sessions that have been scheduled are viewable under the Scheduled Sessions page
- Sessions that have been scheduled for Today will be viewable on the Home page
- Sessions scheduled for Today will render as a To-Do list, where the user can check off each Exercise they have completed
   - Once the user has completed all Exercises listed under a Session, the Session will be checked as completed and appear under the Completed Sessions box
## Future Features
- Integrating a consistency chart that shows how many days the user has consistently completed their To-Do's for the day
- Creating a calendar component that interfaces with the user's scheduled To-Do sessions
- Adding Tags for Exercises 

## Conclusion and Next Steps
