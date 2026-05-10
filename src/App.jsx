import { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useParams,
  useNavigate,
} from "react-router-dom";


const users = {
  1: { name: "Alice", age: 24, job: "Designer" },
  2: { name: "Bob", age: 30, job: "Developer" },
  3: { name: "Carol", age: 27, job: "Manager" },
};


function Navbar() {
  return (
    <nav style={styles.nav}>
      <span style={styles.logo}>⚛️ MyApp</span>
      <div style={styles.navLinks}>
        <Link to="/" style={styles.link}>Home</Link>
        <Link to="/about" style={styles.link}>About</Link>
      </div>
    </nav>
  );
}


function Home() {
 
  const navigate = useNavigate();

  return (
    <div style={styles.page}>
      <h1>🏠 Home Page</h1>
      <p>Welcome! Click a user card to visit their profile.</p>

      <div style={styles.cardGrid}>
        {Object.entries(users).map(([id, user]) => (
          <div key={id} style={styles.card}>
            <h2>{user.name}</h2>
            <p>{user.job}</p>
            {/* useNavigate in action — go to /user/1, /user/2, etc. */}
            <button style={styles.btn} onClick={() => navigate(`/user/${id}`)}>
              View Profile
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}


function About() {
  return (
    <div style={styles.page}>
      <h1>ℹ️ About Page</h1>
      <p>This app teaches React Router basics:</p>
      <ul>
        <li>✅ Client-side routing (no page reloads)</li>
        <li>✅ Static routes  →  / and /about</li>
        <li>✅ Dynamic routes →  /user/:id</li>
        <li>✅ useNavigate   →  go to page via button</li>
        <li>✅ useParams     →  read :id from the URL</li>
      </ul>
      <Link to="/" style={styles.backLink}>← Back to Home</Link>
    </div>
  );
}

function UserProfile() {
 
  const { id } = useParams();
  const navigate = useNavigate();

  const user = users[id]; // look up user by id

 
  if (!user) {
    return (
      <div style={styles.page}>
        <h1>❌ User not found</h1>
        <p>No user with ID "{id}" exists.</p>
        <button style={styles.btn} onClick={() => navigate("/")}>Go Home</button>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <h1>👤 User Profile</h1>

      {/* Show the raw URL so learners can see what useParams reads */}
      <p style={styles.urlHint}>
        Current URL: <code>/user/{id}</code> → <code>useParams()</code> gives us id = "{id}"
      </p>

      <div style={styles.profileCard}>
        <div style={styles.avatar}>{user.name[0]}</div>
        <h2>{user.name}</h2>
        <p>🎂 Age: {user.age}</p>
        <p>💼 Job: {user.job}</p>
      </div>

      <button style={styles.btn} onClick={() => navigate(-1)}>
        ← Go Back
      </button>
    </div>
  );
}


export default function App() {
  return (
   
    <BrowserRouter>
      <Navbar />

      {/* Routes picks the FIRST matching route and renders it */}
      <Routes>
        <Route path="/"        element={<Home />} />
        <Route path="/about"   element={<About />} />
        <Route path="/user/:id" element={<UserProfile />} />   {/* :id is dynamic */}
      </Routes>
    </BrowserRouter>
  );
}


const styles = {
  
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "16px 32px",
    backgroundColor: "#20232a",
    color: "#fff",
  },
  logo: {
    fontSize: "20px",
    fontWeight: "bold",
  },
  navLinks: {
    display: "flex",
    gap: "24px",
  },
  link: {
    color: "#61dafb",
    textDecoration: "none",
    fontSize: "16px",
  },

  
  page: {
    maxWidth: "700px",
    margin: "40px auto",
    padding: "0 24px",
    fontFamily: "sans-serif",
  },

  
  cardGrid: {
    display: "flex",
    gap: "16px",
    marginTop: "24px",
    flexWrap: "wrap",
  },
  card: {
    border: "1px solid #ddd",
    borderRadius: "10px",
    padding: "20px",
    width: "180px",
    textAlign: "center",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
  },

  btn: {
    marginTop: "12px",
    padding: "8px 18px",
    backgroundColor: "#61dafb",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "bold",
  },

  
  backLink: {
    display: "inline-block",
    marginTop: "20px",
    color: "#61dafb",
    textDecoration: "none",
    fontSize: "15px",
  },

  
  urlHint: {
    backgroundColor: "#f0f4ff",
    border: "1px solid #c0d0ff",
    borderRadius: "6px",
    padding: "10px 14px",
    fontSize: "14px",
    color: "#333",
  },
  profileCard: {
    border: "1px solid #ddd",
    borderRadius: "12px",
    padding: "30px",
    marginTop: "20px",
    textAlign: "center",
    boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
  },
  avatar: {
    width: "70px",
    height: "70px",
    borderRadius: "50%",
    backgroundColor: "#20232a",
    color: "#61dafb",
    fontSize: "32px",
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 16px",
  },
};
