import { useState, useEffect } from "react";
import { getProfile, updateUser } from "../api/api";

function Dashboard() {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  async function fetchUserProfile() {
    try {
      const profile = await getProfile();
      setUser(profile.data);
    } catch (error) {
      console.error("Failed to fetch user profile:", error);
    }
  }

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const openEditModal = () => {
    setFormData({
      name: user.user.name,
      email: user.user.email,
      phone: user.user.phone,
    });
    setIsEditing(true);
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await updateUser(user.user.id, formData);
      setUser({ user: response.data });
      setIsEditing(false);
      alert("Profile updated successfully");
      fetchUserProfile();
    } catch (err) {
      console.error("Failed to update user:", err);
      alert("Failed to update profile");
    }
  };

  return (
    <div className="p-6">
      {user ? (
        <div className="bg-white shadow p-4 rounded text-black">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Your Profile</h2>
            <button
              onClick={openEditModal}
              className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
            >
              Edit
            </button>
          </div>
          <table className="table-auto w-full border border-gray-300">
            <tbody>
              <tr className="border-b">
                <td className="p-2 font-semibold">ID</td>
                <td className="p-2">{user.user.id}</td>
              </tr>
              <tr className="border-b">
                <td className="p-2 font-semibold">Name</td>
                <td className="p-2">{user.user.name}</td>
              </tr>
              <tr className="border-b">
                <td className="p-2 font-semibold">Email</td>
                <td className="p-2">{user.user.email}</td>
              </tr>
              <tr className="border-b">
                <td className="p-2 font-semibold">Phone</td>
                <td className="p-2">{user.user.phone}</td>
              </tr>
              <tr className="border-b">
                <td className="p-2 font-semibold">Created At</td>
                <td className="p-2">
                  {new Date(user.user.created_at).toLocaleString()}
                </td>
              </tr>
              <tr>
                <td className="p-2 font-semibold">Updated At</td>
                <td className="p-2">
                  {new Date(user.user.updated_at).toLocaleString()}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        <p>Loading your Profile...</p>
      )}

      {isEditing && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Edit Profile</h3>
            <form onSubmit={handleUpdate} className="space-y-3">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
                placeholder="Name"
                required
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
                placeholder="Email"
                required
              />
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
                placeholder="Phone"
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="bg-gray-300 px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
