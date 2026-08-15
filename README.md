# Courier Management System

A full-stack web-based **Courier Management System** developed to manage courier operations including consignments, branch inscan, bags, manifests, vehicles, employees, customers, documents, payments, tracking, delivery, and dashboard monitoring.

The application uses **Angular** for the frontend, **FastAPI** for the RESTful backend API, and **MySQL** for data storage.

## Features

* 🔐 User authentication and registration
* 📊 Dashboard with courier operation statistics
* 📦 Courier and consignment management
* 🏢 Branch and branch-inscan management
* 🚚 Vehicle management
* 🧑‍💼 Employee management
* 👤 Customer management
* 👜 Bag management
* 📋 Manifest management
* 📄 Document management
* 💳 Payment management
* 📍 Shipment tracking
* 🚚 Delivery management
* 📈 Reports and operational data
* 🔄 RESTful API communication between frontend and backend

## Technology Stack

### Frontend

* Angular 19
* TypeScript
* HTML5
* CSS3
* Chart.js

### Backend

* Python
* FastAPI
* SQLAlchemy
* RESTful APIs
* Uvicorn

### Database

* MySQL

### Development Tools

* Visual Studio Code
* Git
* GitHub
* npm
* Python Virtual Environment

## Project Architecture

```text
Courier Management System
│
├── Angular Frontend
│   ├── Components
│   ├── Pages
│   ├── Services
│   ├── Authentication
│   └── Dashboard
│
├── FastAPI Backend
│   ├── Routers
│   ├── Models
│   ├── Schemas
│   ├── CRUD Operations
│   ├── Authentication & Security
│   └── Database Connection
│
└── MySQL Database
```

## Project Structure

```text
courier-management-system/
│
├── courier-backend/
│   ├── app/
│   │   ├── routers/
│   │   ├── crud.py
│   │   ├── database.py
│   │   ├── main.py
│   │   ├── models.py
│   │   ├── schemas.py
│   │   └── security.py
│   │
│   ├── requirements.txt
│   └── test_db.py
│
├── src/
│   └── app/
│       ├── components/
│       ├── layout/
│       ├── pages/
│       ├── services/
│       ├── auth.guard.ts
│       └── auth.interceptor.ts
│
├── public/
├── angular.json
├── package.json
├── package-lock.json
└── README.md
```

## Getting Started

### Prerequisites

Make sure the following are installed:

* Node.js
* npm
* Python 3.x
* MySQL
* Angular CLI

### 1. Clone the repository

```bash
git clone https://github.com/priya29-hash/courier-management-system.git
cd courier-management-system
```

## Frontend Setup

Install the Angular dependencies:

```bash
npm install
```

Start the Angular development server:

```bash
ng serve
```

Open:

```text
http://localhost:4200
```

## Backend Setup

Move to the backend directory:

```bash
cd courier-backend
```

Create a Python virtual environment:

### Windows

```bash
python -m venv venv
```

Activate it:

```bash
venv\Scripts\activate
```

Install the required packages:

```bash
pip install -r requirements.txt
```

Start the FastAPI server:

```bash
uvicorn app.main:app --reload
```

The backend will be available at:

```text
http://127.0.0.1:8000
```

FastAPI interactive API documentation:

```text
http://127.0.0.1:8000/docs
```

## Database Configuration

Create a MySQL database for the application.

Configure the database connection using environment variables rather than committing credentials to GitHub.

Example:

```text
DATABASE_URL=your_database_connection
```

> Never commit passwords, API keys, or other sensitive credentials to the repository.

## API Communication

The Angular frontend communicates with the FastAPI backend through RESTful APIs.

Example backend endpoint:

```text
GET /employees/
POST /employees/
GET /vehicles/
POST /vehicles/
GET /bags/
POST /bags/
```

The complete API can be explored through FastAPI Swagger documentation:

```text
http://127.0.0.1:8000/docs
```

## Dashboard

The dashboard provides an overview of courier operations and displays information such as:

* Total consignments
* Pending shipments
* Delivered shipments
* Branches
* Vehicles
* Bags
* Documents
* Manifests

Chart.js is used for visualizing shipment status and operational information.

## Security

The project includes:

* Authentication
* Authorization through route guards
* HTTP authentication interceptor
* Environment-based configuration
* Password/security handling on the backend

Sensitive configuration files such as `.env` are excluded from Git using `.gitignore`.

## Future Enhancements

* Deployment to a cloud platform
* Online shipment tracking
* Email/SMS delivery notifications
* Role-based access control
* Advanced analytics dashboard
* Automated report generation
* Cloud database integration
* Containerization using Docker

## Purpose

This project was developed as a practical full-stack software development project to demonstrate:

* Frontend development
* Backend API development
* Database integration
* RESTful architecture
* Authentication
* CRUD operations
* Full-stack application integration
* Git and GitHub version control

## Author

**Priya Dharshini**

Computer Science Engineering Student

---

⭐ If you find this project useful, consider giving the repository a star.
