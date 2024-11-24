import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";

export const Update = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  //   const [data, setData] = useState([]);
  const [values, setValues] = useState({
    name: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    axios
      .get(`https://6742fc2ab7464b1c2a633c6d.mockapi.io/users/${id}`)
      .then((res) => {
        setValues(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleUpdate = (e) => {
    e.preventDefault();
    axios
      .put(`https://6742fc2ab7464b1c2a633c6d.mockapi.io/users/${id}`, values)
      .then((res) => {
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="d-flex vw-100 vh-100 justify-content-center align-items-center bg-light">
      <div className="w-50 border bg-white shadow px-5 py-3 rounded">
        <h2 className="text-center">Update User</h2>
        <form onSubmit={handleUpdate}>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              name="name"
              className="form-control"
              value={values.name}
              onChange={(e) => setValues({ ...values, name: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              value={values.email}
              onChange={(e) => setValues({ ...values, email: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Phone</label>
            <input
              type="text"
              name="phone"
              className="form-control"
              value={values.phone}
              onChange={(e) => setValues({ ...values, phone: e.target.value })}
            />
          </div>
          <button className="btn btn-sm btn-success" type="submit">
            Update
          </button>
          <Link to="/" className="btn btn-sm btn-primary ms-3">
            Back
          </Link>
        </form>
      </div>
    </div>
  );
};
