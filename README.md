# User Management Dashboard

## Description

This project is a User Management Dashboard with the following features:

### 1. Users Management

- **Filter Users**:
  - Filter users by username, first name, last name, email, and phone number from input fields.
  - Filter users by role from a dropdown menu.
- **Sort Users**:
  - End users can sort data by clicking on the sort icon in the columns: First Name, Last Name, and Role.
- **Pagination**:
  - Show rows per page.
  - Paginate through the user list.
- **Export Users**:
  - Export users of all pages into an Excel file.
- **Create a New User**:
  - Add new users to the system.

### 2. Create / Update a User

- **Create a New User**:
  - Fill in the form to add a new user.
- **Update an Existing User**:
  - Update the details of an existing user.
- **Upload User’s Avatar**:
  - Upload an avatar image for the user.

## Technical Requirements

- **Responsive Design**:
  - The dashboard is responsive and works on Desktop, Tablet, and Mobile devices.
- **Manual Implementation**:
  - The features for filtering, sorting, and pagination are implemented manually without using any libraries.
- **UI Library**:
  - Use only `shadcn-ui` for the UI components.
- **Form Validation**:
  - Use `react-hook-form` for creating the user form.
  - Validate user input data using `zod`
