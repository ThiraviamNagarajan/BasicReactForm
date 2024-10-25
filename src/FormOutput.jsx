import React from 'react'
import { useSelector } from 'react-redux';

function FormOutput() {

  const studentFormDetails=useSelector((state)=>state.detailAction)
  console.log("studentFormDetails",studentFormDetails);
  return (
    <>
    <div className="cardbox">  
    {studentFormDetails.map((val, index) => (
      <div key={index} className="card">
        <div className="card-img">
          <span>
            <img
              src={
                val.img
                  ? val.img
                  : "business-man-icon-for-your-web-profile-free-vector.jpg"
              }
              alt=""
            />
          </span>
        </div>
        <div className="card-body">
          <p>Name:{val.name}</p>
          <p>Age:{val.age}</p>
          <p>Gender:{val.gender}</p>
          <p>Mail:{val.email}</p>
          <p>phoneNumber:{val.mobile}</p>
          {val.skills.length !== 0 && (
            <p>Skills: {[val.skills.join(" , ")]}</p>
          )}
        </div>
        <div className="card-button">
          <button
            onClick={() => {
              editValue(val);
              setEditIndex(index);
              radioUpdate(val.gender);
            }}
          >
            Edit
          </button>
          <button
            onClick={() => {
              document
                .querySelector(".alert-box")
                .classList.add("active");
              setDelIndex(index);
            }}
          >
            Delete
          </button>
        </div>
      </div>
    ))}
  </div>
      <div className="alert-box">
      <button
        className="close-btn"
        onClick={() => {
          document.querySelector(".alert-box").classList.remove("active");
        }}
      >
        <ion-icon name="close"></ion-icon>
      </button>
      <p>Are you sure to delete student detail?</p>
      <div className="button-group">
        <button
          className="confirm-btn"
          onClick={() => {
            setConfirmDel(!confirmDel);
            document.querySelector(".alert-box").classList.remove("active");
          }}
        >
          Yes
        </button>
        <button
          className="decline-btn"
          onClick={() => {
            document.querySelector(".alert-box").classList.remove("active");
          }}
        >
          No
        </button>
      </div>
    </div>
   </>
  )
}

export default FormOutput