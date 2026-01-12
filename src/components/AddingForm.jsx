import React, { useState, useEffect } from "react";
import useGlobalStore from "./store/GlobalStore";
import useAttendanceStore from "./store/UseAttendanceStore";

const Form = () => {
  const { formMode, editingStudentId } = useGlobalStore();
  const { studentsList, addStudent, updateStudent } = useAttendanceStore();
  
  const [formData, setFormData] = useState({
    fullName: "",
    profileUrl: "",
    rollNumber: "",
    registrationNumber: "",
    email: "",
    mobileNumber: "",
  });

  // Load student data when editing
  useEffect(() => {
    if (formMode === "update" && editingStudentId) {
      const student = studentsList.find((s) => s.id === editingStudentId);
      if (student) {
        setFormData({
          fullName: student.fullName || "",
          profileUrl: student.profileUrl || "",
          rollNumber: student.rollNumber || "",
          registrationNumber: student.registrationNumber || "",
          email: student.email || "",
          mobileNumber: student.mobileNumber || "",
        });
      }
    } else {
      // Reset form for add mode
      setFormData({
        fullName: "",
        profileUrl: "",
        rollNumber: "",
        registrationNumber: "",
        email: "",
        mobileNumber: "",
      });
    }
  }, [formMode, editingStudentId, studentsList]);

  const cancelForm = () => {
    useGlobalStore.getState().setFormFalse();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e?.preventDefault();

    if (formMode === "update" && editingStudentId) {
      updateStudent(editingStudentId, formData);
    } else {
      addStudent(formData);
    }

    useGlobalStore.getState().setFormFalse();
  };

  const inputStyle =
    "block w-full text-sm h-12.5 px-4 text-slate-900 bg-white rounded-lg border border-violet-200 appearance-none focus:border-transparent focus:outline-2 focus:outline-primary focus:ring-0 hover:border-brand-500-secondary- peer invalid:border-error-500 invalid:focus:border-error-500 overflow-ellipsis overflow-hidden text-nowrap pr-12";
  
  const labelStyle =
    "peer-placeholder-shown:-z-10 peer-focus:z-10 absolute text-[14px] leading-[150%] text-primary peer-focus:text-primary peer-invalid:text-error-500 focus:invalid:text-error-500 duration-300 transform -translate-y-[1.2rem] scale-75 top-2 z-10 origin-left bg-white disabled:bg-gray-50-background- px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-[1.2rem] rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1";

  const title = formMode === "update" ? "Update Student" : "Add New Student";
  const buttonText = formMode === "update" ? "Update Student" : "Save Student";

  return (
    <div className="fixed inset-0 bg-black/75 flex items-center justify-center z-40 pointer-events-auto">
      <form className="bg-white p-10 rounded-lg shadow-2xl max-w-2xl w-full mx-4" onSubmit={handleSubmit}>
        <div className="title">
          <h2 className="text-2xl font-semibold mb-6">{title}</h2>
        </div>
        <div className="grid grid-cols-2 gap-6 mb-10">
          <div id="input" className="relative">
            <input
              type="text"
              id="floating_outlined_fullName"
              required
              className={inputStyle}
              placeholder=" Enter Full name"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
            />
            <label htmlFor="floating_outlined_fullName" className={labelStyle}>
              Full name
            </label>
          </div>
          <div id="input" className="relative">
            <input
              type="url"
              id="floating_outlined_profileUrl"
              className={inputStyle}
              placeholder="Profile URL"
              name="profileUrl"
              value={formData.profileUrl}
              onChange={handleChange}
            />
            <label htmlFor="floating_outlined_profileUrl" className={labelStyle}>
              Profile URL
            </label>
          </div>
          <div id="input" className="relative">
            <input
              type="number"
              id="floating_outlined_rollNumber"
              required
              className={inputStyle}
              placeholder="Enter Roll number"
              name="rollNumber"
              value={formData.rollNumber}
              onChange={handleChange}
            />
            <label htmlFor="floating_outlined_rollNumber" className={labelStyle}>
              Roll number
            </label>
          </div>
          <div id="input" className="relative">
            <input
              type="number"
              id="floating_outlined_registrationNumber"
              required
              className={inputStyle}
              placeholder="Enter Registration number"
              name="registrationNumber"
              value={formData.registrationNumber}
              onChange={handleChange}
            />
            <label htmlFor="floating_outlined_registrationNumber" className={labelStyle}>
              Registration number
            </label>
          </div>
          <div id="input" className="relative">
            <input
              type="email"
              id="floating_outlined_email"
              required
              className={inputStyle}
              placeholder="E-mail"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            <label htmlFor="floating_outlined_email" className={labelStyle}>
              E-mail
            </label>
          </div>
          <div id="input" className="relative">
            <input
              type="tel"
              id="floating_outlined_mobileNumber"
              required
              className={inputStyle}
              placeholder="Mobile Number"
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleChange}
            />
            <label htmlFor="floating_outlined_mobileNumber" className={labelStyle}>
              Mobile Number
            </label>
          </div>
        </div>
        <div className="sm:flex sm:flex-row-reverse flex gap-4">
          {/* Submit triggers HTML5 required validation */}
          <button
            className="w-fit rounded-lg text-sm px-5 py-2 cursor-pointer focus:outline-none h-12.5 border bg-violet-500 hover:bg-violet-600 focus:bg-violet-700 border-violet-500-violet- text-white focus:ring-4 focus:ring-violet-200 hover:ring-4 hover:ring-violet-100 transition-all duration-300"
            type="submit"
          >
            <div className="flex gap-2 items-center">{buttonText}</div>
          </button>
          <button
            className="w-fit rounded-lg text-sm px-5 py-2 cursor-pointer focus:outline-none h-12.5 border bg-transparent border-primary text-primary focus:ring-4 focus:ring-gray-100"
            type="button"
            onClick={cancelForm}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
