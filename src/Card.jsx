import React from "react";
import { CiTrash } from "react-icons/ci";

function Card({ title, handleDelete, id }) {
  return (
    <div className="p-5 bg-cyan-50 border mt-4 border-cyan-100 rounded-lg transition-all duration-150 ease-in-out hover:shadow-lg flex items-center justify-between">
      <p className="text-cyan-900">{title}</p>
      <button
        onClick={() => handleDelete(id)}
        className="text-xl text-neutral-600 hover:text-red-700 cursor-pointer ">
        <CiTrash />
      </button>
    </div>
  );
}

export default Card;
