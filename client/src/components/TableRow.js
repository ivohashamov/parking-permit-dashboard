import React from 'react'
import TableCell from './TableCell'

const TableRow = ({ data }) => {
    

    return (
        <tr>
            <TableCell data={data.plate} />
            <TableCell data={data.country} />
            <TableCell data={data.startDate}/>
            <TableCell data={data.endDate}/>
            <TableCell data={data.owner}/>
        </tr>
    )
}

export default TableRow
