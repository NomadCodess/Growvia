# 🌿 Growvia — Online Gardening Community Platform

### 🌱 Grow Knowledge. Share Nature.

**Growvia** is a full-stack, Java-based gardening community platform designed to connect plant enthusiasts, beginners, and experienced gardeners.

It provides an interactive environment where users can share gardening knowledge, explore plant-care techniques, discuss gardening challenges, diagnose common plant problems, and manage their gardening projects.

Built using **Java, Spring Boot, Thymeleaf, Spring Data JPA, JDBC, and H2 Database**, Growvia combines modern web development with core Java concepts, including Object-Oriented Programming, Multithreading, Collections, Generics, and Exception Handling.

---

## 📌 Project Overview

Gardening enthusiasts often struggle to find reliable plant-care information, identify plant diseases, and connect with experienced gardeners.

Growvia addresses these challenges by providing a centralized platform where users can:

- 🌱 Discover gardening tips and techniques.
- 🌿 Share knowledge with fellow gardening enthusiasts.
- 🩺 Identify common plant problems and explore care recommendations.
- 💬 Participate in gardening discussions.
- 📊 Track personal gardening projects.
- 🌻 Explore sustainable and organic gardening practices.

The platform aims to make gardening more accessible, interactive, and enjoyable.

---

## ✨ Key Features

### 🌿 1. Gardening Community Dashboard
- Interactive and responsive homepage.
- Overview of gardening activities.
- Gardening articles and community discussions.
- Real-time statistics and project summaries.

### 📚 2. Gardening Tips & Articles
- Create, read, update, and delete gardening tips.
- Search articles using keywords.
- Filter content by gardening categories.
- Explore beginner, intermediate, and advanced gardening guides.
- Like helpful gardening articles.

### 🩺 3. Plant Doctor
- Explore solutions for common plant diseases.
- Identify potential plant problems based on symptoms.
- Receive plant-care recommendations.
- Access specialized advice for different plant categories.

### 💬 4. Community Discussions
- Ask gardening-related questions.
- Share solutions and experiences.
- Reply to community discussions.
- Track resolved and unresolved questions.

### 🌻 5. Personal Garden Tracker
- Create and manage gardening projects.
- Track plant growth and gardening progress.
- Maintain gardening journals.
- Update project milestones and completion status.

### 📊 6. Concurrent Analytics
- Generate gardening community statistics.
- Process multiple analytics tasks using Java multithreading.
- Use thread synchronization for safe concurrent operations.
- Analyze gardening tips, discussions, and project activities.

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| Java 17+ | Core programming language |
| Spring Boot | Backend application framework |
| Spring MVC | Web request handling |
| Thymeleaf | Dynamic HTML rendering |
| HTML5 | Webpage structure |
| CSS3 | Styling and responsive design |
| JavaScript | Frontend interactivity |
| Bootstrap 5 | Responsive UI components |
| Spring Data JPA | Database operations |
| JDBC | Direct database connectivity |
| H2 Database | Data storage |
| Maven | Dependency management |
| JUnit 5 | Application testing |
| Git & GitHub | Version control |

---

## 🧠 Core Java Concepts Implemented

Growvia demonstrates practical implementation of important Java programming concepts.

**Object-Oriented Programming**
- Encapsulation
- Inheritance
- Polymorphism
- Abstraction
- Interfaces

**Multithreading**
- ExecutorService
- CompletableFuture
- Thread synchronization
- Concurrent collections

**Database Connectivity**
- JDBC
- PreparedStatement
- ResultSet
- CRUD operations

**Additional Concepts**
- Java Collections Framework
- Generics
- Exception Handling
- REST APIs
- MVC Architecture

---

## 🏗️ Project Architecture

Growvia follows a layered architecture:

```text
                 USER
                   |
                   v
            FRONTEND LAYER
       HTML | CSS | JavaScript
              Thymeleaf
                   |
                   v
           CONTROLLER LAYER
              Spring MVC
                   |
                   v
             SERVICE LAYER
             Business Logic
                   |
                   v
           REPOSITORY LAYER
          Spring Data JPA
              JDBC DAO
                   |
                   v
             H2 DATABASE
```

This architecture separates user interfaces, application logic, and database operations for better maintainability.

---

## 🚀 Installation & Setup

### Prerequisites

Make sure you have installed:

- Java JDK 17 or higher
- Git
- VS Code, IntelliJ IDEA, or another Java IDE

### Step 1: Clone the Repository

```bash
git clone https://github.com/NomadCodess/Growvia.git
```

### Step 2: Navigate to the Project

```bash
cd Growvia
```

### Step 3: Run the Application

**Windows:**

```bash
.\mvnw.cmd spring-boot:run
```

**Linux / macOS:**

```bash
./mvnw spring-boot:run
```

### Step 4: Open the Application

Visit:

`http://localhost:8080`

---

## 🌐 Application Pages

| Page | Route |
|---|---|
| Home | `/` |
| Gardening Tips | `/tips` |
| Community Discussions | `/discussions` |
| Garden Projects | `/projects` |
| About | `/about` |
| Analytics API | `/api/analytics/concurrent-summary` |

---

## 🎯 Project Objectives

The main objectives of Growvia are:

1. Build an interactive online gardening community.
2. Provide accessible gardening information.
3. Encourage knowledge sharing among gardening enthusiasts.
4. Help users identify and manage common plant problems.
5. Enable users to organize and track gardening projects.
6. Demonstrate practical implementation of Java and Spring Boot.
7. Develop a responsive, user-friendly web application.

---

## 🔮 Future Enhancements

Potential future improvements include:

- 🤖 AI-powered plant disease detection.
- 📸 Image-based plant identification.
- 🔐 User authentication and personalized profiles.
- 🌦️ Weather-based gardening recommendations.
- 🔔 Plant watering and maintenance reminders.
- 📱 Mobile application support.
- 🌍 Multilingual gardening resources.

---

## 📚 Learning Outcomes

Developing Growvia provides practical experience in:

- Full-stack Java web development.
- Spring Boot application development.
- Object-Oriented Programming.
- Database design and management.
- RESTful API development.
- Multithreading and synchronization.
- Responsive frontend development.
- Git and GitHub version control.

---

## 📄 License

This project is licensed under the MIT License.

---

## ⭐ Support

If you find Growvia interesting or useful, consider giving the repository a ⭐ on GitHub!

**🌱 Growvia — Grow Knowledge. Share Nature.**
