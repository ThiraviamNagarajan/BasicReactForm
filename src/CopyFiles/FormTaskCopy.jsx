import React, { useEffect, useState } from "react";
import "./Form.css";

function FormTask() {
  const [validMail, setValidMail] = useState("");
  const [mailError, setMailError] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);
  const [isBtnEmpty, setIsBtnEmpty] = useState(false);
  const [confirmDel, setConfirmDel] = useState(false);
  const [studentDetails, setStudentDetails] = useState([]);
  const [details, setDetails] = useState({
    name: "",
    age: "",
    gender: "",
    mail: "",
    mobileNumber: "",
    image: "",
    imgName: "",
    skills: [],
  });
  const [genderObj, setGenderObj] = useState([
    {
      value: "Male",
      checked: false,
    },
    {
      value: "Female",
      checked: false,
    },
    {
      value: "Others",
      checked: false,
    },
  ]);

  const [skillsVal, setSkillsVal] = useState([
    {
      value: "java",
      checked: false,
    },
    {
      value: "HTML",
      checked: false,
    },
    {
      value: "Python",
      checked: false,
    },
    {
      value: "JavaScript",
      checked: false,
    },
    {
      value: "CSS",
      checked: false,
    },
    {
      value: "ReactJs",
      checked: false,
    },
  ]);
  const [editIndex, setEditIndex] = useState("");
  const [delIndex, setDelIndex] = useState("");
  function valueEmpty() {
    setDetails({
      name: "",
      age: "",
      gender: "",
      mail: "",
      mobileNumber: "",
      image: "",
      imgName: "",
      skills: [],
    });
  }

  function editValue(val) {
    const editSkill = skillsVal.map((a, index) => {
      val.skills.map((x, y) => {
        if (x === a.value) {
          a.checked = true;
        }
      });
      return a;
    });
    setSkillsVal(editSkill);

    const tempSkills = skillsVal.filter((b, c) => {
      if (b.checked === true) {
        return b.value;
      }
    });

    const skillDisplay = tempSkills.map((a, i) => {
      return a.value;
    });
    // console.log(skillDisplay);

    setDetails({
      name: val.name,
      age: val.age,
      gender: val.gender,
      mail: val.email,
      mobileNumber: val.mobile,
      image: val.img,
      skills: skillDisplay,
      imgName: val.imgName,
    });
  }

  function createStudent() {
    if (
      details.name !== "" &&
      details.age !== "" &&
      details.gender !== "" &&
      details.mobileNumber !== "" &&
      details.mail !== ""
    ) {
      let value = {
        name: details.name,
        age: details.age,
        gender: details.gender,
        email: details.mail,
        mobile: details.mobileNumber,
        img: details.image,
        skills: details.skills.length !== 0 ? details.skills : [],
        imgName: details.imgName,
      };

      let allValue = [...studentDetails, value];

      setStudentDetails(allValue);
      setIsSubmit(false);
      valueEmpty();
    
    }
  }

  function updateStudent() {
    if (
      details.name !== "" &&
      details.age !== "" &&
      details.gender !== "" &&
      details.mobileNumber !== "" &&
      details.mail !== ""
    ) {
      studentDetails.map((val, index) => {
        if (index === parseInt(editIndex)) {
          studentDetails[index].name = details.name;
          studentDetails[index].age = details.age;
          studentDetails[index].gender = details.gender;
          studentDetails[index].mobile = details.mobileNumber;
          studentDetails[index].img = details.image;
          studentDetails[index].email = details.mail;
          studentDetails[index].skills = details.skills;
          studentDetails[index].imgName = details.imgName;
        }
      });
      setIsSubmit(false);
      valueEmpty();
      setEditIndex("");
    }
  }

  function eventHandler(e) {
    if (e.target.name === "name") {
      setDetails({
        ...details,
        name: e.target.value,
      });
    } else if (e.target.name === "age") {
      setDetails({
        ...details,
        age: e.target.value,
      });
    } else if (e.target.name === "gender") {
      setDetails({
        ...details,
        gender: e.target.value,
      });
    } else if (e.target.name === "mail") {
      setDetails({
        ...details,
        mail: e.target.value,
      });
    } else if (e.target.name === "mobilenumber") {
      setDetails({
        ...details,
        mobileNumber: e.target.value.slice(0, 10),
      });
    }
  }

  function mailValidation(email) {
    let countOfAt = 0;
    let allowedSpecialChar = "._";
    let isError = false;
    let space = " ";
    let specialChar = "`~!#$%^&*()-+=[]{}><?/,|;:";
    for (let i = 0; i < email.length; i++) {
      let isspecial = false;
      if (email[i] === "@") {
        countOfAt++;
      }
      for (let k = 0; k < space.length; k++) {
        if (email[i] === space[k]) {
          isError = true;
          setMailError("Space is not allowed in mail address");
        }
      }
      if (!isError) {
        for (let j = 0; j < specialChar.length; j++) {
          if (email[i] === specialChar[j]) {
            isError = true;
            setMailError(
              "Given " +
                specialChar[j] +
                " character is not allowed in the mail address"
            );
          }
        }
      }
      if (!isError) {
        for (let j = 0; j < allowedSpecialChar.length; j++) {
          if (email[i] === allowedSpecialChar[j]) {
            isspecial = true;
          }
        }
      }
      if (isspecial) {
        for (let j = 0; j < allowedSpecialChar.length; j++) {
          if (allowedSpecialChar[j] === email[i + 1]) {
            isError = true;
            setMailError(
              allowedSpecialChar +
                " should not appear consecutive in mail address"
            );
          }
        }
      }
    }
    if (countOfAt == 1 && !isError) {
      let emailPart = email.split("@");

      if (emailPart[0].length <= 65 && emailPart[1].length <= 255) {
        for (let i = 0; i < emailPart[0].length; i++) {
          if (
            emailPart[0][0] === allowedSpecialChar[i] ||
            emailPart[0][[emailPart[0].length - 1]] === allowedSpecialChar[i]
          ) {
            setMailError(
              allowedSpecialChar[i] +
                " is not allowed at first and last character of mail address"
            );
            isError = true;
          }
        }
        let topDomain = emailPart[1].split(".");
        let topDomainContent = ["com", "in", "edu", "gov", "net", "org"];
        if (!isError) {
          for (let i = 0; i < topDomainContent.length; i++) {
            if (topDomain[topDomain.length - 1] === topDomainContent[i]) {
              isError = true;
              setValidMail(email);
            }
          }
          if (!isError) {
            setMailError(
              "." +
                topDomain[topDomain.length - 1] +
                " is not valid in mail address"
            );
          }
        }
      } else {
        setMailError("Given mail address length is not valid");
      }
    } else if (countOfAt > 1) {
      setMailError("only one @ is allowed in mail address");
    }
  }

  function checkBoxHandler(e) {
    skillsVal.map((val, index) => {
      if (val.value === e.target.value) {
        setSkillsVal([...skillsVal, (val.checked = !skillsVal[index].checked)]);
      }
    });
  }
  function radioEmpty() {
    let radioElements = document.querySelectorAll(".genderbutton");
    radioElements.forEach((value) => {
      value.checked = false;
    });
  }

  function radioUpdate(val) {
    let radioElements = document.querySelectorAll(".genderbutton");
    radioElements.forEach((radioInput) => {
      val === radioInput.value && (radioInput.checked = true);
    });
  }

  useEffect(() => {
    let filterData = skillsVal.filter((val, index) => {
      if (val.checked === true) {
        return val.value;
      }
    });

    const skillValue = filterData.map((val, index) => {
      return val.value;
    });
    setDetails({ ...details, skills: skillValue });
  }, [skillsVal]);

  useEffect(() => {
    setSkillsVal([
      {
        value: "java",
        checked: false,
      },
      {
        value: "HTML",
        checked: false,
      },
      {
        value: "Python",
        checked: false,
      },
      {
        value: "JavaScript",
        checked: false,
      },
      {
        value: "CSS",
        checked: false,
      },
      {
        value: "ReactJs",
        checked: false,
      },
    ]);

    setGenderObj([
      {
        value: "Male",
        checked: false,
      },
      {
        value: "Female",
        checked: false,
      },
      {
        value: "Others",
        checked: false,
      },
    ]);
    setIsBtnEmpty(false);
  }, [isBtnEmpty]);

  useEffect(() => {
    if (details.mail !== "") {
      mailValidation(details.mail);
    }

    if (validMail !== "") {
      setMailError("");

      if (validMail.length !== details.mail.length) {
        setValidMail("");
      }
    }
  }, [details]);

  useEffect(() => {
    let delFilterValue = studentDetails.filter(
      (val, index) => index !== delIndex
    );
    setStudentDetails(delFilterValue);
  }, [confirmDel]);

  function imageHandle(event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setDetails({
          ...details,
          image: reader.result,
          imgName: event.target.files[0].name,
        });
      };
      reader.readAsDataURL(file);
    }
  }

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div
          style={{
            boxShadow: "0px 6px 20px 0px #746F6F ,0 6px 20px 0 #746F6F",
            width: "500px",
            backgroundColor: "#fafafa",
            borderRadius: "20px",
            maxHeight: "730px",
          }}
        >
          <div
            style={{
              marginTop: "20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <h1
              style={{
                textAlign: "center",
                textTransform: "uppercase",
                fontSize: "24px",
                fontWeight: "1500",
              }}
            >
              StudentDetails
            </h1>
          </div>
          <div
            style={{
              width: "80%",
              marginLeft: "10%",
              display: "flex",
              flexDirection: "column",
              alignContent: "start",
            }}
          >
            <div className="formelements">
              <div className="main_info">
                <label
                  style={{
                    fontSize: "14px",
                    fontWeight: "500",
                    opacity: "80%",
                  }}
                >
                  Enter the name:
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={details.name}
                  autoComplete="off"
                  onChange={eventHandler}
                />
                {isSubmit && details.name === "" && (
                  <div
                    style={{
                      fontSize: "10px",
                      color: "red",
                      fontWeight: "500",
                    }}
                  >
                    Please Enter a Name
                  </div>
                )}
                <br></br>
                <label
                  style={{
                    fontSize: "14px",
                    fontWeight: "500",
                    opacity: "80%",
                  }}
                >
                  Enter the Age:
                </label>
                <input
                  type="number"
                  id="age"
                  name="age"
                  value={details.age}
                  onChange={(event) =>
                    setDetails({
                      ...details,
                      age: event.target.value.slice(0, 2),
                    })
                  }
                />
                {isSubmit && details.age === "" && (
                  <div
                    style={{
                      fontSize: "10px",
                      color: "red",
                      fontWeight: "500",
                    }}
                  >
                    Please Enter the Age
                  </div>
                )}
                <br></br>
              </div>
              <div className="gender">
                <label
                  style={{
                    fontSize: "14px",
                    fontWeight: "500",
                    opacity: "80%",
                  }}
                >
                  Select the Gender:
                </label>
                <div className="genderlist">
                  {genderObj.map((val, index) => (
                    <div key={index} style={{ display: "flex" }}>
                      <input
                        type="radio"
                        id={`gender-${val.value}`}
                        name="gender"
                        value={val.value}
                        className="genderbutton"
                        onChange={eventHandler}
                      />
                      <label htmlFor={`gender-${val.value}`}>{val.value}</label>
                    </div>
                  ))}
                  {isSubmit && details.gender === "" && (
                    <div
                      style={{
                        fontSize: "10px",
                        color: "red",
                        fontWeight: "500",
                      }}
                    >
                      Please Select the Gender
                    </div>
                  )}
                  <br></br>
                </div>
              </div>
              <div className="formelements">
                <div className="main_info">
                  <label
                    style={{
                      fontSize: "14px",
                      fontWeight: "500",
                      opacity: "80%",
                    }}
                  >
                    Enter the mail:
                  </label>
                  <div
                    className="mailelements"
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <input
                      className="email"
                      type="email"
                      id="mail"
                      name="mail"
                      autoComplete="off"
                      value={details.mail}
                      onChange={eventHandler}
                      style={{ width: "90%" }}
                    />
                    {validMail !== "" ? (
                      <span>
                        <ion-icon
                          name="checkmark-circle"
                          style={{
                            color: "#d4eed9",
                            backgroundColor: "green",
                            borderRadius: "50%",
                            fontSize: "18px",
                          }}
                        ></ion-icon>
                      </span>
                    ) : (
                      details.mail !== "" && (
                        <span>
                          <ion-icon
                            name="close-circle"
                            style={{
                              color: "#FD8182",
                              backgroundColor: "red",
                              borderRadius: "50%",
                              fontSize: "18px",
                            }}
                          ></ion-icon>
                        </span>
                      )
                    )}
                  </div>
                  {isSubmit && details.mail === "" && (
                    <div
                      style={{
                        fontSize: "10px",
                        color: "red",
                        fontWeight: "500",
                      }}
                    >
                      Please enter the mail id
                    </div>
                  )}
                  <br></br>
                  <label
                    style={{
                      fontSize: "14px",
                      fontWeight: "500",
                      opacity: "80%",
                    }}
                  >
                    Enter the MobileNumber:
                  </label>
                  <div className="mobileElements">
                    <input
                      type="number"
                      id="mobilenumber"
                      name="mobilenumber"
                      value={details.mobileNumber}
                      onChange={eventHandler}
                    />
                    {details.mobileNumber.length === 10 ? (
                      <span>
                        <ion-icon
                          name="checkmark-circle"
                          style={{
                            color: "#d4eed9",
                            backgroundColor: "green",
                            borderRadius: "50%",
                            fontSize: "18px",
                          }}
                        ></ion-icon>
                      </span>
                    ) : (
                      details.mobileNumber !== "" && (
                        <span>
                          <ion-icon
                            name="close-circle"
                            style={{
                              color: "#FD8182",
                              backgroundColor: "red",
                              borderRadius: "50%",
                              fontSize: "18px",
                            }}
                          ></ion-icon>
                        </span>
                      )
                    )}
                  </div>
                  {isSubmit && details.mobileNumber === "" && (
                    <div
                      style={{
                        fontSize: "10px",
                        color: "red",
                        fontWeight: "500",
                      }}
                    >
                      Please enter the mobile number
                    </div>
                  )}
                  {isSubmit &&
                    details.mobileNumber.length > 0 &&
                    details.mobileNumber.length < 10 &&
                    details.mobileNumber.length >
                      10(
                        <div
                          style={{
                            fontSize: "10px",
                            color: "red",
                            fontWeight: "500",
                          }}
                        >
                          Please enter 10 digit mobile number
                        </div>
                      )}
                  <br></br>
                </div>
              </div>
              <label
                style={{ fontSize: "14px", fontWeight: "500", opacity: "80%" }}
              >
                upload Images:
              </label>
              <hr />
              <div style={{ display: "flex" }}>
                <label htmlFor="image" style={{ cursor: "pointer" }}>
                  <ion-icon
                    name="cloud-upload-outline"
                    style={{ fontSize: "39px", color: "#342FBA" }}
                  ></ion-icon>
                </label>
                <label
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginLeft: "10px",
                  }}
                >
                  {details.imgName}
                </label>
              </div>
              <input
                type="file"
                className="input-file"
                id="image"
                style={{ visibility: "hidden", display: "none" }}
                onChange={(event) => {
                  imageHandle(event);
                }}
              />

              <br></br>
              <div className="skills">
                <label
                  style={{
                    fontSize: "14px",
                    fontWeight: "500",
                    opacity: "80%",
                  }}
                >
                  Select the Skills:
                </label>
                <div className="skilllist">
                  {skillsVal.map(
                    (items, index) =>
                      typeof items === "object" && (
                        <div
                          key={index}
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <div>
                            <input
                              type="checkbox"
                              id={`skills-${items.value}`}
                              name="skills"
                              value={items.value}
                              onChange={checkBoxHandler}
                              checked={items.checked}
                            />
                            <label htmlFor={`skills-${items.value}`}>
                              {items.value}
                            </label>
                          </div>
                        </div>
                      )
                  )}
                </div>
              </div>
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button
              style={{
                height: "30px",
                width: "400px",
                color: "white",
                backgroundColor: "#ff00bf",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "10px",
                margin: "10px",
                fontWeight: "500",
                border: "none",
                outline: "none",
              }}
              onClick={() => {
                setIsSubmit(true);
                editIndex !== "" ? updateStudent() : createStudent();
                setIsBtnEmpty(true);
                radioEmpty();
              }}
            >
              submit
            </button>
          </div>
        </div>
        <div className="cardbox">
          {studentDetails.map((val, index) => (
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
  );
}

export default FormTask;
