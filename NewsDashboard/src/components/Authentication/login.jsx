import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';
import { supabase } from "../../lib/supabase";
import { HugeiconsIcon } from "@hugeicons/react";
import { Mail01Icon, LockPasswordIcon, ViewIcon, ViewOffIcon } from "@hugeicons/core-free-icons";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    try {
      setLoading(true);

      

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        alert(error.message);
        return;
      }

      console.log("Login Success:", data);

      // session user
      const user = data?.user;

      if (!user) {
        alert("User not found");
        return;
      }

      // Optional: fetch role from profiles table
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

      if (profileError) {
        console.log(profileError.message);
      }

      if (profile?.role === "admin") {
        // alert("Welcome Admin");
        // navigate("/admin-dashboard");
      } else {
        // alert("Welcome User");
        navigate("/dashboard");
      }

    } catch (err) {
      console.log(err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-shell">
      <div className="login-card">
        <section className="login-left-panel">
          <h1>WELCOME BACK!</h1>
          <p>
            Continue where you left off and explore your personalized news dashboard.
          </p>
        </section>

        <section className="login-right-panel">
          <h2>Sign In</h2>

          <form className="login-form" onSubmit={handleLogin}>
            <label className="input-row" htmlFor="login-email">
              <span>Email</span>
              <HugeiconsIcon
                className="field-icon"
                icon={Mail01Icon}
                size={24}
                strokeWidth={2}
                absoluteStrokeWidth
              />
              <input
                id="login-email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>

            <label className="input-row" htmlFor="login-password">
              <span>Password</span>
              <HugeiconsIcon
                className="field-icon"
                icon={LockPasswordIcon}
                size={24}
                strokeWidth={2}
                absoluteStrokeWidth
              />
              <div className="password-input-wrap">
                <input
                  className={password.length > 0 ? "has-visibility-toggle" : ""}
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {password.length > 0 && (
                  <button
                    type="button"
                    className="visibility-btn"
                    onClick={() => setShowPassword((prev) => !prev)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    aria-pressed={showPassword}
                  >
                    <HugeiconsIcon
                      className="field-icon"
                      icon={showPassword ? ViewIcon : ViewOffIcon}
                      size={22}
                      strokeWidth={2}
                      absoluteStrokeWidth
                    />
                  </button>
                )}
              </div>
            </label>

            <button className="submit-btn" type="submit" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}

export default Login;