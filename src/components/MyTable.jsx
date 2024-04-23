// Import necessary libraries and components
import React from "react";
import { useTable } from 'react-table';

// Define the MyTable functional component
export default function MyTable({ columns, data }) {

    // Destructure table hooks and methods from useTable hook
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({
        columns,
        data,
    });

    // Render the component
    return (

        // Render table with props from useTable hook
        <table className="custom-table" {...getTableProps()}>

            {/* Table Header */}
            <thead>
            {/* Map over header groups to render table headers */}
            {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                    {/* Map over columns to render individual headers */}
                    {headerGroup.headers.map(column => (
                        <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                    ))}
                </tr>
            ))}
            </thead>

            {/* Table Body */}
            <tbody {...getTableBodyProps()}>
            {/* Map over rows to render table rows */}
            {rows.map(row => {
                // Prepare row for rendering
                prepareRow(row);
                return (
                    <tr {...row.getRowProps()}>
                        {/* Map over cells to render individual table cells */}
                        {row.cells.map(cell => (
                            <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                        ))}
                    </tr>
                );
            })}
            </tbody>

        </table>
    );
}
