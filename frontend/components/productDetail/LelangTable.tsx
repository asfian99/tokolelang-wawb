import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/outline";
import clsx from "clsx";
import React, { useMemo } from "react";
import { Column, useGlobalFilter, useSortBy, useTable } from "react-table";
import { formatRupiah } from "../../lib/formatCurrency";
import { formatDate } from "../../lib/formatDateTime";
import { TransactionItemResponse } from "../../lib/mutations/transactionMutations";

interface LelangTableProps {
  data: TransactionItemResponse[];
}

const LelangTable = (props: LelangTableProps) => {
  const columns = useMemo<Column<TransactionItemResponse>[]>(
    () => [
      {
        Header: "Username",
        accessor: "username" as keyof TransactionItemResponse,
      },
      {
        Header: "Waktu",
        accessor: "datetime" as keyof TransactionItemResponse,
      },
      {
        Header: "Nilai",
        accessor: "bid" as keyof TransactionItemResponse,
      },
    ],
    []
  );

  const data = React.useMemo(() => {
    const topTen = props.data.slice(0, 10);
    const list = topTen.map((tran) => ({
      username: tran.username,
      datetime: formatDate(tran.updated_at),
      bid: formatRupiah(tran.bid_value),
    }));
    return list;
  }, [props.data]);

  const initialState = { sortBy: [{ id: "bid", desc: true }] };
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    // @ts-ignore
    useTable({ columns, data, initialState }, useGlobalFilter, useSortBy);

  return (
    <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
        <div className="overflow-hidden border-2 border-gray-300 sm:rounded-xl md: rounded-2xl">
          <table {...getTableProps()} className="min-w-full ">
            <thead className="bg-gray-100">
              {headerGroups.map((headerGroup, i) => (
                <tr {...headerGroup.getHeaderGroupProps()} key={i}>
                  {headerGroup.headers.map((column, i) => (
                    <th
                      // @ts-ignore
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                      key={i}
                      scope="col"
                      className="px-6 py-3 text-xs font-semibold tracking-wider text-left text-gray-700 uppercase"
                    >
                      <p className="flex flex-row">
                        {column.render("Header")}
                        <span>
                          {/* @ts-ignore */}
                          {column.isSorted ? (
                            // @ts-ignore
                            column.isSortedDesc ? (
                              <ChevronDownIcon className="w-4 h-4 ml-4" />
                            ) : (
                              <ChevronUpIcon className="w-4 h-4 ml-4" />
                            )
                          ) : (
                            <ChevronUpIcon className="invisible w-4 h-4 ml-4" />
                          )}
                        </span>
                      </p>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map((row, i) => {
                prepareRow(row);
                return (
                  <tr
                    {...row.getRowProps()}
                    key={i}
                    className={clsx(
                      "bg-white",
                      i === data.length - 1 ? "" : "bg-white border-b"
                    )}
                  >
                    {row.cells.map((cell, i) => {
                      return (
                        <td
                          {...cell.getCellProps()}
                          key={i}
                          className={clsx(
                            "px-6 py-4 text-sm",
                            i === 0
                              ? "whitespace-nowrap  font-medium text-text-d"
                              : " text-gray-500 whitespace-nowrap"
                          )}
                        >
                          {cell.render("Cell")}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LelangTable;
