import { Advocate } from "@/db/schema";
import React from "react";

interface TableData {
  headers: { key: keyof Advocate, label: string }[];
  data: any[];
}

export const AdvocateTable = ({ data, headers }: TableData) => {
  return (
    <table className="table-fixed">
      <thead>
        <tr>
          {headers.map((header) => (
            <th key={header.key}>{header.label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr key={row.id}>
            {headers.map((header) => (
              <td key={`${header.key}-${row.id}`} className="my-2 py-2">
                {header.key === "specialties" ? (
                  row[header.key].map((specialty: string, index: number) => (
                    <span key={`${header.key}-${index}`} className="text-xs bg-yellow-200 p-1 m-1">{specialty}</span>
                  ))
                ) : (
                  row[header.key]
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
