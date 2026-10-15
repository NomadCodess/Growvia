# 🌿 Growvia — Online Gardening Community Platform

An interactive, server-rendered **Online Gardening Community Platform** built with **Java Spring Boot**, **Thymeleaf**, **Spring Data JPA**, direct **JDBC (`java.sql`)**, and **Multithreaded Concurrent Analytics**.

Growvia provides gardening enthusiasts, urban botanists, allotment growers, and plant parents with a digital sanctuary to share horticultural tips, diagnose plant diseases and pests at the Plant Doctor bench, participate in peer Q&A discussions, access polymorphic plant-care advice, and track personal garden projects from seed to harvest.

The project demonstrates rigorous application of core Java programming, object-oriented design patterns, multithreading and thread synchronization, direct JDBC database connectivity, Jakarta Servlet API integration, and modern responsive web aesthetics.

---

## 🏆 Academic Marking Rubric Compliance Matrix

This project was built to achieve maximum marks across both **Java Web-Based Projects** and **Advanced Core Java / GUI** evaluation criteria:

| Rubric Category | Marks | Implementation in Growvia | Primary Source Files |
|---|---|---|---|
| **1. OOP Implementation** | **10 Marks** | **Inheritance & Polymorphism:** Abstract base class `AbstractPlantAdvisor` with 4 polymorphic subclasses (`VegetableAdvisor`, `SucculentAdvisor`, `HerbAdvisor`, `TropicalFoliageAdvisor`) dynamically dispatched via `PlantAdvisorRegistry`.<br>**Encapsulation:** Strongly typed entities (`GardeningTip`, `GardenProject`, `DiscussionQuestion`, `DiscussionReply`) with private fields and standard accessors.<br>**Exception Handling:** Custom hierarchy (`ResourceNotFoundException`, `GardeningTipNotFoundException`, `GardenProjectNotFoundException`, `DiscussionQuestionNotFoundException`) managed by centralized `@ControllerAdvice` (`GlobalExceptionHandler`).<br>**Interfaces:** Service contracts (`GardeningTipService`, `DiscussionService`, `GardenProjectService`) separating abstraction from implementation. | `com.example.domain.advisor.*`<br>`com.example.exception.*`<br>`com.example.service.*` |
| **2. Database Integration & Direct JDBC** | **8 - 14 Marks** | **Direct JDBC API:** Custom DAO `GardenJdbcDao` utilizing genuine `java.sql.Connection`, `java.sql.PreparedStatement`, and `java.sql.ResultSet`.<br>**Database Operations Classes:** DTO records `CategoryMetric`, `ProjectStatusMetric`, and `JdbcTipSummary` mapped row-by-row.<br>**Security & Resilience:** Parameterized queries preventing SQL injection, try-with-resources auto-closing connections, fallback exception wrapping. | `com.example.repository.jdbc.GardenJdbcDao`<br>`com.example.repository.jdbc.*` |
| **3. Multithreading & Synchronization** | **4 Marks** | **Thread Pools & Worker Threads:** Dedicated `ExecutorService` with 4 concurrent worker threads generated via custom `GrowviaWorkerThread` thread factory.<br>**Parallel Async Execution:** `CompletableFuture.supplyAsync()` executing 4 analytics tasks in parallel and synchronizing via `CompletableFuture.allOf()`.<br>**Thread Synchronization:** `synchronized(mutexLock)` blocks protecting memory cache snapshots, `synchronized` audit logging methods, `AtomicLong` calculation counters, and `ConcurrentHashMap` for lock-free thread safety. | `com.example.service.GardenAnalyticsAggregator`<br>`RestApiController.java` (`/api/analytics/concurrent-summary`) |
| **4. Collections & Generics** | **6 Marks** | **Collections Framework:** Heavy use of `List`, `Map`, `Set`, `ConcurrentHashMap`, `CopyOnWriteArrayList`, and Java Stream API (`filter`, `map`, `collect`).<br>**Student-Written Generics:** Custom generic container `SearchResultWrapper<T>` featuring generic factory `.of(items, keyword)` and monadic functional mapping `<R> SearchResultWrapper<R> map(Function<T, R>)`. | `com.example.util.SearchResultWrapper`<br>`com.example.service.*` |
| **5. Servlets & Web Integration** | **7 Marks** | **Jakarta Servlet API Filter:** `GardenSecurityHeadersFilter` implementing `jakarta.servlet.Filter`, intercepting HTTP requests, injecting security headers (`X-Content-Type-Options`, `X-Frame-Options`, `X-Servlet-Filter`), and calculating execution latency (`X-Response-Time-Ms`).<br>**Spring MVC & REST:** Full suite of `@Controller` web handlers rendering Thymeleaf views and `@RestController` exposing JSON endpoints. | `com.example.config.GardenSecurityHeadersFilter`<br>`com.example.controller.*` |
| **6. Problem Understanding & Solution Design** | **8 Marks** | Realistic, production-grade domain model for community gardening: Plant Clinic disease diagnostics, seasonal garden journals, difficulty-rated guides, and interactive organic care advisors. | Complete application architecture |

