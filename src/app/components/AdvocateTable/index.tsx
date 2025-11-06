import React from "react";
import type { Advocate } from "../../../db/schema";

interface AdvocateTableProps {
  advocates: Advocate[];
}

export const AdvocateTable = ({ advocates }: AdvocateTableProps) => {
  return (
    <table className="w-full text-sm text-left mb-12 bg-white border border-solid border-gray-300">
      <thead>
        <tr>
          <th className="p-2" key="first-name">
            First Name
          </th>
          <th className="p-2" key="last-name">
            Last Name
          </th>
          <th className="p-2" key="city">
            City
          </th>
          <th className="p-2" key="degree">
            Degree
          </th>
          <th className="p-2 w-2/5" key="specialties">
            Specialties
          </th>
          <th className="p-2" key="years-of-experience">
            Years of Experience
          </th>
          <th className="p-2" key="phone-number">
            Phone Number
          </th>
        </tr>
      </thead>
      <tbody>
        {advocates.map((advocate) => {
          return (
            <tr
              className="border-b border-b-solid border-gray-200"
              key={advocate.firstName}
            >
              <td className="p-2 pt-3 align-top">{advocate.firstName}</td>
              <td className="p-2 pt-3 align-top">{advocate.lastName}</td>
              <td className="p-2 pt-3 align-top">{advocate.city}</td>
              <td className="p-2 pt-3 align-top">{advocate.degree}</td>
              <td className="p-2 flex flex-wrap gap-2">
                {Array.isArray(advocate.specialties) &&
                  advocate.specialties.map((s: string, i: number) => (
                    <span
                      className="p-2 text-xs break-word bg-yellow-200"
                      key={`${s}-${i}`}
                    >
                      {s}
                    </span>
                  ))}
              </td>
              <td className="p-2 pt-3 align-top">
                {advocate.yearsOfExperience}
              </td>
              <td className="p-2 pt-3 align-top">{advocate.phoneNumber}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
