import React from "react";

export default function TaskModal({ handleSubmit, title, onChange }) {
  return (
    <dialog id="my_modal_3" className="modal">
      <div className="modal-box">
        <h2> Ajouter une nouvelle tâche</h2>
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <button
            type="button"
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={() => document.getElementById("my_modal_3").close()}
          >
            ✕
          </button>
          <input
            value={title}
            type="text"
            className="input input-primary w-full mt-5"
            placeholder="Entrez votre tâche ici"
            required
            onChange={onChange}
          />
          <button type="submit" className="btn btn-primary">
            {" "}
            Enregistrer
          </button>
        </form>
      </div>
    </dialog>
  );
}
