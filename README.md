# Project Summary

This project is part of a full-stack application that consists of a React frontend and a Django backend. The application allows users to manage a to-do list, with the ability to add, delete, and persist to-do items across sessions.

## Frontend (React)

The React frontend is structured with a focus on component-based architecture, making the code modular and reusable. The primary components in this project are:

1. **App Component (`App.js`)**:

   - This is the main component of the application. It manages the state of the to-do items and handles adding and deleting items.
   - It fetches the list of to-do items from the backend on component mount and renders the `ItemList` and `AddItemForm` components.
   - It includes the functions `addItem` and `deleteItem` to interact with the backend API for adding and deleting to-do items.

2. **ItemList Component (`ItemList.js`)**:

   - This component receives the list of to-do items as props and renders them.
   - It also includes a delete button for each item, allowing users to remove items from the list.

3. **AddItemForm Component (`AddItemForm.js`)**:
   - This component includes an input field and a button to add new to-do items.
   - It manages the input state and calls the `addItem` function from the `App` component when a new item is submitted.
