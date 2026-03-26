import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function AddDustbin() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    binId: "",
    location: "",
    latitude: "",
    longitude: ""
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!form.binId || !form.location) {
      alert("Bin ID and Location are required");
      return;
    }

    try {

      setLoading(true);

      await api.post("/dustbins", {
        ...form,
        latitude: Number(form.latitude),
        longitude: Number(form.longitude)
      });

      alert("Dustbin added successfully");

      setForm({
        binId: "",
        location: "",
        latitude: "",
        longitude: ""
      });

      navigate("/dustbins");

    } catch (error) {

      console.error(error);
      alert("Error adding dustbin");

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="p-6">

      <h1 className="text-2xl font-bold mb-6">
        Add Dustbin
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow max-w-md"
      >

        <label className="text-sm text-gray-600">Bin ID</label>

        <input
          name="binId"
          value={form.binId}
          placeholder="BIN001"
          className="border p-2 mb-4 w-full rounded"
          onChange={handleChange}
        />

        <label className="text-sm text-gray-600">Location</label>

        <input
          name="location"
          value={form.location}
          placeholder="Campus Block A"
          className="border p-2 mb-4 w-full rounded"
          onChange={handleChange}
        />

        <label className="text-sm text-gray-600">Latitude</label>

        <input
          name="latitude"
          value={form.latitude}
          placeholder="30.7333"
          className="border p-2 mb-4 w-full rounded"
          onChange={handleChange}
        />

        <label className="text-sm text-gray-600">Longitude</label>

        <input
          name="longitude"
          value={form.longitude}
          placeholder="76.7794"
          className="border p-2 mb-4 w-full rounded"
          onChange={handleChange}
        />

        <button
          disabled={loading}
          className="bg-black text-white px-4 py-2 rounded w-full"
        >
          {loading ? "Adding..." : "Add Dustbin"}
        </button>

      </form>

    </div>

  );
}