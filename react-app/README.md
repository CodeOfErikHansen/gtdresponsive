Remainder for app to be at 1.0
- [ ] Clean up styling before deployment.
- [ ] Spring Security
- [X] Organizer can create projects with next steps 
- [X] Organizer can create record with just a description
- [ ] Project/someday page has expandable items with the next steps
- [X] Record page has name and body and can edit/delete
- [ ] Hot Seat page has next steps grouped in collapsable contexts.
- [ ] Can drag and drop next actions in a project.(click up down button also works) Only the top item for each project should be in hot seat.(?? show follow up action)
- [ ] Allow tracts of work in a project. A project with multiple tracts can have multiple next steps, but only one per track.
- [ ] Can mark a project and actions as complete. If an action as part of a project is completed the project appears as a header for that item in the complete page
      If a project is marked as completed than all actions are also shown in the complete page. This is weird actually. Rethink it
      
      
Notes for tonight: The idea that I found is to have an empty Action object that I can spread operator into the actions array.
Then it does the whole render by mapping in each action in the array onto the item. So actions.map(() => {put into an action component}) and render that.
If done this way we just add an empty action and it will get rendered
