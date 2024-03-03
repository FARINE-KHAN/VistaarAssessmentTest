import React, { useState } from "react";
import "./ViewModal.scss";
import DeleteModal from "./deleteModal/DeleteModal";
import AddEdit from "../component/addEdit/AddEdit";
const ViewModal = ({ setViewModal, selectedData, setDeleteModal, setAddEditModal }) => {
  const handleDeleteModal = () => {
    setDeleteModal(true);
    setViewModal(false);
  };
  const handleEdit=()=>{
    setAddEditModal("edit")
    setViewModal(false);
  }
   
  return (
    <>

    
      <div className="blur-bg">
        <div className="modalContainer fadeIn">
          <div className="modalBody d-flex flex-column align-items-start ">
            <div className="header d-flex justify-content-between w-100">
              <h1>{selectedData.title}</h1>
              <i
                className="fa-solid fa-xmark"
                onClick={() => setViewModal(false)}
                title="Close"
              ></i>
            </div>
            <div className="movieData d-flex w-100 justify-content-between align-items-center ">
              <img
                 src={selectedData?.logo}
                alt="poster"
                lazy="true"
                onError={(e) => {
                  e.target.src =
                    "https://www.ecreativeim.com/blog/wp-content/uploads/2011/05/image-not-found.jpg"; // Replace with the path to your fallback image
                }}
              />
              <div className="movieDetails d-flex flex-column w-75">
                <h5>
                  <span>Description:</span> {selectedData.desc}
                </h5>
                <h6>
               
                  <span>Release Date:</span> {selectedData.month}{selectedData?.year &&(",")}{selectedData?.year}.
                </h6>
                {selectedData?.runtime &&(
                <p>
                  <span>Runtime:</span> {selectedData.runtime} minutes.
                </p>)}
              </div>
            </div>
            <div className="footer d-flex justify-content-end align-items-center gap-3 w-100">
              <button className="btn btn-primary" title="Edit" onClick={handleEdit}>
                <i className="fa-solid fa-pencil "></i>
              </button>
              <button
                className="btn btn-danger"
                onClick={handleDeleteModal}
                title="Delete"
              >
                <i className="fa-regular fa-trash-can"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewModal;
