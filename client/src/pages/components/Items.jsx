import React from "react";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";

export default function Item({ task, handleDelete, handleUpdate }) {
  return (
    <li className="flex items-center justify-between" key={task._id}>
      <span>{task.title}</span>
      <input type="checkbox" checked={task.status} />
      <div>
        <button onClick={handleDelete}>
          <MdDelete size={24} color="red" />
        </button>
        <button onClick={handleUpdate}>
          <FiEdit size={24} color="green" />
        </button>
      </div>
    </li>
  );
}
