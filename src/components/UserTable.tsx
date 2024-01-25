// src/components/UserTable.tsx
import { User } from '../App.tsx';

const UserTable = ({ users }: { users: User[] }) => {
    return (
        <table className="table table-hover">
            <thead>
            <tr>
                <th></th>
                <th>Nom</th>
                <th>Email</th>
                <th>Age</th>
                <th>Tel</th>
            </tr>
            </thead>
            <tbody>
            {users.map((user, index) => (
                <tr key={index}>
                    <td><img src={user.picture.thumbnail} alt="profil" /></td>
                    <td>{user.gender === 'male' ? '👨' : '👩'} {user.name.first} {user.name.last}</td>
                    <td>{user.email}</td>
                    <td>{user.dob.age}</td>
                    <td>{user.phone}</td>
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default UserTable;