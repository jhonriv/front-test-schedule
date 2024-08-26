"use client";

import { apiAxios } from "@/app/utils/api";
export default function RegisterEmployee() {
  async function handleSumit(e: any) {
    e.preventDefault();

    // Read the form data
    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());

    // You can pass formData as a fetch body directly:
    try {
      const response = await apiAxios("/employees", {
        method: form.method,
        body: formJson,
      });
      console.log("Response:", response);
    } catch (error) {
      console.error("Error:", error);
    }
  }
  function resetForm(e: any) {
    e.target.reset();
  }
  return (
    <form
      className="col-lg-8 offset-lg-2 p-5 border rounded shadow"
      method="post"
      onSubmit={handleSumit}
      onReset={resetForm}
    >
      <h2 className="text-center mb-4">Register Employee</h2>
      <div>
        <div className="form-group">
          <label htmlFor="inputDNI" className="form-label">
            Card ID
          </label>
          <input
            type="number"
            className="form-control"
            name="cardId"
            id="inputDNI"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="inputName" className="form-label">
            First Name
          </label>
          <input
            type="text"
            className="form-control"
            name="name"
            id="inputName"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="inputLastName" className="form-label">
            Last Name
          </label>
          <input
            type="text"
            className="form-control"
            name="lastName"
            id="inputLastName"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="inputBirthDate" className="form-label">
            Birth Date
          </label>
          <input
            type="date"
            className="form-control"
            name="birthDate"
            id="inputBirthDate"
          />
        </div>
      </div>
      <div className="row">
        <div className="d-flex justify-content-center mt-5 col">
          <button className="btn btn-info" type="reset">
            Clear
          </button>
        </div>
        <div className="d-flex justify-content-center mt-5 col">
          <button className="btn btn-success" type="submit">
            Save Employee
          </button>
        </div>
      </div>
    </form>
  );
}
