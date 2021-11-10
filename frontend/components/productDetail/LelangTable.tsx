import clsx from "clsx";
import React, { useMemo } from "react";
import { Column, TableOptions, useTable } from "react-table";
import type { PenawaranInterface } from "../../pages/lelang-terbuka/[slug]";

interface LelangTableProps {
  data: PenawaranInterface[];
}

const LelangTable = (props: LelangTableProps) => {
  const columns = useMemo<Column<PenawaranInterface>[]>(
    () => [
      {
        Header: "Username",
        accessor: "username" as keyof PenawaranInterface,
      },
      {
        Header: "Waktu Penawaran",
        accessor: "datetime" as keyof PenawaranInterface,
      },
      {
        Header: "Nilai Penawaran",
        accessor: "bid" as keyof PenawaranInterface,
      },
    ],
    []
  );

  const data = React.useMemo<PenawaranInterface[]>(
    () => props.data,
    [props.data]
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable<PenawaranInterface>({ columns, data });

  return (
    <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
        <div className="overflow-hidden border-2 border-gray-300 sm:rounded-xl md: rounded-2xl">
          <table {...getTableProps()} className="min-w-full ">
            <thead className="bg-gray-100">
              {
                // Loop over the header rows
                headerGroups.map((headerGroup) => (
                  // Apply the header row props
                  <tr
                    {...headerGroup.getHeaderGroupProps()}
                    key={headerGroup.id}
                  >
                    {
                      // Loop over the headers in each row
                      headerGroup.headers.map((column) => (
                        // Apply the header cell props
                        <th
                          {...column.getHeaderProps()}
                          key={column.id}
                          scope="col"
                          className="px-6 py-3 text-xs font-semibold tracking-wider text-left text-gray-700 uppercase"
                        >
                          {column.render("Header")}
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
                rows.map((row, i) => {
                  // Prepare the row for display
                  prepareRow(row);
                  return (
                    // Apply the row props
                    <tr
                      {...row.getRowProps()}
                      key={row.id}
                      className={
                        i === data.length - 1 ? "bg-white" : "bg-white border-b"
                      }
                    >
                      {
                        // Loop over the rows cells
                        row.cells.map((cell, i) => {
                          // Apply the cell props
                          return (
                            <td
                              {...cell.getCellProps()}
                              key={cell.column.id}
                              className={clsx(
                                "px-6 py-4 text-sm",
                                i === 0
                                  ? "whitespace-nowrap  font-medium text-gray-900"
                                  : " text-gray-500 whitespace-nowrap"
                              )}
                            >
                              {cell.render("Cell")}
                            </td>
                          );
                        })
                      }
                    </tr>
                  );
                })
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LelangTable;
