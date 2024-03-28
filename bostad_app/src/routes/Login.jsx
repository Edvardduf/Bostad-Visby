import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '@/stores/store';
import ProtectedRoute from '@/components/ProtectedRoute';

function Login() {

    const navigate = useNavigate();

    const { setToken, token } = useAuthStore();
  
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");
  
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
  
    const [serverError, setServerError] = useState(""); // New state for server-side errors
  
    function validateEmail() {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!regex.test(email)) {
        setEmailError("It must be a correct email");
        return false;
      } else if (!email) {
        setEmailError("Email is required");
        return false;
      } else {
        setEmailError("");
        return true;
      }
    }
  
    function validatePassword() {
      if (!password) {
        setPasswordError("Password is required");
        return false;
      } else {
        setPasswordError("");
        return true;
      }
    }
  
    async function submitLogin(e) {
      e.preventDefault();
      setServerError(""); // Reset server error before each login attempt
      const isEmailValid = validateEmail();
      const isPasswordValid = validatePassword();
  
      if (isEmailValid && isPasswordValid) {
        const formData = new FormData();
        formData.append("username", email); // Use 'username' or 'email' as needed by your backend
        formData.append("password", password);
  
        try {
          const response = await fetch("http://localhost:8000/user/token", {
            method: "POST",
            body: formData,
          });
  
          if (response.status === 200) {
            const data = await response.json();
            setToken(data.access_token); // Save the token in the global state
            console.log(token);
            navigate("/admin");
            // Handle successful login, e.g., storing the access token
            console.log(data);
          } else if (response.status === 400 || response.status === 401) {
            const data = await response.json();
            setServerError(data.detail); // Set server error based on the response
          } else {
            console.log("Login Failed");
            setServerError(
              "An unexpected error occurred. Please try again later."
            );
          }
        } catch (error) {}
      } else {
        console.log("Validation errors");
      }
    }
  return (

    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8" style={{
      background:
        "linear-gradient(to bottom, #FFFFFF, #EBF5FB, #E8F8F5, #E8F6F3, #D0ECE7, #D1F2EB, #EAFAF1 )",
    }}>
    <div className="max-w-md w-full space-y-8">
    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.dev/svgjs" size-16 viewBox="0 0 2000 868"><g transform="matrix(1,0,0,1,-1.2121212121213603,0.9948029650253147)"><svg viewBox="0 0 396 172" data-background-color="#ffffff" preserveAspectRatio="xMidYMid meet" height="868" width="2000" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="tight-bounds" transform="matrix(1,0,0,1,0.24000000000003752,-0.19712685482068082)"><svg viewBox="0 0 395.5199999999999 172.39425370964136" height="172.39425370964136" width="395.5199999999999"><g><svg viewBox="0 0 395.5199999999999 172.39425370964136" height="172.39425370964136" width="395.5199999999999"><g transform="matrix(1,0,0,1,0,106.54656490700867)"><svg viewBox="0 0 395.5199999999999 65.84768880263267" height="65.84768880263267" width="395.5199999999999"><g id="textblocktransform"><svg viewBox="0 0 395.5199999999999 65.84768880263267" height="65.84768880263267" width="395.5199999999999" id="textblock"><g><svg viewBox="0 0 395.5199999999999 65.84768880263267" height="65.84768880263267" width="395.5199999999999"><g transform="matrix(1,0,0,1,0,0)"><svg width="395.5199999999999" viewBox="3.61 -37.5 289.31 48.17" height="65.84768880263267" data-palette-color="#111111"><path d="M16.58 0L3.61 0 3.61-35.55 15.8-35.55Q21.83-35.55 24.98-33.13 28.13-30.71 28.13-25.93L28.13-25.93Q28.13-23.49 26.81-21.53 25.49-19.58 22.95-18.51L22.95-18.51Q25.83-17.72 27.4-15.56 28.98-13.4 28.98-10.38L28.98-10.38Q28.98-5.37 25.77-2.69 22.56 0 16.58 0L16.58 0ZM17.16-16.04L9.79-16.04 9.79-4.93 16.65-4.93Q19.56-4.93 21.19-6.37 22.83-7.81 22.83-10.38L22.83-10.38Q22.83-15.92 17.16-16.04L17.16-16.04ZM9.79-30.57L9.79-20.58 15.84-20.58Q18.73-20.58 20.35-21.89 21.97-23.19 21.97-25.59L21.97-25.59Q21.97-28.22 20.47-29.39 18.97-30.57 15.8-30.57L15.8-30.57 9.79-30.57ZM33.47-13.16L33.47-13.45Q33.47-17.33 35.01-20.45 36.55-23.56 39.33-25.23 42.11-26.9 45.73-26.9L45.73-26.9Q51.07-26.9 54.4-23.46 57.74-20.02 58.01-14.33L58.01-14.33 58.03-12.94Q58.03-9.03 56.53-5.96 55.03-2.88 52.23-1.2 49.44 0.49 45.77 0.49L45.77 0.49Q40.18 0.49 36.83-3.23 33.47-6.96 33.47-13.16L33.47-13.16ZM39.4-12.94L39.4-12.94Q39.4-8.86 41.09-6.56 42.77-4.25 45.77-4.25 48.78-4.25 50.45-6.59 52.12-8.94 52.12-13.45L52.12-13.45Q52.12-17.46 50.4-19.8 48.68-22.14 45.73-22.14L45.73-22.14Q42.82-22.14 41.11-19.84 39.4-17.53 39.4-12.94ZM77.85-7.18L77.85-7.18Q77.85-8.76 76.55-9.59 75.24-10.42 72.21-11.06 69.18-11.69 67.16-12.67L67.16-12.67Q62.71-14.82 62.71-18.9L62.71-18.9Q62.71-22.31 65.6-24.61 68.48-26.9 72.92-26.9L72.92-26.9Q77.66-26.9 80.57-24.56 83.49-22.22 83.49-18.48L83.49-18.48 77.56-18.48Q77.56-20.19 76.29-21.33 75.02-22.46 72.92-22.46L72.92-22.46Q70.97-22.46 69.73-21.56 68.5-20.65 68.5-19.14L68.5-19.14Q68.5-17.77 69.65-17.02 70.8-16.26 74.29-15.49 77.78-14.72 79.77-13.66 81.76-12.6 82.72-11.11 83.69-9.62 83.69-7.5L83.69-7.5Q83.69-3.93 80.73-1.72 77.78 0.49 72.99 0.49L72.99 0.49Q69.75 0.49 67.21-0.68 64.67-1.86 63.25-3.91 61.84-5.96 61.84-8.33L61.84-8.33 67.6-8.33Q67.72-6.23 69.18-5.09 70.65-3.96 73.07-3.96L73.07-3.96Q75.41-3.96 76.63-4.85 77.85-5.74 77.85-7.18ZM90.35-32.84L96.28-32.84 96.28-26.42 100.94-26.42 100.94-22.02 96.28-22.02 96.28-7.28Q96.28-5.76 96.88-5.09 97.48-4.42 99.02-4.42L99.02-4.42Q100.04-4.42 101.09-4.66L101.09-4.66 101.09-0.07Q99.06 0.49 97.18 0.49L97.18 0.49Q90.35 0.49 90.35-7.06L90.35-7.06 90.35-22.02 86-22.02 86-26.42 90.35-26.42 90.35-32.84ZM127.31 0L121.25 0Q120.86-0.76 120.57-2.47L120.57-2.47Q117.74 0.49 113.64 0.49L113.64 0.49Q109.66 0.49 107.14-1.78 104.63-4.05 104.63-7.4L104.63-7.4Q104.63-11.62 107.77-13.88 110.9-16.14 116.74-16.14L116.74-16.14 120.38-16.14 120.38-17.87Q120.38-19.92 119.23-21.15 118.08-22.39 115.74-22.39L115.74-22.39Q113.71-22.39 112.42-21.37 111.12-20.36 111.12-18.8L111.12-18.8 105.19-18.8Q105.19-20.97 106.63-22.86 108.07-24.76 110.55-25.83 113.03-26.9 116.08-26.9L116.08-26.9Q120.72-26.9 123.48-24.57 126.24-22.24 126.31-18.02L126.31-18.02 126.31-6.1Q126.31-2.54 127.31-0.42L127.31-0.42 127.31 0ZM114.74-4.27L114.74-4.27Q116.49-4.27 118.04-5.13 119.59-5.98 120.38-7.42L120.38-7.42 120.38-12.4 117.18-12.4Q113.88-12.4 112.22-11.25 110.56-10.11 110.56-8.01L110.56-8.01Q110.56-6.3 111.7-5.29 112.83-4.27 114.74-4.27ZM131.41-13.4L131.41-13.4Q131.41-19.51 134.24-23.21 137.07-26.9 141.83-26.9L141.83-26.9Q146.03-26.9 148.62-23.97L148.62-23.97 148.62-37.5 154.55-37.5 154.55 0 149.18 0 148.89-2.73Q146.23 0.49 141.78 0.49L141.78 0.49Q137.15 0.49 134.28-3.25 131.41-6.98 131.41-13.4ZM137.34-12.89L137.34-12.89Q137.34-8.86 138.89-6.6 140.44-4.35 143.3-4.35L143.3-4.35Q146.94-4.35 148.62-7.59L148.62-7.59 148.62-18.87Q146.98-22.05 143.35-22.05L143.35-22.05Q140.47-22.05 138.9-19.76 137.34-17.48 137.34-12.89ZM177.35-35.55L186.29-7.74 195.32-35.55 202.11-35.55 189.31 0 183.33 0 170.59-35.55 177.35-35.55ZM211.85-26.42L211.85 0 205.91 0 205.91-26.42 211.85-26.42ZM205.55-33.28L205.55-33.28Q205.55-34.64 206.41-35.55 207.28-36.45 208.89-36.45 210.5-36.45 211.38-35.55 212.26-34.64 212.26-33.28L212.26-33.28Q212.26-31.93 211.38-31.04 210.5-30.15 208.89-30.15 207.28-30.15 206.41-31.04 205.55-31.93 205.55-33.28ZM233.11-7.18L233.11-7.18Q233.11-8.76 231.8-9.59 230.5-10.42 227.47-11.06 224.44-11.69 222.41-12.67L222.41-12.67Q217.97-14.82 217.97-18.9L217.97-18.9Q217.97-22.31 220.85-24.61 223.73-26.9 228.18-26.9L228.18-26.9Q232.91-26.9 235.83-24.56 238.75-22.22 238.75-18.48L238.75-18.48 232.81-18.48Q232.81-20.19 231.54-21.33 230.28-22.46 228.18-22.46L228.18-22.46Q226.22-22.46 224.99-21.56 223.76-20.65 223.76-19.14L223.76-19.14Q223.76-17.77 224.9-17.02 226.05-16.26 229.54-15.49 233.03-14.72 235.02-13.66 237.01-12.6 237.98-11.11 238.94-9.62 238.94-7.5L238.94-7.5Q238.94-3.93 235.99-1.72 233.03 0.49 228.25 0.49L228.25 0.49Q225 0.49 222.46-0.68 219.92-1.86 218.51-3.91 217.09-5.96 217.09-8.33L217.09-8.33 222.85-8.33Q222.98-6.23 224.44-5.09 225.91-3.96 228.32-3.96L228.32-3.96Q230.67-3.96 231.89-4.85 233.11-5.74 233.11-7.18ZM267.28-13.28L267.28-12.94Q267.28-6.79 264.54-3.15 261.79 0.49 256.98 0.49L256.98 0.49Q252.34 0.49 249.76-2.86L249.76-2.86 249.46 0 244.09 0 244.09-37.5 250.02-37.5 250.02-23.88Q252.59-26.9 256.93-26.9L256.93-26.9Q261.77-26.9 264.53-23.32 267.28-19.73 267.28-13.28L267.28-13.28ZM261.35-12.7L261.35-13.45Q261.35-17.75 259.84-19.9 258.32-22.05 255.44-22.05L255.44-22.05Q251.59-22.05 250.02-18.68L250.02-18.68 250.02-7.79Q251.61-4.35 255.49-4.35L255.49-4.35Q258.28-4.35 259.79-6.42 261.3-8.5 261.35-12.7L261.35-12.7ZM275.63-26.42L281.22-8.5 286.59-26.42 292.92-26.42 282.42 4Q280 10.67 274.22 10.67L274.22 10.67Q272.92 10.67 271.36 10.23L271.36 10.23 271.36 5.64 272.48 5.71Q274.73 5.71 275.86 4.9 277 4.08 277.66 2.15L277.66 2.15 278.51-0.12 269.24-26.42 275.63-26.42Z" opacity="1" transform="matrix(1,0,0,1,0,0)" fill="#000000" class="wordmark-text-0" data-fill-palette-color="primary" id="text-0"></path></svg></g></svg></g></svg></g></svg></g><g transform="matrix(1,0,0,1,112.446088195089,0)"><svg viewBox="0 0 170.62782360982192 91.00150592523836" height="91.00150592523836" width="170.62782360982192"><g><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0" y="0" viewBox="5 26 90 48" enable-background="new 0 0 100 100" xml:space="preserve" height="91.00150592523836" width="170.62782360982192" class="icon-icon-0" data-fill-palette-color="accent" id="icon-0"><polygon points="21,26 21,31 18,31 18,26 13,26 13,31 10,31 10,26 5,26 5,74 26,74 26,26 " fill="#000000" data-fill-palette-color="accent"></polygon><polygon points="90,26 90,31 87,31 87,26 82,26 82,31 79,31 79,26 74,26 74,74 95,74 95,26 " fill="#000000" data-fill-palette-color="accent"></polygon><path d="M65 33v5h-6v-5h-6v5h-6v-5h-6v5h-6v-5h-6v38h16V59c0-3.477 2.55-7.027 5-7.771 2.45 0.744 5 4.295 5 7.771v12h16V33H65z" fill="#000000" data-fill-palette-color="accent"></path></svg></g></svg></g><g></g></svg></g><defs></defs></svg><rect width="395.5199999999999" height="172.39425370964136" fill="none" stroke="none" visibility="hidden"></rect></g></svg></g></svg>
      <div>
        <h2 className="mt-6 text-center text-3xl font-serif text-gray-900">Logga in på ditt konto</h2>
      </div>
      <form className="mt-8 space-y-6" onSubmit={submitLogin} noValidate>
        <div className="rounded-md shadow-sm -space-y-px">
          <div>
            <label htmlFor="email" className="sr-only">E-mail</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="E-mail"
            />
            {emailError && (
                <p className="mt-2 text-sm text-red-600">{emailError}</p>
              )}
          </div>
          <div>
            <label htmlFor="password" className="sr-only">Lösenord</label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Lösenord"
            />
             {passwordError && (
                <p className="mt-2 text-sm text-red-600">{passwordError}</p>
              )}
              {serverError && (
                <p className="mt-2 text-sm text-red-600">{serverError}</p>
              )}{" "}
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="group relative w-2/5 flex justify-center  mx-auto py-3 px-6 border border-transparent text-lg font-serif font-medium rounded-md text-white bg-sky-400 hover:bg-sky-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
          >
            Logga in
          </button>
        </div>
      </form>
    </div>
  </div>
  )
}

export default Login