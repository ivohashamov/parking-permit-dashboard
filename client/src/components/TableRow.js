import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTimes } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

const TableRow = ({ permit, onToggle, onDelete }) => {
    

    return (
        <tr className={permit.enabled ? '' : 'disabled'}>
            <td>{permit.plate}</td>
            <td>{permit.country}</td>
            <td>{permit.startDate}</td>
            <td>{permit.endDate}</td>
            <td>{permit.owner}</td>
            <td>
                <button 
                    className='btn' 
                    style={{ backgroundColor: '#281e6f' }}
                    onClick={() => onToggle(permit.id)}
                >
                    {permit.enabled ? 'Disable' : 'Enable'}
                </button>
                <Link to={`/permit/${permit.id}`}>
                    <button className='btn' type='button' title='Edit' style={{ backgroundColor: '#6b7280' }}>
                        <FontAwesomeIcon icon={faEdit} />
                    </button>
                </Link>
                <button 
                    className='btn' 
                    type='button' 
                    title='Delete' 
                    style={{ backgroundColor: '#6b7280' }}
                    onClick={() => onDelete(permit.id)}
                >
                    <FontAwesomeIcon icon={faTimes} />
                </button>
            </td>
        </tr>
    )
}

export default TableRow
