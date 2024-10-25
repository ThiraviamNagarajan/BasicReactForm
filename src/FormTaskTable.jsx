import React, { useState, useEffect } from "react";
import "./Form.css";

function FormTaskTable() {
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
      value: "Front-End",
      checked: false,
    },
    {
      value: "Back-End",
      checked: false,
    },
  ]);
  const [editIndex, setEditIndex] = useState("");
  const [delIndex, setDelIndex] = useState("");
  const [tableEdit, setTableEdit] = useState(false);
  const [tableData, setTableData] = useState({
    name: "",
    age: "",
    gender: "",
    mail: "",
    mobileNumber: "",
    image: "",
    imgName: "",
    skills: [],
  });
  const [tableDetails, setTableDetails] = useState([]);
  const [isSubmitTable, setIsSubmitTable] = useState(false);
  const [isTableSave, setIsTableSave] = useState(false);
  const [validCheckMail, setValidCheckMail] = useState(false);
  const [deleteTable, setDeleteTable] = useState(false);

  const exceptThisSymbols = ["e", "E", "+", "-", "."];

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

  function tableEditValue(val) {
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
    setTableData({
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
      details.mobileNumber !== "" &&
      details.mobileNumber.length === 10 &&
      validMail !== "" &&
      details.mail !== "" &&
      details.gender !== ""
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

      let allValue = [...tableDetails, value];
      setTableDetails(allValue);
      setSkillsVal([
        {
          value: "Front-End",
          checked: false,
        },
        {
          value: "Back-End",
          checked: false,
        },
      ]);
      setIsSubmit(false);
      valueEmpty();
    }
  }

  function updateStudent() {
    if (
      tableData.name !== "" &&
      tableData.age !== "" &&
      tableData.gender !== "" &&
      tableData.mobileNumber !== "" &&
      tableData.mobileNumber.length === 10 &&
      tableData.mail !== ""
    ) {
      tableDetails.map((val, index) => {
        if (index === parseInt(editIndex)) {
          tableDetails[index].name = tableData.name;
          tableDetails[index].age = tableData.age;
          tableDetails[index].gender = tableData.gender;
          tableDetails[index].mobile = tableData.mobileNumber;
          tableDetails[index].img = tableData.image;
          tableDetails[index].email = tableData.mail;
          tableDetails[index].skills = tableData.skills;
          tableDetails[index].imgName = tableData.imgName;
        }
      });
      setSkillsVal([
        {
          value: "Front-End",
          checked: false,
        },
        {
          value: "Back-End",
          checked: false,
        },
      ]);
      setIsSubmit(false);
      setEditIndex("");
      setTableEdit(false);
      setIsTableSave(false);
      valueEmpty();
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
    } else if (e.target.name === "genderform") {
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

  function tableEventHandler(e) {
    if (e.target.name === "name") {
      setTableData({
        ...tableData,
        name: e.target.value,
      });
    } else if (e.target.name === "age") {
      setTableData({
        ...tableData,
        age: e.target.value,
      });
    } else if (e.target.name === "gender") {
      setTableData({
        ...tableData,
        gender: e.target.value,
      });
    } else if (e.target.name === "mail") {
      setTableData({
        ...tableData,
        mail: e.target.value,
      });
    } else if (e.target.name === "mobilenumber") {
      setTableData({
        ...tableData,
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
    let radioElements = document.querySelectorAll(".tablegender");
    radioElements.forEach((value) => {
      value.checked = false;
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
    setTableData({ ...tableData, skills: skillValue });
  }, [skillsVal]);

  useEffect(() => {
    setTableData({
      name: details.name,
      age: details.age,
      gender: details.gender,
      mail: details.mail,
      mobileNumber: details.mobileNumber,
      image: details.image,
      imgName: details.imgName,
      skills: details.skills,
    });
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
    let delFilterValue = tableDetails.filter(
      (val, index) => index !== delIndex
    );
    setTableDetails(delFilterValue);
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

  function tableImageHandle(event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTableData({
          ...tableData,
          image: reader.result,
          imgName: event.target.files[0].name,
        });
      };
      reader.readAsDataURL(file);
    }
  }
  console.log(mailError);
  return (
    <>
      <div>
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
                  disabled={isSubmitTable || deleteTable}
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
                  disabled={isSubmitTable || deleteTable}
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
                  {genderObj.map((items, index) => (
                    <div key={index} style={{ display: "flex" }}>
                      <input
                        type="radio"
                        id={index}
                        name="genderform"
                        value={items.value}
                        className="tablegender"
                        checked={details.gender === items.value}
                        onChange={(e) => {
                          eventHandler(e);
                        }}
                        disabled={isSubmitTable || deleteTable}
                      />
                      <label htmlFor={index}>{items.value}</label>
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
                      disabled={isSubmitTable || deleteTable}
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
                  {isSubmit && validMail === "" && details.mail !== "" && (
                    <div
                      style={{
                        fontSize: "10px",
                        color: "red",
                        fontWeight: "500",
                      }}
                    >
                      Please enter Valid mail id
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
                      onKeyDown={(e) => {
                        exceptThisSymbols.includes(e.key) && e.preventDefault();
                      }}
                      value={details.mobileNumber}
                      onChange={eventHandler}
                      disabled={isSubmitTable || deleteTable}
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
                    details.mobileNumber.length < 10 && (
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
                disabled={isSubmitTable || deleteTable}
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
                              checked={!isSubmitTable ? items.checked : false}
                              disabled={isSubmitTable || deleteTable}
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
                cursor: "pointer",
              }}
              onClick={() => {
                setIsSubmit(true);
                editIndex !== "" ? updateStudent() : createStudent();
                setIsBtnEmpty(true);
                radioEmpty();
                setIsTableSave(false);
              }}
              disabled={isSubmitTable}
            >
              submit
            </button>
          </div>
        </div>
      </div>
      <div className="alert-box">
        <button
          className="close-btn"
          onClick={() => {
            setDeleteTable(false);
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
              setDeleteTable(false);
              document.querySelector(".alert-box").classList.remove("active");
            }}
          >
            Yes
          </button>
          <button
            className="decline-btn"
            onClick={() => {
              setDeleteTable(false);
              document.querySelector(".alert-box").classList.remove("active");
            }}
          >
            No
          </button>
        </div>
      </div>
      {tableDetails.length !== 0 && (
        <div className="tableElements">
          <table>
            <tr>
              <th
                colSpan={"9"}
                style={{ backgroundColor: "#317985", color: "#e1ffff" }}
              >
                <h2>StudentDetails</h2>
              </th>
            </tr>
            <tr>
              <th rowSpan={"1"}>SNO</th>
              <th>Image</th>
              <th>Name</th>
              <th>Age</th>
              <th>Gender</th>
              <th>Mobile</th>
              <th>Skills</th>
              <th rowSpan={"1"}>Edit/Save</th>
              <th rowSpan={"1"} style={{ borderRight: "0px" }}>
                Delete
              </th>
            </tr>
            <tr></tr>
            {tableDetails.map((val, index) => (
              <tr key={index} className="table-row">
                <td>{index + 1}</td>
                <td>
                  {tableEdit == true && editIndex == index ? (
                    <div>
                      <label htmlFor="tableImage" style={{ cursor: "pointer" }}>
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
                        {tableData.imgName}
                      </label>
                      <input
                        type="file"
                        id="tableImage"
                        name="tableImage"
                        autoComplete="off"
                        onChange={tableImageHandle}
                        style={{
                          border: "none",
                          width: "100%",
                          visibility: "hidden",
                        }}
                      />
                    </div>
                  ) : (
                    <img
                      src={
                        val.img
                          ? val.img
                          : "business-man-icon-for-your-web-profile-free-vector.jpg"
                      }
                      alt=""
                    />
                  )}
                </td>
                <td>
                  {tableEdit == true && editIndex == index ? (
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={tableData.name}
                      autoComplete="off"
                      onChange={tableEventHandler}
                    />
                  ) : (
                    val.name
                  )}
                  {isTableSave && tableData.name === "" && editIndex == index && (
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
                </td>
                <td>
                  {tableEdit == true && editIndex == index ? (
                    <input
                      type="text"
                      id="age"
                      name="age"
                      autoComplete="off"
                      value={tableData.age}
                      style={{ width: "50%" }}
                      onChange={tableEventHandler}
                    />
                  ) : (
                    val.age
                  )}
                  {isTableSave && tableData.age === "" && editIndex == index && (
                    <div
                      style={{
                        fontSize: "10px",
                        color: "red",
                        fontWeight: "500",
                      }}
                    >
                      Please Enter a Age
                    </div>
                  )}
                </td>
                <td>
                  {tableEdit && editIndex === index
                    ? genderObj.map((items, index) => {
                        return (
                          <div key={index + 1} style={{ display: "flex" }}>
                            <input
                              type="radio"
                              id={index}
                              name="gender"
                              value={items.value}
                              className="tablegender"
                              checked={tableData.gender === items.value}
                              onChange={(e) => {
                                tableEventHandler(e);
                              }}
                            />
                            <label htmlFor={items.value}>{items.value}</label>
                          </div>
                        );
                      })
                    : val.gender}
                </td>
                <td>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      marginTop: "30px",
                    }}
                  >
                    {tableEdit == true && editIndex == index ? (
                      <input
                        type="number"
                        id="mobilenumber"
                        name="mobilenumber"
                        onKeyDown={(e) => {
                          exceptThisSymbols.includes(e.key) && e.preventDefault();
                        }}
                        value={tableData.mobileNumber}
                        autoComplete="off"
                        onChange={tableEventHandler}
                      />
                    ) : (
                      val.mobile
                    )}
                    {tableData.mobileNumber.length === 10 &&
                    tableEdit &&
                    editIndex == index ? (
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
                      tableData.mobileNumber !== "" &&
                      tableEdit &&
                      editIndex == index && (
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
                  <br></br>
                  {isTableSave &&
                    tableData.mobileNumber === "" &&
                    tableEdit &&
                    editIndex == index && (
                      <div
                        style={{
                          fontSize: "10px",
                          color: "red",
                          fontWeight: "500",
                        }}
                      >
                        Please enter mobile number
                      </div>
                    )}
                  {isTableSave &&
                    tableEdit &&
                    tableData.mobileNumber.length > 0 &&
                    tableData.mobileNumber.length < 10 &&
                    editIndex == index && (
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
                </td>
                <td>
                  {tableEdit == true && editIndex == index
                    ? skillsVal.map(
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
                      )
                    : val.skills.length !== 0 && (
                        <p>{[val.skills.join(" , ")]}</p>
                      )}
                </td>
                <td>
                  {!tableEdit ? (
                    <button
                      onClick={() => {
                        tableEditValue(val);
                        setEditIndex(index);
                        setTableEdit(true);
                        setIsSubmitTable(true);
                      }}
                      disabled={deleteTable}
                    >
                      edit
                    </button>
                  ) : tableEdit && editIndex === index ? (
                    <button
                      onClick={() => {
                        updateStudent();
                        setIsSubmitTable(false);
                        // checkBoxSave();
                        setIsTableSave(true);
                      }}
                    >
                      Save
                    </button>
                  ) : (
                    tableEdit &&
                    editIndex !== index && (
                      <button
                        onClick={() => {
                          tableEditValue(val);
                          setEditIndex(index);
                          setTableEdit(true);
                          setIsSubmitTable(true);
                        }}
                        disabled={deleteTable}
                      >
                        edit
                      </button>
                    )
                  )}
                </td>
                <td style={{ borderRight: "0px" }}>
                  <button
                    className="delete-Button"
                    onClick={() => {
                      document
                        .querySelector(".alert-box")
                        .classList.add("active");
                      setDelIndex(index);
                      setDeleteTable(true);
                    }}
                    disabled={tableEdit ? true : false}
                  >
                    delete
                  </button>
                </td>
              </tr>
            ))}
          </table>
        </div>
      )}
    </>
  );
}

export default FormTaskTable;
