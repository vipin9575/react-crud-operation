import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

export const Read = () => {
  const [data, setData] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`https://6742fc2ab7464b1c2a633c6d.mockapi.io/users/${id}`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="d-flex vw-100 vh-100 justify-content-center align-items-center bg-danger-subtle">
      <div className="w-50 border shadow bg-success-subtle px-5 py-3 rounded">
        <h3>Details of User</h3>
        <div className="mb-3">
          <strong>Name: {data.name}</strong>
        </div>
        <div className="mb-3">
          <strong>Email: {data.email}</strong>
        </div>
        <div className="mb-3">
          <strong>Phone: {data.phone}</strong>
        </div>
        <Link to={`/update/${id}`} className="btn btn-sm btn-success me-2">
          Update
        </Link>
        <Link to="/" className="btn btn-sm btn-danger">
          Back
        </Link>
      </div>
    </div>
  );
};
