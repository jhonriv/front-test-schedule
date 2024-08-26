"use client";

import { apiAxios } from "@/app/utils/api";
import Link from "next/link";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";

export default function IndexSchedules() {
  let [RowsSchedules, setRowsSchedules] = useState<any[]>([]);
  let [totalHours, setTotalHours] = useState<any>(0);
  let successEmployee = useRef(false);
  let employees: any = [];
  let [OptionsEmployees, setOptionsEmployees] = useState<any[]>([
    employees.map((employee: any) => (
      <option key={employee.id} value={employee.id}>
        {employee.name} {employee.lastName}
      </option>
    )),
  ]);

  async function handleSumit(e: any) {
    e.preventDefault();

    // Read the form data
    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    console.log("formJson", formJson);
    try {
      // You can pass formData as a fetch body directly:
      const response = await apiAxios("/schedules/reports", {
        method: "POST",
        body: formJson,
      });
      let totals = 0;
      response.forEach((row: any) => {
        // diff in hours
        totals += diffHours(row.startTime, row.endTime);
      });
      setTotalHours(totals);
      setRowsSchedules(
        response.map((row: any) => {
          return (
            <tr key={row.id}>
              <td>{row.workDate}</td>
              <td>{row.startTime}</td>
              <td>{row.endTime}</td>
              <td>{diffHours(row.startTime, row.endTime)}</td>
              <td>
                <Link href={`/schedule/update/${row.id}`}>
                  <FontAwesomeIcon
                    icon={faPencilAlt}
                    style={{ fontSize: "16px" }}
                  />
                </Link>
              </td>
            </tr>
          );
        })
      );
    } catch (error) {
      console.error("Error:", error);
    }
  }

  function diffHours(startTimeStr: string, endTimeStr: string) {
    const startTime = moment(startTimeStr, "HH:mm");
    const endTime = moment(endTimeStr, "HH:mm");

    return endTime.diff(startTime, "hours");
  }

  const getEmployees = async () => {
    if (successEmployee.current) return;
    const response = await apiAxios("/employees", {
      method: "GET",
    });
    employees = response;
    employees.sort((a: any, b: any) => a.name.localeCompare(b.name));
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

  return (
    <form
      className="col-lg-8 offset-lg-2 p-5 border rounded shadow needs-validation"
      method="post"
      onSubmit={handleSumit}
    >
      <h2 className="text-left mb-4">List of Schedules</h2>
      <div className="row form-group mb-4">
        <div className="col-4">
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
        <div className="col-3">
          <label className="form-label" htmlFor="inputStartDate">
            StartDate
          </label>
          <input
            className="form-control"
            type="date"
            name="startDate"
            id="inputStartDate"
            required
          />
        </div>
        <div className="col-3">
          <label className="form-label" htmlFor="inputEndDate">
            EndDate
          </label>
          <input
            className="form-control"
            type="date"
            name="endDate"
            id="inputEndDate"
            required
          />
        </div>
        <div className="col-2">
          <button
            className="btn btn-primary"
            type="submit"
            style={{ marginTop: "30px" }}
          >
            Search
          </button>
        </div>
      </div>
      <div className="form-group">
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th scope="col">Work Date</th>
              <th scope="col">Start Time</th>
              <th scope="col">End Time</th>
              <th scope="col">Hours</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>{RowsSchedules}</tbody>
        </table>
        <div>Total Hours: {totalHours}</div>
        <div className="d-flex justify-content-center mt-5">
          <a className="btn btn-primary" href={`/registerSchedule`}>
            Register New Schedule
          </a>
        </div>
      </div>
    </form>
  );
}
