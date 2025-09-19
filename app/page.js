"use client";

import { useState } from "react";

const initialData = [
  { id: 1, nombre: "Juan", edad: 25 },
  { id: 2, nombre: "María", edad: 30 },
];

export default function Tabla() {
  const [data, setData] = useState(initialData);
  const [nuevo, setNuevo] = useState({ id: "", nombre: "", edad: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNuevo({ ...nuevo, [name]: value });
  };

  const handleAdd = (e) => {
    e.preventDefault();

    if (!nuevo.id || !nuevo.nombre || !nuevo.edad) return;

    setData([...data, { ...nuevo, edad: Number(nuevo.edad) }]);
    setNuevo({ id: "", nombre: "", edad: "" });
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className=" ">Tabla de Datos</h1>

      {/* Tabla */}
      <table className="w-full border border-gray-300 mb-6">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-1">ID</th>
            <th className="border p-10">Nombre</th>
            <th className="border p-1">Edad</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id}>
              <td className="border p-2">{row.id}</td>
              <td className="border p-2">{row.nombre}</td>
              <td className="border p-2">{row.edad}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Form para ingresar datos */}
      <h3 className="texto">Agrega un nuevo usuario a la lista: </h3>
      <form onSubmit={handleAdd} className="space-y-5">
        <input
          type="text"
          name="id"
          placeholder="Ingrese Id"
          value={nuevo.id}
          onChange={handleChange}
          className="border p-2 w-full"
        />
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={nuevo.nombre}
          onChange={handleChange}
          className="border p-2 w-full"
        />
        <input
          type="number"
          name="edad"
          placeholder="Edad"
          value={nuevo.edad}
          onChange={handleChange}
          className="border p-2 w-full"
        />
        <button
          type="submit"
          className="bg-black text-white px-4 py-2 rounded hover:bg-black"
        >
          Agregar
        </button>
      </form>
    </div>
  );
}
