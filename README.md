# Document Management System Frontend

A responsive React frontend application for a document management system that interfaces with a Flask API. This project implements user authentication, user management, and document management interfaces.

## Features

- **Authentication System**

  - User login with Redux state management
  - Session management

- **User Management**

  - Responsive data table with user listings
  - Search, sort, and filter functionality
  - Pagination
  - Create/Edit user forms using Redux

- **Document Management**
  - Document list view with search and filters
  - Document creation

## Getting Started

### Installation

1. Clone the repository

   ```bash
   git clone https://github.com/lokk798/DMS-Frontend.git
   cd DMS-Frontend
   ```

2. Install dependencies

   ```bash
   npm install

   ```

3. Start the development server

   ```bash
   npm start

   ```

## Authentication

The application uses hardcoded credentials:

- Username: `admin`
- Password: `admin123`

## API Integration

The application connects to the Flask API endpoints:

- `/api/users` - User management endpoints
- `/api/documents` - Document management endpoints
