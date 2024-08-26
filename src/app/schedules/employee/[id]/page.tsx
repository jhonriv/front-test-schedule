"use client";

import { apiAxios } from "@/app/utils/api";
import Link from "next/link";
import { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "next/navigation";

export default function IndexSchedules() {
  const { id } = useParams();
  let successSchedule = useRef(false);
  const [employeeName, setEmployeeName] = useState<any>("");
  let [RowsSchedules, setRowsSchedules] = useState<any[]>([]);

  async function getSchedules() {
    if (successSchedule.current) return;
    // You can pass formData as a fetch body directly:
    try {
      let employee = await apiAxios(`/employees/${id}`, {
        method: "GET",
      });
      console.log("employee", employee);
      const response = await apiAxios(`/employees/${id}/schedules`, {
        method: "GET",
      });
      console.log("Response:", response);
      setEmployeeName(`${employee.name} ${employee.lastName}`);
      setRowsSchedules(
        response.map((row: any) => {
          return (
            <tr key={row.id}>
              <td>{row.workDate}</td>
              <td>{row.startTime}</td>
              <td>{row.endTime}</td>
              <td>
                <Link href={`/updateSchedule/${row.id}`}>
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
      successSchedule.current = true;
    } catch (error) {
      console.error("Error:", error);
    }
  }

  getSchedules();
  return (
    <form
      className="col-lg-8 offset-lg-2 p-5 border rounded shadow"
      method="post"
    >
      <h2 className="text-center mb-4">List of Schedules</h2>
      <h4 className="text-center mb-4">{employeeName}</h4>
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th scope="col">Work Date</th>
            <th scope="col">Start Time</th>
            <th scope="col">End Time</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>{RowsSchedules}</tbody>
      </table>
      <div className="d-flex justify-content-center mt-5">
        <a className="btn btn-primary" href={`/registerSchedule`}>
          Register New Schedule
        </a>
      </div>
    </form>
  );
}
