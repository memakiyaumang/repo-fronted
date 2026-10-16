import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Dashboard.css";
import axios from "axios";

function Dashboard() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token')

  const [users, setUsers] = useState([]);
  useEffect(()=>{
    getUserData()
  },[])
  const getUserData = async()=>{
    try{
      const response = await axios.get("https://repo-backend-3v9l.onrender.com/api/get-userdata/",{
        headers:{
          'Content-Type':'application/json',
          'Authorization':`Bearer ${token}`
        }
      })
      setUsers(response.data.data)

    }catch(error){
      console.log(error.message)
    }
  }
 
  const handleDelete = async(id) => {
    try{
      const response = await axios.delete(`https://repo-backend-3v9l.onrender.com/api/delete-user/${id}`,{
         headers:{
          'Content-Type':'application/json',
          'Authorization':`Bearer ${token}`
        }
      })
      if (response.data.data){
        getUserData()
      }
      else{
         alert(response.data.message)
      }
    }catch(error){
      console.log(error.message)
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate("/login")
  }

  return (
    <div className="dashboard-page">

      <div className="dashboard-container">

        {/* Header */}
        <div className="dashboard-header">

          <h1 className="dashboard-title">
            User List
          </h1>

          <button
            type="button"
            className="add-user-btn"
            onClick={() => navigate("/users/add")}
          >
            + Add User
          </button>
          <button
            type="button"
            className="add-user-btn"
            onClick={handleLogout}
          >
            Logout
          </button>

        </div>

        {/* Table */}
        <div className="table-wrapper">

          <table className="user-table">

            <thead>
              <tr>

                <th>#</th>
                <th>Image</th>

                <th>Name</th>

                <th>Email</th>

                <th>Phone</th>

                <th>Address</th>

                <th className="action-header">
                  Action
                </th>

              </tr>
            </thead>

            <tbody>

              {users.length === 0 ? (

                <tr>
                  <td
                    colSpan="7"
                    className="no-users"
                  >
                    No users found
                  </td>
                </tr>

              ) : (

                users.map((user, index) => (

                  <tr key={user.id}>

                    <td>
                      {index + 1}
                    </td>
                     <td>
                      <img src={user.image} width="100px"></img>
                    </td>

                    <td>
                      {user.name}
                    </td>

                    <td>
                      {user.email}
                    </td>

                    <td>
                      {user.phone}
                    </td>

                    <td className="address-cell">
                      {user.address}
                    </td>

                    <td className="action-cell">

                      <div className="action-buttons">

                        {/* Edit */}
                        <button
                          type="button"
                          className="edit-btn"
                         onClick={() => navigate(`/edit-user/${user._id}`)}
                        >
                          Edit
                        </button>

                        {/* Delete */}
                        <button
                          type="button"
                          className="delete-btn"
                          onClick={() =>
                            handleDelete(user._id)
                          }
                        >
                          Delete
                        </button>

                      </div>

                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;