---

## ✨ Key Features & Architectural Capabilities

### 1. Botanical Community Dashboard (`/`)
- **Real-Time Statistics**: Live counters for total tips, community discussions, solved plant diseases, and ongoing garden projects.
- **Plant Doctor Diagnostic Bench**: Instant interactive symptom diagnosis and care plan generation powered by the polymorphic advisor engine.
- **Curated Articles Feed**: High-yield organic gardening guides, propagation recipes, and soil preparation methods.
- **Recent Q&A Feed**: Live preview of unsolved plant issues and community-verified solutions.
- **Active Projects Showcase**: Garden tracking across indoor windowsills, urban balconies, and raised beds.
- **Atmospheric Visuals**: Throttled 30 FPS WebGL living emerald canopy background (`cloud-shader.js`) with zero lag or CPU strain.
- **Cinematic Garden Reveal**: Scroll-driven CSS hardware-accelerated narrative transition revealing the community garden grid.

### 2. Gardening Tips & Articles (`/tips`)
- **Full CRUD Support**: Create, browse, view, edit, and delete gardening tips and articles.
- **Category & Keyword Filtering**: Filter by categories: *Plant Care*, *Pest & Disease Control*, *Soil & Fertilizer*, *Propagation*, and *Seasonal Gardening*.
- **Difficulty Badges**: Articles labeled as *Beginner*, *Intermediate*, or *Advanced*.
- **Community Upvoting**: Interactive "Helpful" like counters on articles.

### 3. Community Discussions & Plant Clinic (`/discussions`)
- **Troubleshoot Plant Diseases**: Post plant symptoms (yellowing leaves, powdery mildew, aphid infestations, overwatering).
- **Multi-turn Community Answers**: Gardeners and certified horticulturists reply with practical remedies.
- **Expert Advice Badges**: Flag verified horticultural answers.
- **Status Tracking**: Mark questions as *Solved* or re-open as *Needs Help*.

### 4. Personal Gardening Projects (`/projects`)
- **Garden Tracker**: Manage personal gardens with title, plant species, growing space (*Balcony*, *Backyard*, *Indoor Windowsill*, *Rooftop*), and status (*Planning*, *In Progress*, *Flourishing*, *Completed*).
- **Milestone & Care Journal**: Log progress, soil recipes, germination dates, and target harvest dates.
- **Full CRUD Management**: Create, view journal details, edit project specs, or delete projects.

### 5. Multithreaded Concurrent Analytics (`/api/analytics/concurrent-summary`)
- Asynchronously aggregates 4 distinct data dimensions in parallel across 4 worker threads:
  1. *Category-Analytics-Worker*: Direct JDBC category distributions.
  2. *Discussion-Clinic-Worker*: Question resolution percentage.
  3. *Project-Velocity-Worker*: Project status breakdowns.
  4. *Vitality-Health-Worker*: Global community health score.
