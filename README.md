

# 🔗 URL Shortener with Authentication

A **secure URL Shortener backend** built with **Node.js**, **Express**, and **Drizzle ORM**.
It allows users to **sign up, log in, shorten URLs, fetch their codes, and redirect** to original links.
Authentication is handled with **JWT tokens** and passwords are stored securely with **salt + hash**.

---

## 🚀 Features

* 👤 **User Authentication**

  * Sign up with email & password
  * Secure login with JWT-based authentication
* 🔑 **Protected Routes**

  * Only logged-in users can shorten URLs and fetch their codes
* 🔗 **URL Shortener**

  * Generate short codes for long URLs
  * Redirect to original URL using the short code
* 📂 **User-specific Data**

  * Each user can fetch only their own shortened URLs

---

## 🛠️ Tech Stack

* **Node.js** – Runtime
* **Express.js** – Web framework
* **Drizzle ORM** – Database ORM
* **PostgreSQL / MySQL / SQLite** – Database (choose your setup)
* **nanoid** – Unique short code generator
* **JWT** – Authentication
* **Zod** – Schema validation

---

## 📂 Project Structure

```
URL_shortner/
│── src/
│   ├── db/               # Database connection (Drizzle setup)
│   ├── middleware/       # Auth middleware
│   ├── models/           # Drizzle models (user, url)
│   ├── routes/           # Express routes (auth, url)
│   ├── services/         # Business logic
│   ├── utils/            # Hashing, token generation
│   ├── validation/       # Request validation schemas (Zod)
│   └── index.js          # Entry point
│
│── package.json
│── README.md
```

---

## ⚡ Installation & Setup

1. Clone the repository

   ```bash
   git clone https://github.com/ANJAN-75/URL_shortner.git
   cd URL_shortner
   ```

2. Install dependencies

   ```bash
   npm install
   ```

3. Configure environment variables in **.env**

   ```env
   PORT=8000
   DATABASE_URL=your_database_url
   SECRET_KEY=your_jwt_secret
   ```

4. Run database migrations (if using Drizzle)

   ```bash
   npm run migrate
   ```

5. Start the server

   ```bash
   npm start
   ```

---

## 📌 API Endpoints

### 👤 Auth Routes

#### 1. Signup

```http
POST /auth/signup
```

**Request Body**

```json
{
  "firstname": "Anjan",
  "lastname": "Chakraborty",
  "email": "anjan@example.com",
  "password": "mypassword123"
}
```

**Response**

```json
{
  "data": {
    "userId": 1
  }
}
```

#### 2. Login

```http
POST /auth/login
```

**Request Body**

```json
{
  "email": "anjan@example.com",
  "password": "mypassword123"
}
```

**Response**

```json
{
  "token": "jwt_token_here"
}
```

---

### 🔗 URL Routes

(All require **Authorization: Bearer <token>**)

#### 1. Shorten URL

```http
POST /url/shorten
```

**Request Body**

```json
{
  "url": "https://example.com"
}
```

**Response**

```json
{
  "id": 10,
  "shortCode": "abc123",
  "targetURL": "https://example.com"
}
```

#### 2. Fetch User’s Codes

```http
GET /url/codes
```

**Response**

```json
{
  "codes": [
    {
      "id": 10,
      "shortCode": "abc123",
      "targetURL": "https://example.com"
    }
  ]
}
```

#### 3. Redirect

```http
GET /url/:shortCode
```

➡ Redirects to original URL

---

## 🧪 Example Workflow

1. **Signup** → Get `userId`
2. **Login** → Get `JWT token`
3. **Shorten a URL** → Returns short code
4. **Visit `/url/:shortCode`** → Redirects to original

---

## 🤝 Contributing

1. Fork the project
2. Create a new branch (`feature/my-feature`)
3. Commit changes
4. Push and open a Pull Request

---

## 📜 License

This project is licensed under the **MIT License**.

---


