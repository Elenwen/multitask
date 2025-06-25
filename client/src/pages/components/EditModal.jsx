import React from "react";

export default function EditModal({
  updatedTitle,
  isChecked,
  handleSubmit,
  onChangeTitle,
  onChangeStatus,
}) {
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={updatedTitle}
        onChange={onChangeTitle}
        className="input input-primary w-full"
      />
      <input
        className="checkbox checkbox-neutral"
        type="checkbox"
        onChange={onChangeStatus}
        checked={isChecked}
      />
      <button type="submit">Enregistrer</button>
    </form>
  );
}
