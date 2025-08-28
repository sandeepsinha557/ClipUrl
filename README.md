# 🔗 ClipURL – Secure URL Shortener  

A secure **URL Shortener** web application with full **JWT-based authentication** and **role-based authorization**.  
Users can shorten URLs, manage their links, and track analytics. Only authenticated users are allowed to create links.  

🚀 **Live Demo**: [ClipURL](https://clip-url-kappa.vercel.app/)  

---

## ✨ Features  

- 🔐 **Authentication & Authorization** – JWT-based login/signup with role-based access  
- ✂️ **URL Shortening** – Generate short links using [nanoid](https://github.com/ai/nanoid)  
- 📊 **Analytics Tracking** – Click count & last accessed timestamp  
- 🌐 **Redirection** – Fast lookup and redirect from short URL to original  
- 🛡 **Secure APIs** – Protected routes, password hashing, input validation  
- 🎨 **Frontend** – Server-side rendered using EJS templates  
- ☁️ **Deployment Ready** – Works with MongoDB Atlas and Render/Vercel  

---

## 🛠 Tech Stack  

- **Backend**: Node.js, Express.js  
- **Frontend**: EJS, CSS  
- **Database**: MongoDB (Mongoose ODM)  
- **Auth & Security**: JWT, bcrypt  
- **Other Libraries**: nanoid for shortId generation  

---
