# Courier Management System

A full-stack web application for managing courier and logistics operations through a centralized digital platform.

The system helps manage consignments, branches, bags, vehicles, manifests, documents, tracking, delivery, customers, employees, and payments. It uses an Angular frontend, FastAPI backend, and MySQL database connected through RESTful APIs.

---

## 📌 Project Overview

Traditional courier management can involve multiple manual processes for recording consignments, tracking shipments, managing branches, vehicles, bags, and delivery information.

The **Courier Management System** provides a centralized web-based solution to manage these operations digitally.

The application follows a **frontend–backend architecture**, where the Angular frontend communicates with a Python FastAPI backend through RESTful APIs. MySQL is used for persistent data storage.

---

## 🎯 Objectives

* Digitize courier and logistics operations.
* Centralize courier-related information.
* Simplify consignment and delivery management.
* Improve shipment tracking and visibility.
* Manage branches, vehicles, bags, and manifests efficiently.
* Provide RESTful APIs for frontend-backend communication.
* Store operational data using a relational database.
* Provide dashboard-based visualization of courier statistics.

---

## 🚀 Key Features

* User Login
* Dashboard
* Branch Inscan Management
* Consignment Management
* Document Management
* Bag Management
* Vehicle Management
* Branch Management
* Manifest Management
* Courier Tracking
* Delivery Management
* Employee Management
* Customer Management
* Payment Management
* RESTful API Integration
* MySQL Database Integration
* Dashboard Statistics
* Chart-based Data Visualization

---

## 🛠️ Technology Stack

### Frontend

* Angular
* TypeScript
* HTML5
* CSS3
* Chart.js

### Backend

* Python
* FastAPI
* RESTful APIs
* Uvicorn

### Database

* MySQL

### Tools

* Visual Studio Code
* Git
* GitHub
* Node.js
* npm
* Angular CLI

---

## 🏗️ System Architecture

```text
┌───────────────────────────────┐
│        Angular Frontend       │
│     HTML + CSS + TypeScript   │
└───────────────┬───────────────┘
                │
                │ REST API
                ▼
┌───────────────────────────────┐
│        FastAPI Backend        │
│          Python API           │
└───────────────┬───────────────┘
                │
                │ Database Operations
                ▼
┌───────────────────────────────┐
│         MySQL Database        │
└───────────────────────────────┘
```

---

## 📦 Main Modules

### 1. Dashboard

Provides a centralized overview of courier operations.

The dashboard can display statistics such as:

* Total Consignments
* Pending Consignments
* Delivered Consignments
* Branches
* Vehicles
* Bags
* Documents
* Manifests

Chart.js is used to visualize shipment status and operational data.

---

### 2. Branch Inscan

Used to record courier items received at a branch and manage branch-level incoming shipment information.

---

### 3. Consignment

Used to create and manage courier consignments and maintain important shipment information.

---

### 4. Documents

Used to manage documents associated with courier operations and consignments.

---

### 5. Bag

Used to manage courier bags used for grouping and transporting consignments.

---

### 6. Vehicle

Used to maintain vehicle-related information required for courier transportation and logistics operations.

---

### 7. Branch

Used to manage courier branch information and branch-related operations.

---

### 8. Manifest

Used to create and manage manifests containing grouped consignments for transportation between locations.

---

### 9. Tracking

Used to monitor the movement and current status of consignments throughout the delivery process.

---

### 10. Delivery

Used to manage delivery operations and update delivery-related information.

---

### 11. Employee

Used to manage employee information within the courier organization.

---

### 12. Customer

Used to maintain customer-related information associated with courier services.

---

### 13. Payment

Used to manage payment-related information associated with courier transactions.

---

## 🔄 Courier Workflow

```text
Customer
   │
   ▼
Consignment Creation
   │
   ▼
Branch Inscan
   │
   ▼
Bag Processing
   │
   ▼
Manifest Creation
   │
   ▼
Transportation
   │
   ▼
Shipment Tracking
   │
   ▼
Destination Branch
   │
   ▼
Delivery
   │
   ▼
Completed
```

---

## 📊 Dashboard Visualization

The dashboard provides a quick overview of the current courier operations.

Example shipment status categories include:

