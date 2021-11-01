import React from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './PermitForm.css'

const PermitForm = ({ fetchPermit, createPermit, updatePermit }) => {
    let history = useHistory()
    const { permitId } = useParams();
    const [permit, setPermit] = useState({})
    useEffect(() => {
        if (permitId) {
            const getPermit = async () => {
                const permitFromServer = await fetchPermit(permitId);
                setPermit(permitFromServer)
            }
    
            getPermit()
        }
    }, [permitId, fetchPermit])

    const onSubmit = (e) => {
        if (permitId) {
            updatePermit(permitId, permit);
        } else {
            createPermit(permit);
        }
        history.push('/')
    }

    return (
        <main>
            <form className='add-form' onSubmit={onSubmit}>
                <div className='form-control'>
                    <label>License Plate <span>*</span></label>
                    <input type="text" value={permit.plate} onChange={(e) => setPermit({...permit, plate: e.target.value})} required></input>
                </div>
                <div className='form-control'>
                    <label>Country of License Plate <span>*</span></label>
                    <select value={permit.country} onChange={(e) => setPermit({...permit, country: e.target.value})}>
                        <option value='GERMANY'>Germany</option>
                        <option value='SWITZERLAND'>Switzerland</option>
                        <option value='AUSTRIA'>Austria</option>
                        <option value='FRANCE'>France</option>
                    </select>
                </div>
                <div className='form-control'>
                    <label>Start Date</label>
                    <input type="date" value={permit.startDate} onChange={(e) => setPermit({...permit, startDate: e.target.value})}></input>
                </div>
                <div className='form-control'>
                    <label>End Date</label>
                    <input type="date" value={permit.endDate} onChange={(e) => setPermit({...permit, endDate: e.target.value})}></input>
                </div>
                <div className='form-control'>
                    <label>Owner Name</label>
                    <input type="text" value={permit.owner} onChange={(e) => setPermit({...permit, owner: e.target.value})}></input>
                </div>
                <div className='form-control form-control-check'>
                    <label>Enabled</label>
                    <input type="checkbox" value={permit.enabled} checked={permit.enabled} onChange={(e) => setPermit({...permit, enabled: e.currentTarget.checked})}></input>
                </div>
                <div className='form-buttons'>
                    <input type='submit' value='Save Permit' className='btn'/>
                    <Link to='/'>
                        <button className='btn' type='button' style={{ backgroundColor: '#281e6f' }}>Cancel</button>
                    </Link>
                </div>
            </form>
        </main>
    )
}

export default PermitForm
