import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../css/AddUser.css";
import axios from "axios";

function EditUser() {
  const navigate = useNavigate();
  const { id } = useParams();
  const token = localStorage.getItem('token')
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    address: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);

  // Get User Data
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `https://repo-backend-3v9l.onrender.com/api/get-singleuser/${id}`,{
          headers:{
          'Content-Type':'application/json',
          'Authorization':`Bearer ${token}`
        }
          }
        );

        if (response.data.data) {
          setFormData({
            name: response.data.data.name || "",
            email: response.data.data.email || "",
            phone: response.data.data.phone || "",
            password: response.data.data.password || "",
            address: response.data.data.address || "",
          });
        } else {
          alert(response.data.message);
          navigate("/dashboard");
        }
      } catch (error) {
        console.log(error);
        alert("Unable to fetch user data");
        navigate("/dashboard");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id, navigate]);

  // Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Validation
  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    ) {
      newErrors.email = "Enter a valid email";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone is required";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    }

    return newErrors;
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});

    try {
      const response = await axios.put(
        `https://repo-backend-3v9l.onrender.com/api/update-user/${id}`,
        formData,{
           headers:{
          'Content-Type':'application/json',
          'Authorization':`Bearer ${token}`
        }
        }
      );

      if (response.data.data) {
        alert("User updated successfully");
        navigate("/dashboard");
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.log(error);
      alert("Unable to update user");
    }
  };

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="add-user-page">
      <div className="add-user-card">

        <h1 className="add-user-title">
          Edit User
        </h1>

        <form onSubmit={handleSubmit}>

          {/* Name */}
          <div className="form-group">
            <label htmlFor="name">
              Name
            </label>

            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter name"
              className={errors.name ? "input-error" : ""}
            />

            {errors.name && (
              <p className="error-text">
                {errors.name}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="form-group">
            <label htmlFor="email">
              Email
            </label>

            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email"
              className={errors.email ? "input-error" : ""}
            />

            {errors.email && (
              <p className="error-text">
                {errors.email}
              </p>
            )}
          </div>

          {/* Phone */}
          <div className="form-group">
            <label htmlFor="phone">
              Phone
            </label>

            <input
              type="text"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter phone number"
              className={errors.phone ? "input-error" : ""}
            />

            {errors.phone && (
              <p className="error-text">
                {errors.phone}
              </p>
            )}
          </div>

          
          {/* Address */}
          <div className="form-group">
            <label htmlFor="address">
              Address
            </label>

            <textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter address"
              rows="4"
              className={errors.address ? "input-error" : ""}
            />

            {errors.address && (
              <p className="error-text">
                {errors.address}
              </p>
            )}
          </div>

          {/* Buttons */}
          <div className="form-actions">

            <button
              type="button"
              className="cancel-btn"
              onClick={() => navigate("/dashboard")}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="save-btn"
            >
              Update User
            </button>

          </div>

        </form>
      </div>
    </div>
  );
}

export default EditUser;