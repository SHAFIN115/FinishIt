
# ✅ FinishIt - ToDo App

FinishIt is a `simple yet powerful ToDo application` designed to help you stay organized and productive.
You can create, manage, and track your daily tasks with ease.

---

## 🚀 Features

* Add, edit, and delete tasks
* Mark tasks as complete/incomplete
* Organize tasks with categories
* Persistent storage with database
* Modern UI with responsive design
* Dockerized for easy setup

---

## 🛠️ Tech Stack

**Backend**

* Node.js + Express
* MySQL (with Docker)
* **Prisma ORM**
* JWT Authentication (if enabled)

**Frontend**

* React (Vite) / Next.js *(planned)*
* Tailwind CSS + shadcn/ui
* React Query & Zustand (state management)

**DevOps**

* Docker Compose (for local DB)
* GitHub for version control

---

## 📂 Project Structure

```plaintext
FinishIt/
│── backend/                # Node.js backend
│   ├── routes/             # API routes
│   ├── controllers/        # Business logic
│   ├── prisma/             # Prisma schema & migrations
│   │    ├── schema.prisma  # Database models
│   │    └── migrations/    # Migration history (auto-created by Prisma)
│   ├── src/                
│   │    └── generated/     # Prisma client code (auto-generated)
│   ├── .env                # Local environment variables
│   └── docker-compose.yml  # MySQL Docker setup
│
│── frontend/               # React frontend (coming soon)
│── README.md               # Project documentation
```

---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/SHAFIN115/FinishIt.git
cd FinishIt
```

---

### 2. Backend Setup

```bash
cd backend
npm install
```

---

### 3. Configure Environment

Create a `.env` file inside **backend/**:

```env
PORT=5000
DATABASE_URL="mysql://myuser:mypassword@localhost:3307/myappdb"
JWT_SECRET=mysecret
```

---

### 4. Run MySQL with Docker

```bash
docker-compose up -d
```

---

### 5. Create/Update Database Tables with Prisma

1. **If no migrations folder exists (first setup)**:

```bash
npx prisma migrate dev --name init
```

2. **Add new tables later**:

* Update `schema.prisma` with new models.
* Run:

```bash
npx prisma migrate dev --name add_table_name
npx prisma generate
```

---

### 6. Start Backend

```bash
node app.js
```

API should be running at:
👉 `http://localhost:5000`

---

### 7. Optional: Prisma Studio

Inspect your database visually:

```bash
npx prisma studio
```

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you’d like to change.

---
