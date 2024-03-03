import React, { useEffect, useState } from "react";
import AddEdit from "../addEdit/AddEdit";
import { useLocalStorage } from "../../utils/helper";

const NavBar = ({setData}) => {
  const [addEditModal, setAddEditModal] = useState(false);
  const handleAdd = () => {
    setAddEditModal("add");
  };

    return (
    <>
      {addEditModal && (
        <AddEdit
          addEditModal={addEditModal}
          setAddEditModal={setAddEditModal}
          setData={setData}
        />
      )}
      <nav className="navbar bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand">Movie Pedia</a>
          <button className="btn btn-outline-success" onClick={handleAdd}>
            Add Movie
          </button>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
