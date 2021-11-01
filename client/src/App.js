import Header from './components/Header';
import ParkingPermitTable from './components/ParkingPermitTable';
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PermitForm from './components/PermitForm';
import Footer from './components/Footer';

const API_URL = 'http://localhost:8080/api/permit';

const App = () => {
  const [permits, setPermits] = useState([]);

  useEffect(() => {
    const getPermits = async () => {
      const permitsFromServer = await fetchPermits();
      setPermits(permitsFromServer);
    }

    getPermits()
  }, [])

  // Fetch Permits
  const fetchPermits = async () => {
    const permits = await fetch(API_URL)
                          .then((res) => res.json())
                          .catch((err) => {
                            console.log(err)
                            return [];
                          });

    return permits;
  }

  // Fetch Permit
  const fetchPermit = async (id) => {
    const permit = await fetch(`${API_URL}/${id}`).then((res) => res.json());

    return permit;
  }

  // Create Permit
  const createPermit = async(permit) => {
    const newPermit = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(permit)
    }).then((res) => res.json())

    setPermits([...permits, newPermit]);
  }

   // Update Permit
   const updatePermit = async(id, permit) => {
    const updatedPermit = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(permit)
    }).then((res) => res.json())

    setPermits(permits.map((permit) => permit.id === id ? updatedPermit : permit));
  }

  // Delete Permit
  const deletePermit = async(id) => {
    await fetch(`${API_URL}/${id}`, {
      method: 'DELETE'
    });


    setPermits(permits.filter((permit) => permit.id !== id));
  }

  // Toggle Permit
  const togglePermit = async(id) => {
    const permitToToggle = await fetchPermit(id);
    const updatedPermit = { ...permitToToggle, enabled: !permitToToggle.enabled };

    const data = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updatedPermit)
    }).then((res) => res.json())

    setPermits(permits.map((permit) => permit.id === id ? { ...permit, enabled: data.enabled } : permit));
  }

  return (
    <Router>
      <Header />
      <Switch>
        <Route path='/' exact>
          <ParkingPermitTable permits={permits} onTogglePermit={togglePermit} onDeletePermit={deletePermit}/>
        </Route>
        <Route path={['/permit/:permitId', '/permit']}>
          <PermitForm fetchPermit={fetchPermit} createPermit={createPermit} updatePermit={updatePermit}/>
        </Route>
      </Switch>
      <Footer /> 
    </Router>
  );
}

export default App;
