import { useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { RiAddLargeLine } from "react-icons/ri";
import Item from "./components/Items";
import TaskModal from "./components/TaskModal";
import EditModal from "./components/EditModal";

const API_URL = import.meta.env.VITE_API_URL;
export default function Task() {
  const [tasks, setTasks] = useState([]);
  const token = localStorage.getItem("token");
  const [title, setTitle] = useState("");
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [id, setId] = useState("");
  const [isEdit, setIsEdited] = useState(false);

  const FetchTask = async () => {
    const response = await fetch(`${API_URL}/task`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    if (response.ok) {
      const data = await response.json();
      setTasks(data);
      console.log("data", data);
      console.log("tasks", tasks);
    }
  };

  useEffect(() => {
    FetchTask();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEdit) {
      const response = await fetch(`${API_URL}/task/${id}`, {
        method: "PUT",
        headers: {
          Authorization: "Bearer " + token,
          "Content-type": "Application/json",
        },
        body: JSON.stringify({ title: updatedTitle, status: isChecked }),
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        FetchTask();
      }
    }
    const response = await fetch(`${API_URL}/task`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({ title }),
    });
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      FetchTask();
      setTitle("");
      document.getElementById("my_modal_3").close();
    }
  };

  const handleDelete = async (id) => {
    console.log(id.target);
    const response = await fetch(`${API_URL}/task/` + id, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      FetchTask();
    }
  };

  const handleUpdate = async (task) => {
    setId(task._id);
    setIsChecked(task.status);
    setUpdatedTitle(task.title);
  };
  const handleSubmitUpdate = async (e) => {
    e.preventDefault();
    const response = await fetch(`${API_URL}/task/${id}`, {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + token,
        "Content-type": "Application/json",
      },
      body: JSON.stringify({ title: updatedTitle, status: isChecked }),
    });
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      FetchTask();
    }
  };

  return (
    <div className="w-[460px] m-auto p-5 border rounded">
      <div></div>
      <div className="flex justify-evenly ">
        <h1 className="text-3xl text-center my-3">Liste de tâches</h1>
        <button
          className="btn btn-square"
          onClick={() => document.getElementById("my_modal_3").showModal()}
        >
          <RiAddLargeLine size={24} color="blue" />
        </button>
      </div>
      <ul>
        {tasks.map((task) => (
          <Item
            key={task._id}
            task={task}
            handleDelete={() => handleDelete(task._id)}
            handleUpdate={() => handleUpdate(task)}
          />
        ))}
      </ul>
      <TaskModal
        handleSubmit={handleSubmit}
        title={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <EditModal
        updatedTitle={setUpdatedTitle}
        isChecked={isChecked}
        handleSubmit={handleSubmit}
        onChangeTitle={(e) => setUpdatedTitle(e.target.value)}
        onChangeStatus={(e) => setIsChecked(e.target.value)}
      />
    </div>
  );
}
