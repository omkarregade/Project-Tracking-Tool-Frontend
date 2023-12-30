import React from 'react';
import '../CssFiles/EmployeeProfile.css'; // Adjust the path according to your project structure

const EmployeeProfile = () => {
    // Dummy employee profile data (replace with actual data or fetch from an API)
    const employeeData = {
        id: 1,
        name: 'John Wick',
        position: 'Software Developer',
        department: 'Engineering',
        email: 'johnwick@gmail.com',
        phone: '+91-9921463930',
        address: '9/11 Trump Tower, Pune, India',
        // Add more fields as needed
    };

    return (
        <div className="employee-profile">
            <div className="employee-profile-header">
                <img
                    className="employee-profile-image"
                    src="https://via.placeholder.com/150" // Replace with actual profile image URL
                    alt="Employee Profile"
                />
                <h1>{employeeData.name}</h1>
                <p>{employeeData.position}</p>
            </div>
            <div className="employee-profile-details">
                <h2>About</h2>
                <p>
                    <span className="detail-label">ID:</span>
                    <span className="detail-value">{employeeData.id}</span>
                </p>
                <p>
                    <span className="detail-label">Department:</span>
                    <span className="detail-value">{employeeData.department}</span>
                </p>
                <p>
                    <span className="detail-label">Email:</span>
                    <span className="detail-value">{employeeData.email}</span>
                </p>
                <p>
                    <span className="detail-label">Phone:</span>
                    <span className="detail-value">{employeeData.phone}</span>
                </p>
                <p>
                    <span className="detail-label">Address:</span>
                    <span className="detail-value">{employeeData.address}</span>
                </p>
                {/* Display additional employee profile details */}
            </div>
            <button className="employee-profile-button">Edit Profile</button>
        </div>
    );
};

export default EmployeeProfile;




