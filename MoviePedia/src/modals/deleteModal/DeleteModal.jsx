import React from "react";
import "./DeleteModal.scss";
import { deleteLocalStorage, useLocalStorage } from "../../utils/helper";
import toast from  "react-hot-toast";
function DeleteModal({ selectedData, setDeleteModal, selectedIndex, setData }) {
  const handledelete = () => {
    console.log(selectedIndex)
    deleteLocalStorage("movies", selectedIndex);
    let UpdateDate = useLocalStorage("movies");
    setData(UpdateDate);
    setDeleteModal(false);
    toast.success(selectedData.title + " is deleted successfully!");
  };
  return (
    <div className="blur-bg">
      <i className="fa-solid fa-exclamation"></i>
      <div className="modalContainer deleteContiner">
        <h3>Are You Sure ?</h3>
        <p className="text-center">
          Do you really want to delete this records? This process cannot be
          undone.
        </p>
        <div className="d-flex align-items-center justify-content-center w-100 gap-4 ">
          <button
            className="btn btn-outline-warning"
            onClick={() => setDeleteModal(false)}
          >
            Cancel
          </button>
          <button className="btn btn-danger" onClick={handledelete}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
