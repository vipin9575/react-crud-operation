import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export const Create = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Fetch the list of users to get the last ID
    axios
      .get("http://localhost:3000/users")
      .then((response) => {
        const users = response.data;
        const lastUser = users[users.length - 1];
        const newId = lastUser ? String(Number(lastUser.id) + 1) : "1";

        const newUser = {
          id: newId,
          ...values,
        };

        // Post the new user data
        axios
          .post("http://localhost:3000/users", newUser)
          .then((res) => {
            navigate("/"); // Navigate back to the home page after submission
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log("Error fetching users:", err);
      });
  };
  return (
    <div>
      <div className="d-flex vw-100 vh-100 justify-content-center align-items-center bg-light">
        <div className="w-50 border bg-white shadow px-5 py-3 rounded">
          <h2 className="text-center">Create User</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input
                type="text"
                name="name"
                className="form-control"
                onChange={(e) => setValues({ ...values, name: e.target.value })}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                name="email"
                className="form-control"
                onChange={(e) =>
                  setValues({ ...values, email: e.target.value })
                }
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Phone</label>
              <input
                type="text"
                name="phone"
                className="form-control"
                onChange={(e) =>
                  setValues({ ...values, phone: e.target.value })
                }
              />
            </div>
            <button className="btn btn-sm btn-success" type="submit">
              Submit
            </button>
            <Link to="/" className="btn btn-sm btn-primary ms-3">
              Back
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};
