import React, { useMemo, useContext } from "react";
import { useTable } from "react-table";
import { VacanciesContext } from "../../VacanciesProvider";
// import { CleverTabs } from "../../../../global-components";
import { Loader } from "../../../../global-components";

import { COLUMNS } from "./columns";

import "./table.styles.css";
const CleverTable = () => {
  const { context } = useContext(VacanciesContext);
  const { application_data = {} } = context ?? {};
  const { vacancies = [] } = application_data ?? {};
  console.log("INSIDE CLEVER TABLE:", vacancies);

  const transformData = (data: any) =>
    data.map((item: any) => {
      return {
        ...item,
        salary: `$${item?.salary?.from} - ${item?.salary?.to}`,
      };
    });

  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => transformData(vacancies), [vacancies]);
  const tableInstance = useTable({
    columns,
    data,
  });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance;

  return (
    <>
      <table {...getTableProps()}>
        {vacancies.length > 0 ? (
          <>
            <thead>
              {
                // Loop over the header rows
                headerGroups.map((headerGroup) => (
                  // Apply the header row props
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {
                      // Loop over the headers in each row
                      headerGroup.headers.map((column) => (
                        // Apply the header cell props
                        <th {...column.getHeaderProps()}>
                          {
                            // Render the header
                            column.render("Header")
                          }
                        </th>
                      ))
                    }
                  </tr>
                ))
              }
            </thead>
            {/* Apply the table body props */}
            <tbody {...getTableBodyProps()}>
              {
                // Loop over the table rows
                rows.map((row) => {
                  // Prepare the row for display
                  prepareRow(row);
                  return (
                    // Apply the row props
                    <tr {...row.getRowProps()}>
                      {
                        // Loop over the rows cells
                        row.cells.map((cell) => {
                          // Apply the cell props
                          return (
                            <td
                              {...cell.getCellProps()}
                              onClick={() => console.log("ROW CLICKED:", cell.row.values)}
                            >
                              {
                                // Render the cell contents
                                cell.render("Cell")
                              }
                            </td>
                          );
                        })
                      }
                    </tr>
                  );
                })
              }
            </tbody>
          </>
        ) : (
          <p style={{ textAlign: "center" }}>
            <Loader />
          </p>
        )}
      </table>
    </>
  );
};

export default CleverTable;
