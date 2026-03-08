import { useState } from "react";
import '../style/auth.css'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword,  updateProfile } from "firebase/auth";
import { auth, db } from "../service/firebase.service";
import { setDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import SigninWithGoogle from "../components/signinWithGoogle";
import SigninWithGithub from "../components/SigninWithGithub";


// Inline SVG icons to avoid FontAwesome dependency issues






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

      await updateProfile(user,{
        displayName: name
      })

      if (user) {
        await setDoc(doc(db, "users", user.uid), {
          name,
          email: user.email,
          uid: user.uid,
          photoURL: user.photoURL || null,
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
                <SigninWithGoogle />
               <SigninWithGithub />
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
                <SigninWithGoogle />
                <SigninWithGithub />

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
