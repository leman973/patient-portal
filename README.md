# 🏥 Patient Appointment & Management Portal  

> A Full-Stack MERN Application for Booking and Managing Medical Appointments

---

## 📌 Project Description  

The "Patient Appointment & Management Portal" is a full-stack web application developed using the MERN stack.  
It enables patients to book, manage, and cancel medical appointments, while allowing administrators to manage doctors and control appointment statuses efficiently.

The system ensures secure authentication, cloud-based image storage, and structured role-based access control.

---

## 🚀 Features  

### 👤 Patient Functionalities
- Secure Registration & Login  
- Edit Profile Details  
- View Doctors by Speciality  
- View Doctor Qualification & Experience  
- Book Appointment (Doctor, Date, Batch, Time Slot)  
- View Booked Appointments  
- Cancel Appointments  
- View Top Experienced Doctors (Home Page)  
- View User Feedback (About Page)  

### 🛡️ Admin Functionalities
- Secure Admin Login  
- Add Doctor Records  
- Delete Doctor Records  
- View All Appointments  
- Update Appointment Status:
  - ✅ Completed  
  - ❌ Cancelled  
  - 🔄 Active  

---

## 🛠️ Tech Stack  

### 💻 Frontend
- React.js  
- HTML5  
- CSS3  
- Bootstrap  
- Axios  

### ⚙️ Backend
- Node.js  
- Express.js  

### 🗄️ Database
- MongoDB Atlas (Cloud Database)  
- Mongoose ODM  

### ☁️ Cloud Services
- Cloudinary (Doctor and User Image Storage)  

### 🔐 Authentication & Security
- JSON Web Token (JWT)  
- Role-Based Access Control  
- Protected Routes Middleware  

### 🧰 Development Tools
- Visual Studio Code  
- Postman  
- Git & GitHub  

---

## 🏗️ System Architecture  

The application follows a **Client-Server Architecture**:

- React frontend communicates with Express backend via REST APIs.
- Backend handles authentication, authorization, and business logic.
- MongoDB Atlas stores user, doctor, and appointment data.
- Cloudinary stores and manages doctor images securely.

---

## 📂 Project Structure  

```
patient-portal/
│
├── backend/
│   ├── Controllers/
│   ├── Models/
│   ├── Routes/
│   ├── Middlewares/
│   ├── Config/
│   └── index.js
│
├── frontend/
│   ├── src/
│   ├── components/
│   ├── pages/
│   └── App.jsx
│
└── README.md
```

---

## ⚙️ Installation & Setup  

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/leman973/patient-portal.git
cd patient-portal
```

---

### 2️⃣ Install Dependencies

#### Backend

```bash
cd backend
npm install
```

#### Frontend

```bash
cd frontend
npm install
```

---

### 3️⃣ Setup Environment Variables

Create a `.env` file inside the **backend** folder and add:

```
PORT=8080
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret_key

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

---

### 4️⃣ Run Backend Server

```bash
cd backend
npm start
```

Backend runs at:

```
http://localhost:8080
```

---

### 5️⃣ Run Frontend

```bash
cd frontend
npm run dev
```

Frontend runs at:

```
http://localhost:5173
```

---

## 🔒 Security Features  

- JWT-based Authentication  
- Role-Based Authorization (Admin / Patient)  
- Protected API Routes  
- Secure Cloud Image Upload  
- Token Verification Middleware  

---

## 📸 Key Highlights  

✔ Full MERN Stack Implementation  
✔ Cloud Database Integration  
✔ Cloud Image Storage  
✔ Role-Based Access Control  
✔ Real-Time Appointment Management  
✔ Responsive User Interface  

---

## 🎯 Learning Outcomes  

- Full-Stack MERN Development  
- REST API Development  
- Authentication & Authorization Implementation  
- MongoDB Atlas Integration  
- Cloudinary Integration  
- Real-world Project Architecture  

---

## 🔮 Future Enhancements  

- Online Payment Integration  
- Email/SMS Appointment Notifications  
- Appointment Rescheduling Feature  
- Doctor Dashboard Panel

## 👨‍💻 Authors

- Amal Sajan Manjapallil  
- Vaibhav Dilip Jadhav


---

