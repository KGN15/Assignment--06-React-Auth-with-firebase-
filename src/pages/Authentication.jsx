import { useState } from "react";
import '../style/auth.css'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../service/firebase.service";
import { setDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


// Inline SVG icons to avoid FontAwesome dependency issues
const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
  </svg>
);

const GithubIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
  </svg>
);



const EyeIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
  </svg>
);

const EyeOffIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" /><line x1="1" y1="1" x2="23" y2="23" />
  </svg>
);

export default function Authentication() {
  const [isActive, setIsActive] = useState(false);
  const [showSignInPass, setShowSignInPass] = useState(false);
  const [showSignUpPass, setShowSignUpPass] = useState(false);
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const navigate = useNavigate()
  const [loding, setLoding] = useState(false)


  const handleSignUp = async (e) => {
    e.preventDefault()
    setLoding(true)

    try {

      await createUserWithEmailAndPassword(auth, email, password)
      const user = auth.currentUser
      console.log("User created:", user)
      console.log("User signed up successfully with email:", email);

      if (user) {
        await setDoc(doc(db, "users", user.uid), {
          name,
          email: user.email,
          uid: user.uid
        });
      }

      toast.success("Account created successfully! You can now sign in.", {
        position: "top-center"
      })

      navigate("/profile")

    } catch (error) {
      console.error("Error signing up:", error
      )
      toast.error(error.message || "Error creating account. Please try again.", {
        position: "top-center"
      })
    } finally {
      setLoding(false)
    }

  }
  const handleSignIn = async (e) => {
    e.preventDefault()
    setLoding(true)

    try {
      await signInWithEmailAndPassword(auth, email, password)
      const user = auth.currentUser
      console.log("User signed in:", user)
      toast.success("Signed in successfully!", {
        position: "top-center"
      })
      navigate("/profile")

    } catch (error) {
      console.error("Error signing in:", error)
      toast.error(error.message || "Error signing in. Please try again.", {
        position: "top-center"
      })
    } finally {
      setLoding(false)
    }


  }

  if (loding) {
    return (
      <div className="premium-loader">
        <div className="loader-content">
          <div className="spinner">
            <div></div><div></div><div></div><div></div>
          </div>
          <h2>Loading...</h2>
        </div>
      </div>
    )
  }
  return (
    <div>




      <div className="auth-wrapper">
        <div className={`card${isActive ? " active" : ""}`}>

          {/* ── Sign Up ── */}
          <form className="form-panel sign-up-panel" onSubmit={handleSignUp}>
            <div className="form-inner">
              <h1>Create Account</h1>
              <div className="social-row">
                <a href="#" className="social-btn" title="Google"><GoogleIcon /></a>
                <a href="#" className="social-btn" title="GitHub"><GithubIcon /></a>
              </div>
              <div className="divider">or use your email</div>
              <div className="input-wrap"><input type="text" required placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} /></div>
              <div className="input-wrap"><input type="email" required placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} /></div>
              <div className="input-wrap">
                <input type={showSignUpPass ? "text" : "password"} required placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button className="eye-toggle" type="button" onClick={() => setShowSignUpPass(p => !p)}>
                  {showSignUpPass ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>
              <button className="btn-primary" type="submit">Sign Up</button>
              <div className="mobile-switch">
                <span className="mobile-switch-text">Already have an account?
                  <button onClick={() => setIsActive(false)}>Sign In</button>
                </span>
              </div>
            </div>
          </form>

          {/* ── Sign In ── */}
          <form onSubmit={handleSignIn} className="form-panel sign-in-panel">
            <div className="form-inner">
              <h1>Welcome Back</h1>
              <div className="social-row">
                <a href="#" className="social-btn" title="Google"><GoogleIcon /></a>
                <a href="#" className="social-btn" title="GitHub"><GithubIcon /></a>

              </div>
              <div className="divider">or use your email</div>
              <div className="input-wrap"><input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email Address" /></div>
              <div className="input-wrap">
                <input type={showSignInPass ? "text" : "password"} required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                <button className="eye-toggle" type="button" onClick={() => setShowSignInPass(p => !p)}>
                  {showSignInPass ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>
              <a href="#" className="forgot">Forgot your password?</a>
              <button className="btn-primary" type="submit">Sign In</button>
              <div className="mobile-switch">
                <span className="mobile-switch-text">Don't have an account?
                  <button onClick={() => setIsActive(true)}>Sign Up</button>
                </span>
              </div>
            </div>
          </form>

          {/* ── Toggle Overlay ── */}
          <div className="toggle-overlay">
            <div className="toggle-track">
              {/* Left panel (shown when active = sign-up mode) */}
              <div className="toggle-panel toggle-left">
                <h2>Welcome Back!</h2>
                <p>Already have an account? Sign in to continue your journey.</p>
                <button className="btn-ghost" onClick={() => setIsActive(false)}>Sign In</button>
              </div>
              {/* Right panel (default, sign-in mode) */}
              <div className="toggle-panel toggle-right">
                <h2>Hello, Friend!</h2>
                <p>Join us today and unlock access to all features on our platform.</p>
                <button className="btn-ghost" onClick={() => setIsActive(true)}>Sign Up</button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
