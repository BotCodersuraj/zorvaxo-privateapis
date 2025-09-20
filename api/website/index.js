import { useState } from "react";

export default function Home() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const [limit, setLimit] = useState(null);
  const [uid, setUid] = useState("");
  const [result, setResult] = useState("");
  const [isRegister, setIsRegister] = useState(false);

  const register = async () => {
    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });
    const data = await res.json();
    alert(data.message);
    if (data.success) setIsRegister(false);
  };

  const login = async () => {
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });
    const data = await res.json();
    if (data.success) setLoggedIn(true);
    else alert(data.message);
  };

  const generateKey = async () => {
    const secret = "TUMHARA_SECRET";
    const res = await fetch(`/api/generate?username=${username}&secret=${secret}`);
    const data = await res.json();
    if (data.success) {
      setApiKey(data.apiKey);
      setLimit(data.limit);
    } else alert(data.message);
  };

  const useKey = async () => {
    const res = await fetch(`/api/use?username=${username}&key=${apiKey}&uid=${uid}`);
    const data = await res.json();
    setResult(JSON.stringify(data, null, 2));
    if (data.success) setLimit(data.remaining);
  };

  if (!loggedIn)
    return (
      <div style={{ padding: 20 }}>
        <h2>{isRegister ? "Register" : "Login"}</h2>
        <input placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
        <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
        {isRegister ? <button onClick={register}>Register</button> : <button onClick={login}>Login</button>}
        <p style={{ cursor: "pointer", color: "blue" }} onClick={() => setIsRegister(!isRegister)}>
          {isRegister ? "Already have account? Login" : "New user? Register"}
        </p>
      </div>
    );

  return (
    <div style={{ padding: 20 }}>
      <h2>Generate API Key</h2>
      <button onClick={generateKey}>Generate Key</button>
      {apiKey && (
        <div>
          <p>API Key: {apiKey}</p>
          <p>Remaining Limit: {limit}</p>
          <input placeholder="UID" value={uid} onChange={e => setUid(e.target.value)} />
          <button onClick={useKey}>Use Key</button>
        </div>
      )}
      {result && <pre>{result}</pre>}
    </div>
  );
}