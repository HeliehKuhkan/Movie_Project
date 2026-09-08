import { useEffect, useState } from "react";
import { getAdminUsers,deleteAdminUser,makeAdmin,removeAdmin  } from "../../api/admin";
import "./AdminUsers.css";

function AdminUsers() {

    const [users, setUsers] = useState([]);

    const [currentPage, setCurrentPage] = useState(1); /* کدام صفحه */
    const usersPerPage = 6; /* تعداد در هر صفحه*/
    const totalPages = Math.ceil(users.length / usersPerPage);

    useEffect(() => {

        const loadUsers = async () => {

            try {

                const data = await getAdminUsers();
                setUsers(data);

            } catch (error) {

                console.log(error.message);

            }

        };

        loadUsers();

    }, []);

    const handleDelete = async (userId) => {

        const confirmed = window.confirm(
            "Are you sure you want to delete this user?"
        );

        if (!confirmed) {
            return;
        }

        try {

            await deleteAdminUser(userId);

            const updatedUsers = users.filter(
                user => user.id !== userId
            );

            setUsers(updatedUsers);

            alert("User deleted successfully!");

        } catch (error) {

            console.log(error.message);

            alert(error.message);

        }
    };

    const handleMakeAdmin = async (userId) => {

        const confirmed = window.confirm(
            "Are you sure you want to make this user an admin?"
        );

        if (!confirmed) {
            return;
        }

        try {

            await makeAdmin(userId);

            const updatedUsers = users.map(user =>
                user.id === userId
                    ? { ...user, is_admin: true }
                    : user
            );

            setUsers(updatedUsers);

            alert("User is now an admin!");

        } catch (error) {

            console.log(error.message);

            alert(error.message);

        }
    };

    const handleRemoveAdmin = async (userId) => {

        const confirmed = window.confirm(
            "Are you sure you want to remove admin access from this user?"
        );

        if (!confirmed) {
            return;
        }

        try {

            await removeAdmin(userId);

            const updatedUsers = users.map(user =>
                user.id === userId
                    ? { ...user, is_admin: false }
                    : user
            );

            setUsers(updatedUsers);

            alert("Admin access removed!");

        } catch (error) {

            console.log(error.message);

            alert(error.message);

        }
    };

    return (
        <div className="admin-users">

            <h1>Users</h1>

            <div className="users-list">

                <div className="users-header">
                    <span>Name</span>
                    <span>Email</span>
                    <span>Role</span>
                    <span>Actions</span>
                </div>

                {users.map((user) => (
                    <div className="user-row" key={user.id}>

                        <span>{user.name}</span>
                        <span>{user.email}</span>
                        <span>
                            {user.is_admin ? "Admin" : "User"}
                        </span>

                        <div className="actions-btn">
                            <button className="delete-user-btn" onClick={() => handleDelete(user.id)}>Delete</button>

                            {!user.is_admin ? (
                                <button className="make-admin-btn" onClick={() => handleMakeAdmin(user.id)}>
                                    Make Admin
                                </button>
                            ) : (
                                <button className="remove-admin-btn" onClick={() => handleRemoveAdmin(user.id)}>
                                    Remove Admin
                                </button>
                            )}
                        </div>

                    </div>
                ))}

            </div>

            <div className="pagination">

                <button
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    <i className="bi bi-arrow-left-circle"></i>
                </button>

                <span>
                    Page {currentPage} of {totalPages}
                </span>

                <button
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    <i className="bi bi-arrow-right-circle"></i>
                </button>

            </div>

        </div>
    );
}

export default AdminUsers;