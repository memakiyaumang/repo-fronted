import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/AddUser.css";
import axios from "axios";

function AddUser() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token')

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    address: "",
  });

  const [errors, setErrors] = useState({});
  const [image,setImage] = useState({})
  const [preview,setPreview] = useState({})

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
  const handleSubmit = async(e) => {
    e.preventDefault();

    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    try{

      const data_form = new FormData()
      data_form.append('name',formData.name)
      data_form.append('email',formData.email)
      data_form.append('password',formData.password)
      data_form.append('phone',formData.phone)
      data_form.append('address',formData.address)

      if(image){
        console.log(image)
        data_form.append('image',image)
      }
        const response = await axios.post("https://repo-backend-3v9l.onrender.com/api/add-user/",data_form,{
           headers:{
          'Content-Type':'multipart/form-data',
          'Authorization':`Bearer ${token}`
        }
        })
        if (response.data.data){
            navigate("/dashboard");
        }
        else{
            alert(response.data.message)
        }
    }catch(error){
        console.log(error.message)
    }

    
  };

     const handleImageChange = (e) => {
            const file = e.target.files[0]
            setImage(file || null)
            setPreview(file ? URL.createObjectURL(file):'')
          }

  return (
    <div className="add-user-page">

      <div className="add-user-card">

        <h1 className="add-user-title">
          Add User
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


          {/* Password */}
          <div className="form-group">

            <label htmlFor="password">
              Password
            </label>

            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
              className={errors.password ? "input-error" : ""}
            />

            {errors.password && (
              <p className="error-text">
                {errors.password}
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

          <div className="form-group">

            <label htmlFor="password">
              Image
            </label>

            <input
              type="file"
              id="add-image"
              name="image"
              onChange={handleImageChange}
              accept="image/*"
              className={errors.image ? "input-error" : ""}
            />
            {preview && (<img src = {preview} width='100px'></img>)}

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
              Add User
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default AddUser;