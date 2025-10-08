🏥 Medical Record System

The Medical Record System is a secure, interactive platform designed to store and manage patient medical records and health data efficiently. It bridges the gap between patients and hospitals, ensuring smooth data sharing with strong authentication and patient consent.
🌟 Features

✅ Patient Medical Records – Store and manage patient health data securely.
📄 Medical Report Upload & View – Patients and hospitals can upload, view, and manage reports.
🔐 Patient Confirmation for Hospital Uploads – Hospitals can only upload a patient’s report upon patient approval, ensuring privacy and consent.
🖼️ Image/File Uploads – Upload medical images and documents with ease.
💬 Secure Authentication – User data protected using JWT and bcrypt.
⚙️ Docker Integration – Easily containerized for fast deployment and scalability.

🚀 How It Works

1️⃣ User Registration – Patients and hospitals sign up with secure authentication.
2️⃣ Patient Record Creation – Patients can upload and manage their medical records.
3️⃣ Hospital Upload Requests – Hospitals request permission before uploading patient reports.
4️⃣ Patient Approval – Patients review and approve uploads before they appear in their record.
5️⃣ View & Manage Reports – Both patients and hospitals can view authorized reports anytime.

🧠 Tech Stack
💻 Frontend

React

Tailwind CSS

⚙️ Backend

Node.js

Express.js

MongoDB

🧰 Tools & Libraries

🔐 JWT – For authentication and authorization
🗂️ Multer – For handling file uploads
🐋 Docker – For containerization and easy deployment
🧩 bcrypt – For secure password hashing

🐳 Running the Application with Docker
Clone the repository
git clone git@github.com:sayooj45/medicalRecordSystem.git
cd medicalRecordSystem

Build & Run the containers
docker compose up --build

Stop the containers
docker compose down

Check running containers
docker ps

🎥 Demo Video

https://drive.google.com/file/d/1Iq4JxtC0YKbHTmanxNFNnVge95LXjT7w/view?usp=drive_link

📌 Summary

The Medical Record System ensures secure, consent-based, and accessible medical record management for both patients and hospitals.
It combines modern web technologies with robust backend logic to simplify healthcare data handling.