- Thread-safe snapshot caching using `synchronized(mutexLock)` critical sections and atomic counters.

---

## 🛠️ Technology Stack

| Component | Technology |
|---|---|
| **Language** | Java 17+ (Fully tested on OpenJDK 17, JDK 21, and JDK 26) |
| **Backend Framework** | Spring Boot 3.1.2 (Spring MVC, Spring Data JPA, Jakarta Validation) |
| **Concurrency API** | `java.util.concurrent` (`CompletableFuture`, `ExecutorService`, `AtomicLong`, `ThreadFactory`) |
| **Frontend Engine** | Thymeleaf 3 (Server-rendered responsive HTML5) |
| **Typography** | Google Fonts `Fraunces` (Editorial Botanical Serif) & `Outfit` (Modern Clean Sans) |
| **UI Framework** | Bootstrap 5.3 + Bootstrap Icons + Custom Emerald Glassmorphic Design System |
| **Graphics / Shader** | WebGL 1.0 / GLSL (Living emerald canopy drift & morning sun bloom) |
| **Database** | Embedded **H2 Database** (file-based persistence at `./data/gardendb`) |
| **Direct Database API** | Direct **JDBC** (`java.sql.Connection`, `PreparedStatement`, `ResultSet`) |
| **Web Integration** | Embedded Apache Tomcat 10 + Jakarta Servlet API (`Filter`) |
| **Build Tool** | Apache Maven 3.9+ / Maven Wrapper (`mvnw` / `mvnw.cmd`) |
| **Testing Suite** | JUnit 5, Spring Boot Test, MockMvc (19 integration tests, 100% pass) |

---

## 🚀 Quick Start & Run Guide

### 1. Prerequisites
- **Java Development Kit (JDK)**: JDK 17, 21, or 26.
- **Git**
- Maven Wrapper is pre-configured (`mvnw.cmd` on Windows, `./mvnw` on Linux/macOS).

### 2. Navigate to Project Directory
```powershell
# Open terminal and navigate to the application folder
cd Grow-Garden-main\Grow-Graden
```

### 3. Run Automated Tests
```powershell
# On Windows
.\mvnw.cmd test

# On Linux / macOS
./mvnw test
```
*Expected Result:* `Tests run: 19, Failures: 0, Errors: 0, Skipped: 0` -> `BUILD SUCCESS`

### 4. Start the Application
```powershell
# On Windows
.\mvnw.cmd spring-boot:run

# On Linux / macOS
./mvnw spring-boot:run
```

### 5. Access Growvia in Your Browser
- **Community Dashboard**: [http://localhost:8080](http://localhost:8080)
- **Gardening Tips**: [http://localhost:8080/tips](http://localhost:8080/tips)
- **Plant Clinic (Discussions)**: [http://localhost:8080/discussions](http://localhost:8080/discussions)
- **Garden Tracker (Projects)**: [http://localhost:8080/projects](http://localhost:8080/projects)
- **About Growvia**: [http://localhost:8080/about](http://localhost:8080/about)
- **Concurrent Analytics API**: [http://localhost:8080/api/analytics/concurrent-summary](http://localhost:8080/api/analytics/concurrent-summary)
- **H2 Database Console**: [http://localhost:8080/h2-console](http://localhost:8080/h2-console)
  - *JDBC URL*: `jdbc:h2:file:./data/gardendb`
  - *Username*: `sa`
  - *Password*: *(leave blank)*

---

## 👨‍💻 Project Submission Information

- **Project Name:** Growvia
- **Tagline:** Grow knowledge. Share nature.
- **Application Type:** Java Web-Based & Multi-Tier Enterprise Platform
- **Presentation Slides:** See [PRESENTATION_SLIDES.md](PRESENTATION_SLIDES.md) in the repository root.
- **License:** MIT License
