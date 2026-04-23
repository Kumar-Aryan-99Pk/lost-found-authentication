import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_API;

export default function Dashboard() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({});
  const [search, setSearch] = useState("");
  const [editId, setEditId] = useState(null);

  const nav = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) return nav("/");
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const res = await axios.get(`${BASE_URL}/api/items`);
    setItems(res.data);
  };

  const searchItems = async () => {
    const res = await axios.get(`${BASE_URL}/api/items/search?q=${search}`);
    setItems(res.data);
  };

  const addOrUpdate = async () => {
    if (editId) {
      await axios.put(`${BASE_URL}/api/items/${editId}`, form, {
        headers: { Authorization: token }
      });
      setEditId(null);
    } else {
      await axios.post(`${BASE_URL}/api/items`, form, {
        headers: { Authorization: token }
      });
    }
    setForm({});
    fetchItems();
  };

  const deleteItem = async (id) => {
    await axios.delete(`${BASE_URL}/api/items/${id}`, {
      headers: { Authorization: token }
    });
    fetchItems();
  };

  const startEdit = (item) => {
    setForm(item);
    setEditId(item._id);
  };

  const logout = () => {
    localStorage.removeItem("token");
    nav("/");
  };

  return (
    <div className="container">

      <div className="card">
        <h2>Dashboard</h2>
        <button onClick={logout}>Logout</button>
      </div>

      <div className="card">
        <h3>{editId ? "Edit Item" : "Add Item"}</h3>

        <input placeholder="Item Name"
          value={form.itemName || ""}
          onChange={e => setForm({...form, itemName: e.target.value})} />

        <input placeholder="Description"
          value={form.description || ""}
          onChange={e => setForm({...form, description: e.target.value})} />

        <input placeholder="Type (Lost/Found)"
          value={form.type || ""}
          onChange={e => setForm({...form, type: e.target.value})} />

        <input placeholder="Location"
          value={form.location || ""}
          onChange={e => setForm({...form, location: e.target.value})} />

        <input placeholder="Contact Info"
          value={form.contactInfo || ""}
          onChange={e => setForm({...form, contactInfo: e.target.value})} />

        <button onClick={addOrUpdate}>
          {editId ? "Update Item" : "Add Item"}
        </button>
      </div>

      <div className="card">
        <h3>Search</h3>
        <input placeholder="Search..."
          onChange={e => setSearch(e.target.value)} />
        <button onClick={searchItems}>Search</button>
      </div>

      <div className="card">
        <h3>Items</h3>

        {items.map(item => (
          <div key={item._id} className="item">
            <b>{item.itemName}</b>
            <p>{item.description}</p>
            <small>{item.type} | {item.location}</small>

            <button onClick={() => startEdit(item)}>Edit</button>
            <button className="delete-btn" onClick={() => deleteItem(item._id)}>
  Delete
</button>
          </div>
        ))}

      </div>

    </div>
  );
}