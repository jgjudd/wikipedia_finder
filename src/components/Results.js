import React, { useMemo } from 'react'
import styled from 'styled-components'
import { useTable, useSortBy, usePagination } from 'react-table'

// helper function to format the data for react-table
const dataBuilder = (inputDataObj) => {
    const keys = Object.keys(inputDataObj)
    const outputDataObject = []
    keys.map(key => {
        let searchResultsObject = inputDataObj[key]
        outputDataObject.push({
            title: searchResultsObject.title,
            wordcount: searchResultsObject.wordcount,
            snippet: <span dangerouslySetInnerHTML={{ __html: `${searchResultsObject.snippet}` }} />,
            timestamp: searchResultsObject.timestamp,
            pagelink: <LinkButton><a href={`http://en.wikipedia.org/?curid=${searchResultsObject.pageid}`}>Link To Page</a></LinkButton>
        })
    })
    return outputDataObject
}
const LinkButton = styled.button`
    background-color: ${`#f2f2f2`};
    color: ${`#650360`};
    border: 1px solid ${`#650360`};
    border-radius: 1.5rem;
    margin: 0.5rem;        
    min-height: 3rem;
    min-width: 12rem;
    font-size: 1.5rem;
    box-shadow: 0.1rem 0.1rem;

    & a {
        text-decoration: none;
        color: #650360;
    }
    & a:hover {
        text-decoration: none;
        color: #f2f2f2;
    }
    &:hover {
        background-color: ${`#650360`};
        color: ${`#FFFFFF`};
        box-shadow: 0.1rem 0.1rem;
    }
    &:active {
        background-color: ${`#8e0280`};
        transform: translateY(0.2rem);            
    }
    &:before,
    &:after,
    &:focus {
        outline: none;
    }
`
const StyledTable = styled.table`
    width: 80vw;
    min-height: 60vh;
    margin: 0 auto 1rem auto;
    
    font-size: 1.5rem;
    font-family: font-family: "Lato","HelveticaNeue-Regular","HelveticaNeue Regular","Helvetica Neue","Helvetica",Arial,"Lucida Grande",sans-serif;
    
    & th {
        background-color: #650360;
        color: white;
        font-size: 1.6rem;
        padding: 0.5rem;
    }
    & tr:nth-child(odd) {
        background-color: #f2f2f2;        
    }
    & tr:nth-child(even) {
        background-color: white;

    }
`
const Table = ({ columns, data }) => {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page, 
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: { pageIndex, pageSize },
      } = useTable(
        {
          columns,
          data,
          initialState: { pageIndex: 0, pageSize: 10 },
        },
        usePagination
      )
      return (
        <React.Fragment>
            <StyledTable {...getTableProps()}>
            <thead>
            {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                    <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                ))}
                </tr>
            ))}
            </thead>
            <tbody {...getTableBodyProps()}>
            {page.map((row, i) => {
                prepareRow(row)
                return (
                <tr {...row.getRowProps()}>
                    {row.cells.map(cell => {
                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                    })}
                </tr>
                )
            })}
            </tbody>
        </StyledTable>
        <div className="pagination">
            <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
            {'<<'}
            </button>{' '}
            <button onClick={() => previousPage()} disabled={!canPreviousPage}>
            {'<'}
            </button>{' '}
            <button onClick={() => nextPage()} disabled={!canNextPage}>
            {'>'}
            </button>{' '}
            <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
            {'>>'}
            </button>{' '}
            <span>
            Page{' '}
            <strong>
                {pageIndex + 1} of {pageOptions.length}
            </strong>{' '}
            </span>
            <span>
            | Go to page:{' '}
            <input
                type="number"
                defaultValue={pageIndex + 1}
                onChange={e => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0
                gotoPage(page)
                }}
                style={{ width: '100px' }}
            />
            </span>{' '}

        </div> 
        </React.Fragment>
    )
}

const Results = ({ searchData }) => {
    const dataArray = dataBuilder(searchData)
    const data = useMemo(() => dataArray, [])
    const columns = useMemo(
        () => [
            {
                Header:'Title',
                accessor:'title'
            },
            {
                Header:'Word Count',
                accessor:'wordcount'
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
                Header:'Page Link',
                accessor:'pagelink'
            }
        ],
        []
    )
    
    return (
        <Table columns={columns} data={dataArray} />  
    )
}
export default Results
