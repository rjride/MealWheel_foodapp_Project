import React,{useState} from 'react'
import { Link,useNavigate} from 'react-router-dom';

export default function Login() {
  const [credentials, setCredentials] = useState({ email: "", password: ""});
let navigate = useNavigate();
  const handleChange = (e) => {
      setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
      e.preventDefault();
      try{
      const response = await fetch("http://localhost:5000/api/LoginUser", {
          method: "POST",
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email:credentials.email, password:credentials.password})
      });
      if(!response.ok){
          throw new Error('failed to create user');
      }
      const data = await response.json();
      console.log(data); // Log response from the server
     if(!data.success){
      alert("enter Valid credentials");
     }
     else {
    localStorage.setItem("userEmail",credentials.email);
    localStorage.setItem("authToken",JSON.authToken);
    console.log(localStorage.getItem("authToken"));
      navigate("/");}
  } catch(error){
      console.error(error);
      alert("failed to create user. Please try again later.");
  }

};
  return (
    <>
     <div className="container">
                <form onSubmit={handleSubmit}>
                   
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="email" name="email" value={credentials.email} onChange={handleChange} />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" id="password" name="password" value={credentials.password} onChange={handleChange} />
                    </div>

                    <button type="submit" className="btn btn-success">Submit</button>
                    <Link to="/CreateUser" className='m-3 btn btn-danger'>I'm a new User</Link>
                </form>
            </div>
    </>
  )
};
