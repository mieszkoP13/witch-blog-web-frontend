import { useEffect, useState } from "react";
import axios from "axios";
import GoogleLoginButton from "../components/GoogleLoginButton";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const getData = () => {
      setToken(localStorage.getItem("token"));
      if (!token) {
        const params = new URLSearchParams(window.location.search);
        const query = params.get("token");
        localStorage.setItem("token", query);
        setToken(query);
      }

      if (token) {
        axios
          .get(`https://witchblog.azurewebsites.net/api/v1/users/me`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((res) => {
            setProfile(res.data);
          })
          .catch((err) => console.log(err));
      }
    };
    getData();
  }, [token]);

  const logOut = () => {
    localStorage.removeItem("token");
    window.location.href = "http://localhost:3000/users/profile";
  };

  return (
    <div>
      {profile ? (
        <>
          <h3>User Logged in</h3>
          <p>Email: {profile.email}</p>
          <p>First Name: {profile.firstName}</p>
          <p>Last Name: {profile.lastName}</p>
          <button onClick={logOut}>Log out</button>
        </>
      ) : (
        <GoogleLoginButton />
      )}
    </div>
  );
};

export default Profile;
