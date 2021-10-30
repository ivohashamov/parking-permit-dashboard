import React from 'react'
import TableRow from './TableRow'

const ParkingPermitTable = ({ permits }) => {
    return (
        <table>
            <tr>
                <th>License Plate</th>
                <th>Country</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Owner Name</th>
            </tr>
            {permits.map((row, index) => {return <TableRow key={index} data={row}/>})}
        </table>
    )
}

export default ParkingPermitTable
