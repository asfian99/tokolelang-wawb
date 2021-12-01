import React, { useMemo } from "react";
import Link from "next/link";
import clsx from "clsx";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/outline";
import { Column, useGlobalFilter, useSortBy, useTable } from "react-table";
import DilelangkanDetailModal from "./DilelangkanDetailModal";
import { ItemResponse } from "../../lib/mutations/itemMutations";
import { formatSlug } from "../../lib/formatString";
import { formatDateTime } from "../../lib/formatDateTime";

interface DilelangkanTableProps {
  data: ItemResponse[];
}

const DilelangkanTable = (props: DilelangkanTableProps) => {
  const columns = useMemo<Column<ItemResponse>[]>(
    () => [
      { Header: "Nama Barang", accessor: "name" as keyof ItemResponse },
      {
        Header: "Harga Pembukaan",
        accessor: "open_bid" as keyof ItemResponse,
      },
      {
        Header: "Waktu Penutupan",
        accessor: "closing_time" as keyof ItemResponse,
      },
      // {
      //   Header: "Penggalangan Dana",
      //   accessor: "fundraising" as keyof ItemResponse,
      // },
      { Header: "Lokasi ", accessor: "location" as keyof ItemResponse },
      { Header: "Event", accessor: "event" as keyof ItemResponse },
      { Header: "Aksi", accessor: "action" as keyof ItemResponse },
    ],
    []
  );

  const data = React.useMemo(() => {
    const temp = props.data?.map((item: ItemResponse) => {
      return {
        ...item,
        open_bid: "Rp " + item.open_bid,
        closing_time: formatDateTime(item.closing_time),
        fundraising: item.fundraising ? "Ya" : "Tidak",
        event: item.event || "-",
        action: (
          <Link href={`/halaman-pelelang/${formatSlug(item.name, item.id)}`}>
            <a className="cursor-pointer text-primary hover:text-primary-d hover:underline">
              Detail
            </a>
          </Link>
        ),
      };
    });

    return temp;
  }, [props.data]);

  const initialState = { sortBy: [{ id: "closing_time", asc: true }] };
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

export default DilelangkanTable;
