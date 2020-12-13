import React from 'react'
import styled from 'react-table'
import { useTable, useSortBy, usePagination } from 'react-table'


const tableColumns = [
    {
        Header:'Title',
        accessor:'title'
    },
    {
        Header:'Word Count',
        accessor:'wordCount'
    },
    {
        Header:'Snippet',
        accessor:'snippet'
    },
    {
        Header:'Timestamp',
        accessor:'timestamp'
    },
    {
        Header:'Link To Page',
        accessor:'pageLink'
    }
]

const Table = ({ searchData }) => {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        rows,
        prepareRow
    } = useTable({
            tableColumns,
            searchData,
            initialState: {
                pageSize: 10,
                pageIndex: 1
            }
        }, 
        useSortBy,
        usePagination
    )

    return (
        <table {...getTableProps()}>
            <thead>
                { headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                            <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                {column.render("Header")}
                                <span>
                                    {column.isSorted ? (column.isSortedDesc ? 'x' : '^') : ''}
                                </span>
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {
                    page.map((row, i) => {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()}>
                                { row.cells.map(cell => {
                                    return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                                })}
                            </tr>
                        )
                })}
            </tbody>
        </table>
    )
}

const Results = ({ searchData }) => {
    return (
        <React.Fragment>
            {
                searchData.length > 0 ? 
                    <Table /> 
                    : 
                    <div>Loading...</div>
            }
        </React.Fragment>        
    )
}

export default Results
