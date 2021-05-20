import React, {useEffect, useState} from "react";
import Navbar from "react-bootstrap/Navbar";
import { useTable, useRowSelect } from 'react-table'
import services from "../services/services";
import styled from "styled-components";
import { Dropdown } from 'react-dropdown-now';
import 'react-dropdown-now/style.css';
const Styles = styled.div`
  padding: 2rem;
  dropdown{
    display: inline;
    width: 35%;
  }
  table {
    border-spacing: 1;
    border: 1px solid black;
    justifyContent:center;
    margin: 30px;
    margin-Top: 50px;
    width:85%;
    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 5;
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
function Table({ columns, data,  setSelectedRows}) {
    // Use the state and functions returned from useTable to build your UI
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        selectedFlatRows,
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

    useEffect(() => {
        const selected = selectedFlatRows.map(d => d.original);
        setSelectedRows(selected);
    }, [selectedFlatRows, setSelectedRows]);
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
    const [loadingData, setLoadingData] = useState(true);
    let [name, setNameValue] = useState("");
    let [category, setCategoryValue] = useState("");
    let [data, setData] = useState([]);
    const [selectedRows, setSelectedRows] = React.useState({});
    const handleSelect = (value) => {
        setCategoryValue(value.value)
        category = value.value;
        console.log(category)
        getData()
    };
    const handleChange = (e) => {
        console.log(e.target.value);
        setNameValue(e.target.value);
        name = e.target.value;
        getData()
    }
    async function getData() {
        if (category !== "" && name !== "") {
            let response = await services.getCategoryName({item_category: category, item_name: name})
            setData(response)
            setLoadingData(false);
        } else if (category !== "" && name === "") {
            let response = await services.getcategory({item_category: category})
            setData(response)
            setLoadingData(false);
        } else if (category === "" && name !== "") {
            let response = await services.getname({item_name: name})
            setData(response)
            setLoadingData(false);
        } else {
            let response = await services.getallitems()
            setData(response)
            setLoadingData(false);
        }
    }
    useEffect(() => {
        if (loadingData) {
            // if the result is not ready so you make the axios call
            getData();
        }
        let obj = JSON.parse(JSON.stringify(selectedRows,null,2))[0]
        if(obj!== undefined)
        {
            console.log((obj._id))
            console.log((obj.item_name))
        }
    }, [selectedRows]);

    return (
        <Styles>
            <div>
                <Navbar bg="light" variant="light">
                    <Navbar.Brand > Welcome to ShopFirst Shopping Mart, {username}!</Navbar.Brand>
                </Navbar>
                <div style={{display: 'flex', justifyContent: 'left', margin: "20px", marginTop: "20px"}}>
                    <Dropdown style={{width: "45%", float:"left"}}
                        placeholder="Select an category"
                        options={['dental', 'firearms', 'foods', "computers"]}
                        onChange={handleSelect}
                        onSelect={handleSelect} // always fires once a selection happens even if there is no change
                        onClose={(closedBySelection) => console.log('closedBySelection?:', closedBySelection)}
                        onOpen={() => console.log('open!')}
                    />
                    <input style={{width: "20%", float:"left",marginLeft:"10px", marginRight:"650px"}}type="text" name="Search item by name" onChange={handleChange} value={name}/>
                    <button style={{width: "12%", float:"left"}} onClick={()=>alert(JSON.stringify(selectedRows,null,2))}>Check out item</button>
                </div>
                <Table columns={columns} data={data} setSelectedRows={setSelectedRows}/>
            </div>
        </Styles>
    )
}

export default ShopDetail
