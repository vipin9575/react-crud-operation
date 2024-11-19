import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export const Home = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:3000/users")
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      }).finally(() => {
        setLoading(false);
      })
  }, []);

  const handleDelete = (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (confirm) {
      axios
        .delete(`http://localhost:3000/users/${id}`)
        .then((response) => {
          setData(data.filter((user) => user.id !== id));
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <>
    {loading && <div className="d-flex justify-content-center align-items-center">Loading...</div>}
    <div className="d-flex flex-column justify-content-center align-items-center bg-light vh-100 vw-100">
      <h1>List of Users</h1>
      <div className="w-75 rounded bg-white border shadow p-4">
        <div className="d-flex justify-content-end">
          <Link to="/create" className="btn btn-sm btn-success">
            Add +
          </Link>
        </div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((user, index) => (
              <tr key={index}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>
                  <Link
                    to={`/read/${user.id}`}
                    className="btn btn-sm btn-info me-2"
                  >
                    View
                  </Link>
                  <Link
                    to={`/update/${user.id}`}
                    className="btn btn-sm btn-primary me-2"
                  >
                    Edit
                  </Link>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={(e) => handleDelete(user.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </>
  );
};
