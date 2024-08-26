"use client";

import { apiAxios } from "@/app/utils/api";
import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";

export default function UpdateEmployee() {
  const { id } = useParams();
  let successEmployee = useRef(false);
  const [employee, setEmployee] = useState<any>({});
  const [showEmployee, setShowEmployee] = useState<any>({});

  useEffect(() => {
    getEmployee();
  }, []);

  async function handleSumit(e: any) {
    e.preventDefault();

    // Read the form data
    const formData = new FormData(e.target);
    const formJson = Object.fromEntries(formData.entries());
    setEmployee(formJson);
    // You can pass formData as a fetch body directly:
    try {
      const response = await apiAxios(`/employees`, {
        method: "PUT",
        body: { ...formJson, id: id },
      });
      console.log("Response:", response);
    } catch (error) {
      console.error("Error:", error);
    }
  }
  async function getEmployee() {
    if (successEmployee.current) return;
    // You can pass formData as a fetch body directly:
    try {
      const response = await apiAxios(`/employees/${id}`, {
        method: "GET",
      });
      console.log("Response:", response);
      setEmployee(response);
      setShowEmployee(response);
      successEmployee.current = true;
    } catch (error) {
      console.error("Error:", error);
    }
  }
  return (
    <form
      className="col-lg-8 offset-lg-2 p-5 border rounded shadow"
      method="put"
      onSubmit={handleSumit}
    >
      <h2 className="text-center mb-4">Update Employee</h2>
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
            value={employee.cardId}
            onChange={(e) =>
              setEmployee({ ...employee, cardId: e.target.value })
            }
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
            value={employee.name}
            onChange={(e) => setEmployee({ ...employee, name: e.target.value })}
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
            value={employee.lastName}
            onChange={(e) =>
              setEmployee({ ...employee, lastName: e.target.value })
            }
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
            value={employee.birthDate}
            onChange={(e) =>
              setEmployee({ ...employee, birthDate: e.target.value })
            }
            id="inputBirthDate"
          />
        </div>
      </div>
      <div className="d-flex justify-content-center mt-5">
        <button className="btn btn-success" type="submit">
          Update Employee
        </button>
      </div>
    </form>
  );
}
