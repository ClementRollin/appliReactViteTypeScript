// src/components/UserTable.tsx
import { User } from '../App.tsx';

interface UserTableProps {
    users: User[];
    onSort: (order: 'youngest' | 'oldest' | 'all') => void;
}
const UserTable = ({ users, onSort }: UserTableProps) => {
    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value as 'youngest' | 'oldest' | 'all';
        onSort(value);
    };
    return (
        <table className="table table-hover">
            <thead>
                <tr>
                    <th></th>
                    <th>Nom</th>
                    <th>Email</th>
                    <th className="age">
                        Age
                        <select onChange={handleSortChange} className="ml-2">
                            <option value="all">Tous</option>
                            <option value="youngest">Les plus jeunes</option>
                            <option value="oldest">Les plus âgés</option>
                        </select>
                    </th>
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