* Delivered
* Pending
* In Transit
* Returned

Chart.js is used to represent these statistics visually, making operational information easier to understand.

---

## 🔌 RESTful API

The backend is developed using **FastAPI** and provides RESTful APIs for communication between the Angular frontend and MySQL database.

The APIs support common operations such as:

* Create
* Read
* Update
* Delete

The API layer is responsible for handling application requests, validating data, communicating with the database, and returning responses to the frontend.

FastAPI also provides interactive API documentation through Swagger UI.

---

## 🗄️ Database

MySQL is used as the relational database management system.

The application manages data related to:

* Users
* Employees
* Customers
* Branches
* Consignments
* Vehicles
* Bags
* Manifests
* Tracking
* Delivery
* Documents
* Payments

---

## 📁 Project Structure

```text
courier-management/
│
├── src/
│   ├── app/
│   │   ├── components/
│   │   ├── services/
│   │   ├── models/
│   │   └── ...
│   │
│   ├── assets/
│   └── styles.css
│
├── courier-backend/
│   ├── main.py
│   ├── models/
│   ├── routers/
│   ├── schemas/
│   ├── database/
│   ├── requirements.txt
│   └── ...
│
├── angular.json
├── package.json
├── tsconfig.json
├── .gitignore
└── README.md
```

---

# 💻 Installation and Setup

## Prerequisites

Install the following before running the project:

* Node.js
* npm
* Angular CLI
* Python
* MySQL
* Git
* Visual Studio Code

---

## 1. Clone the Repository

```bash
git clone https://github.com/priya29-hash/courier-management-system.git```

Move into the project directory:

```bash
cd courier-management
```

---

## 2. Frontend Setup

Install the required dependencies:

```bash
npm install
```

Start the Angular development server:

```bash
ng serve
```

Open the application in your browser:

```text
http://localhost:4200
```

---

## 3. Backend Setup

Open a new terminal and move into the backend directory:

```bash
cd courier-backend
```

Create a Python virtual environment:

```bash
python -m venv venv
```

Activate the virtual environment on Windows:

```bash
venv\Scripts\activate
```

Install the required Python packages:

```bash
pip install -r requirements.txt
```

Start the FastAPI server:

```bash
uvicorn main:app --reload
```

The backend will run at:

```text
http://127.0.0.1:8000
```

FastAPI interactive documentation:

```text
http://127.0.0.1:8000/docs
```

---

# 🗃️ Database Configuration

Create a MySQL database for the application.

Example database configuration:

```text
Database Name: courier_management
Host: localhost
Port: 3306
Username: your_mysql_username
Password: your_mysql_password
```

Update the backend database configuration according to your local MySQL setup.

**Never upload your real database password or other sensitive credentials to GitHub.**

---

# 🔐 Security

Sensitive information such as:

* Database passwords
* API keys
* Secret keys
* Authentication credentials

should not be hardcoded or committed to GitHub.

Use environment variables or a local configuration file that is excluded through `.gitignore`.

---

# 🌐 Application URLs

### Angular Frontend

```text
http://localhost:4200
```

### FastAPI Backend

```text
http://127.0.0.1:8000
```

### FastAPI Swagger Documentation

```text
http://127.0.0.1:8000/docs
```

---

# 🔮 Future Enhancements

The system can be extended with:

* Role-Based Access Control
* Real-Time GPS Shipment Tracking
* QR Code and Barcode Scanning
* Email Notifications
* SMS Notifications
* Automated Delivery Notifications
* Advanced Analytics
* AI-Based Delivery Time Prediction
* Route Optimization
* Mobile Application
* Cloud Deployment
* Automated Reports

---

# 🎓 Academic Project

This project was developed as an academic full-stack software development project to demonstrate the practical implementation of:

* Frontend development
* Backend development
* RESTful API development
* Database management
* CRUD operations
* Authentication
* Data visualization
* Git and GitHub version control

---

# 👩‍💻 Author

**Priya Dharshini**

Computer Science and Engineering
University College of Engineering, Arni

### GitHub

```text
https://github.com/priya29-hash
```

### Repository

```text
https://github.com/priya29-hash/courier-management
```

---

# 📄 License

This project is developed for academic and educational purposes.
