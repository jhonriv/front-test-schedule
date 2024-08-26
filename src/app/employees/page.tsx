"use client";

import { apiAxios } from "@/app/utils/api";
import Link from "next/link";
import { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faClock } from "@fortawesome/free-solid-svg-icons";

export default function IndexEmployees() {
  let successEmployee = useRef(false);
  let [RowsEmployees, setRowsEmployees] = useState<any[]>([]);

  async function getEmployees() {
    if (successEmployee.current) return;
    // You can pass formData as a fetch body directly:
    try {
      const response = await apiAxios("/employees", {
        method: "GET",
      });
      console.log("Response:", response);
      setRowsEmployees(
        response.map((employee: any) => {
          return (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.name}</td>
              <td>{employee.lastName}</td>
              <td>{employee.birthDate}</td>
              <td>
                <div className="row">
                  <div className="col">
                    <Link href={`/employees/update/${employee.id}`}>
                      <FontAwesomeIcon
                        icon={faPencilAlt}
                        style={{ fontSize: "16px" }}
                      />
                    </Link>
                  </div>
                  <div className="col">
                    <Link href={`/schedules/employee/${employee.id}`}>
                      <FontAwesomeIcon
                        icon={faClock}
                        style={{ fontSize: "16px" }}
                      />
                    </Link>
                  </div>
                </div>
              </td>
            </tr>
          );
        })
      );
      successEmployee.current = true;
    } catch (error) {
      console.error("Error:", error);
    }
  }

  getEmployees();
  return (
    <form
      className="col-lg-8 offset-lg-2 p-5 border rounded shadow"
      method="post"
    >
      <h2 className="text-center mb-4">List of Employees</h2>
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th scope="col">Card Id</th>
            <th scope="col">First Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">Birth Date</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>{RowsEmployees}</tbody>
      </table>
      <div className="d-flex justify-content-center mt-5">
        <a className="btn btn-primary" href={`/employees/register`}>
          Register New Employee
        </a>
      </div>
    </form>
  );
}
