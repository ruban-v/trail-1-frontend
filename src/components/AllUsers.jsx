import { useState, useEffect } from "react";
import { getAllUsers, deleteUser, getProfile } from "../api/api";

function Dashboard() {
  const [users, setUsers] = useState([]);
  const [currentUserId, setCurrentUserId] = useState(null);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchUser() {
      try {
        const [profile, user] = await Promise.all([
          getProfile(),
          getAllUsers(),
        ]);
        setUsers(user.data.users);
        setCurrentUserId(profile.data.user.id);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    }
    fetchUser();
  }, []);

  const handleDelete = async (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (!confirm) return;

    try {
      setLoading(true);
      await deleteUser(id);
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
    } catch (err) {
      console.error("Failed to delete user", err);
      alert("Error deleting user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <div className="bg-white shadow p-4 rounded text-black overflow-x-auto">
        <table className="table-auto w-full border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Phone</th>
              <th className="p-2 border">Updated At</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>

          <tbody className="text-center">
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="p-2 border">{user.name}</td>
                  <td className="p-2 border">{user.email}</td>
                  <td className="p-2 border">{user.phone}</td>
                  <td className="p-2 border">
                    {new Date(user.updated_at).toLocaleString()}
                  </td>
                  <td className="p-2 border">
                    {user.id === currentUserId ? (
                      <button
                        disabled
                        className="bg-gray-400 px-3 py-1 rounded cursor-not-allowed"
                      >
                        Not Allowed
                      </button>
                    ) : (
                      <button
                        onClick={() => handleDelete(user.id)}
                        className={`${
                          loading
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-red-500 hover:bg-red-600"
                        } px-3 py-1 rounded`}
                        disabled={loading}
                      >
                        Delete
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="p-4 text-center text-gray-500">
                  No users found or loading...
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;
