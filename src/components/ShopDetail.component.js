import React, {Component} from "react";
import Navbar from "react-bootstrap/Navbar";
import styled from 'styled-components'
import { useTable, useRowSelect } from 'react-table'

const Styles = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px solid black;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }
  }
`

const IndeterminateCheckbox = React.forwardRef(
    ({ indeterminate, ...rest }, ref) => {
        const defaultRef = React.useRef()
        const resolvedRef = ref || defaultRef

        React.useEffect(() => {
            resolvedRef.current.indeterminate = indeterminate
        }, [resolvedRef, indeterminate])

        return (
            <>
                <input type="checkbox" ref={resolvedRef} {...rest} />
            </>
        )
    }
)

function Table({ columns, data }) {
    // Use the state and functions returned from useTable to build your UI
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        selectedFlatRows,
        state: { selectedRowIds },
    } = useTable(
        {
            columns,
            data,
        },
        useRowSelect,
        hooks => {
            hooks.visibleColumns.push(columns => [
                // Let's make a column for selection
                {
                    id: 'selection',
                    // The header can use the table's getToggleAllRowsSelectedProps method
                    // to render a checkbox
                    Header: ({ getToggleAllRowsSelectedProps }) => (
                        <div>
                            <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
                        </div>
                    ),
                    // The cell can use the individual row's getToggleRowSelectedProps method
                    // to the render a checkbox
                    Cell: ({ row }) => (
                        <div>
                            <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
                        </div>
                    ),
                },
                ...columns,
            ])
        }
    )

    // Render the UI for your table
    return (
        <>
            <table {...getTableProps()}>
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
                {rows.slice(0, 10).map((row, i) => {
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
            </table>
            <pre>
        <code>
          {JSON.stringify(
              {
                  selectedRow: selectedRowIds,
                  'selected row data': selectedFlatRows.map(
                      d => d.original
                  ),
              },
              null,
              2
          )}
        </code>
      </pre>
        </>
    )
}

function ShopDetail() {
    let username = localStorage.getItem('username')
    console.log(username)
    const columns = React.useMemo(
        () => [
            {
                Header: 'ID',
                accessor: 'item_id'
            },
            {
                Header: 'Name',
                accessor: 'item_name',
            },
            {
                Header: 'Price',
                accessor: 'item_price',
            },
            {
                Header: 'Category',
                accessor: 'item_category',
            }
        ],
        []
    )

    const data = React.useMemo(() => [
        {
            item_id: 5,
            item_name: 'toothbrush',
            item_price: 28,
            item_category: 'dental'
        },
        {
            item_id: 29,
            item_name: 'shotgun',
            item_price: 500,
            item_category: 'Firearms'
        },
        {
            item_id: 17,
            item_name: 'Pizza',
            item_price: .5,
            item_category: 'Foods'
        },
        {
            item_id: 89,
            item_name: 'Laptop',
            item_price: 800,
            item_category: 'Computers'
        }
    ], [])

    return (
        <Styles>
            <Navbar bg="light" variant="light" >
            <Navbar.Brand href='/shopDetail'> Welcome to ShopFirst Shopping Mart, {username}!</Navbar.Brand>
            </Navbar>
            <Table columns={columns} data={data} />
        </Styles>
    )
}

export default ShopDetail
