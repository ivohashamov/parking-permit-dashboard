import React from 'react'
import TableRow from './TableRow'

const ParkingPermitTable = ({ permits, onTogglePermit, onDeletePermit }) => {
    return (
        <main>
            <table>
                <thead>
                    <tr>
                        <th>License Plate</th>
                        <th>Country</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Owner Name</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {permits.map((row, index) => {return <TableRow key={index} permit={row} onToggle={onTogglePermit} onDelete={onDeletePermit}/>})}
                </tbody>
            </table>
        </main>
    )
}

export default ParkingPermitTable
