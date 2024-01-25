// src/App.tsx
import axios from 'axios';
import UserTable from './components/UserTable';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {useState} from "react";

export interface User {
    email: string;
    gender: string;
    dob: { age: number };
    name: { first: string; last: string };
    phone: string;
    picture: { thumbnail: string };
}

const App = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [originalUsers, setOriginalUsers] = useState<User[]>([]);
    const [isDataLoaded, setIsDataLoaded] = useState(false);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('https://randomuser.me/api/?results=20');
            setOriginalUsers(response.data.results);
            setUsers(response.data.results);
            setIsDataLoaded(true);
        } catch (error) {
            console.error('Erreur lors de la récupération des utilisateurs', error);
        }
    };

    const filterByGender = ({gender}: { gender: any }) => {
        setUsers(originalUsers.filter(user => user.gender === gender));
    };

    const sortUsersByAge = ({ascending}: { ascending: any }) => {
        setUsers([...users].sort((a, b) => ascending ? a.dob.age - b.dob.age : b.dob.age - a.dob.age));
    };

    const resetUsers = () => {
        setUsers([]);
        setIsDataLoaded(false);
    };

    return (
        <div className="container mt-5">
            <h1>Annuaire des utilisateurs</h1>
            <div className="mb-3">
                <button onClick={() => fetchUsers()} className="btn btn-primary mr-2" disabled={isDataLoaded}>Afficher le tableau</button>
                <button onClick={() => filterByGender({gender: 'female'})} className="btn btn-primary mr-2">Utilisateurs femmes</button>
                <button onClick={() => filterByGender({gender: 'male'})} className="btn btn-primary mr-2">Utilisateurs hommes</button>
                <button onClick={() => sortUsersByAge({ascending: true})} className="btn btn-primary mr-2">Utilisateurs les plus jeunes</button>
                <button onClick={() => sortUsersByAge({ascending: false})} className="btn btn-primary mr-2">Utilisateurs les plus âgés</button>
                <button onClick={resetUsers} className="btn btn-danger" disabled={!isDataLoaded}>Réinitialiser</button>
            </div>
            <p>Nombre d'utilisateurs : <span><strong>{users.length}</strong></span></p>
            {isDataLoaded ? <UserTable users={users} /> : <div className="alert alert-info"><p>Bonjour, aucun utilisateur n'est visible, n'hésitez pas à afficher le tableau.</p></div>}
        </div>
    );
};

export default App;