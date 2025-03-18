"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AutorForm from "@/componentes/autorForm";

async function getAutores() {
  const res = await fetch("http://localhost:3001/autor");
  if (!res.ok) throw new Error("Error al obtener los autores");
  return res.json();
}

async function addAutor(formData) {
  const token = localStorage.getItem("token");  // Obtener el token desde el localStorage
  if (!token) throw new Error("No se encontró el token");

  const res = await fetch("http://localhost:3001/autor", {
    method: "POST",
    body: JSON.stringify({
      nombre: formData.get("nombre"),
      biografia: formData.get("biografia"),
      fotoUrl: formData.get("fotoUrl"),
    }),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,  // Incluir el token en la cabecera Authorization
    },
  });

  if (!res.ok) throw new Error("Error al agregar el autor");
}

async function deleteAutor(id) {
  const token = localStorage.getItem("token");  // Obtener el token desde el localStorage
  if (!token) throw new Error("No se encontró el token");

  const res = await fetch(`http://localhost:3001/autor/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,  // Incluir el token en la cabecera Authorization
    },
  });

  if (!res.ok) throw new Error("Error al eliminar el autor");
}

export default function AdminAutores() {
  const [autores, setAutores] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("No estás autenticado. Por favor, inicia sesión.");
      router.push("/bibliotecatic");
      return;
    }

    getAutores()
      .then(setAutores)
      .catch((error) => {
        console.error("Error al obtener los autores:", error);
        alert("Tu sesión ha expirado o no tienes permisos. Por favor, inicia sesión de nuevo.");
        localStorage.removeItem("token");
        router.push("/bibliotecatic");
      });
  }, [router]);

  const handleAddAutor = async (formData) => {
    try {
      await addAutor(formData);
      const updatedAutores = await getAutores();
      setAutores(updatedAutores);
    } catch (error) {
      console.error("Error al agregar el autor:", error);
      alert("No se pudo agregar el autor. Tu sesión puede haber expirado.");
      router.push("/bibliotecatic");
    }
  };

  const handleDeleteAutor = async (id) => {
    try {
      await deleteAutor(id);
      const updatedAutores = await getAutores();
      setAutores(updatedAutores);
    } catch (error) {
      console.error("Error al eliminar el autor:", error);
      alert("No se pudo eliminar el autor. Tu sesión puede haber expirado.");
      router.push("/bibliotecatic");
    }
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold my-4">Administrar Autores</h1>
      <AutorForm onSubmit={handleAddAutor} />
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Lista de Autores</h2>
        <ul className="space-y-4">
          {autores.map((autor) => (
            <li key={autor.id} className="flex items-center justify-between border p-4 rounded">
              <div>
                <h3 className="text-xl">{autor.nombre}</h3>
                <p className="text-gray-600">{autor.biografia.substring(0, 100)}...</p>
              </div>
              <div>
                <button onClick={() => handleDeleteAutor(autor.id)} className="bg-red-500 text-white px-4 py-2 rounded">
                  Eliminar
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

