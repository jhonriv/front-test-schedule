"use client";

import { apiAxios } from "@/app/utils/api";
import { useEffect, useRef, useState } from "react";

export default function RegisterSchedule() {
  let successEmployee = useRef(false);
  let employees: any = [];
  let [OptionsEmployees, setOptionsEmployees] = useState<any[]>([
    employees.map((employee: any) => (
      <option key={employee.id} value={employee.id}>
        {employee.name} {employee.lastName}
      </option>
    )),
  ]);
  const getEmployees = async () => {
    if (successEmployee.current) return;
    const response = await apiAxios("/employees", {
      method: "GET",
    });
    employees = response;
    console.log(employees);
    setOptionsEmployees(
      employees.map((employee: any) => (
        <option key={employee.id} value={employee.id}>
          {employee.name} {employee.lastName}
        </option>
      ))
    );
    successEmployee.current = true;
  };

  useEffect(() => {
    getEmployees();
  });

  async function handleSumit(e: any) {
    e.preventDefault();

    // Read the form data
    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());

    // You can pass formData as a fetch body directly:
    const response = await apiAxios("/employees", {
      method: "POST",
      body: formJson,
    });

    alert("success");

    console.log("response", response);
  }
  function resetForm(e: any) {
    e.target.reset();
  }

  return (
    <form
      className="col-lg-8 offset-lg-2 p-5 border rounded shadow needs-validation"
      method="post"
      onSubmit={handleSumit}
      onReset={resetForm}
    >
      <h2 className="text-center mb-4">Register Schedule</h2>
      <div>
        <div>
          <label className="form-label" htmlFor="inputName">
            Employee
          </label>
          <select
            className="form-select"
            name="employeeId"
            id="inputName"
            required
          >
            {OptionsEmployees}
          </select>
        </div>

        <div>
          <label className="form-label" htmlFor="inputName">
            Work Date
          </label>
          <input
            type="date"
            className="form-control"
            name="workDate"
            id="inputBirthdDate"
            required
          />
        </div>
        <div>
          <label className="form-label" htmlFor="inputName">
            Start Time
          </label>
          <input
            type="time"
            className="form-control"
            name="startTime"
            id="inputBirthdDate"
            required
          />
        </div>
        <div>
          <label className="form-label" htmlFor="inputName">
            end Time
          </label>
          <input
            type="time"
            className="form-control"
            name="endTime"
            id="inputBirthdDate"
            required
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
            Save Schedule
          </button>
        </div>
      </div>
    </form>
  );
}
