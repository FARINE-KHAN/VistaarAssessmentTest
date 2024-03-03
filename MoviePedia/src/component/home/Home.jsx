import React, { useEffect, useState } from "react";
import NavBar from "../NavBar/NavBar";
import ViewModal from "../../modals/ViewModal";
const a = "./src/";
import "./Home.scss";
import DeleteModal from "../../modals/deleteModal/DeleteModal";
import { newLocalStorage, useLocalStorage } from "../../utils/helper";
import { movieList } from "../../utils/data";
import AddEdit from "../addEdit/AddEdit";
import toast from "react-hot-toast";
// import  axios   from 'axios';
const ITEMS_PER_PAGE = 3;

const Home = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [viewModals, setViewModal] = useState(false);
  const [selectedData, setSelectedData] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const [addEditModal, setAddEditModal] = useState(null);
  // const [addModal, setAddModal] = useState(false);

  //
  const [data, setData] = useState(null);

  const totalPages = Math.ceil(data?.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentData = data?.slice(startIndex, endIndex);
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const handleViewModal = (val, index) => {
    //since there is no id in jsondata im passing the movie title to fetch data
    setSelectedData(val);
    const actualIndex = data.findIndex((item) => item.title === val.title);
    setSelectedIndex(actualIndex);
    setViewModal(true);
  };
  const handleAddModal = (e) => {
    setAddModal(true);
    setSelectedData(null);
  };
  useEffect(() => {
    newLocalStorage("movies", movieList);
    setData(useLocalStorage("movies"));
  }, []);
  useEffect(() => {
    if (data?.length > 0) {
      toast.success(data?.length + " Movies Loaded Successfully!");
    }
    if (data?.length < 1) {
      toast.error("No Data Found!");
    }
  }, [data]);
  console.log(currentPage)
  return (
    <>
      <NavBar setData={setData} />

      {viewModals && (
        <ViewModal
          setViewModal={setViewModal}
          selectedData={selectedData}
          setDeleteModal={setDeleteModal}
          setAddEditModal={setAddEditModal}
        />
      )}
      {deleteModal && (
        <DeleteModal
          setDeleteModal={setDeleteModal}
          selectedData={selectedData}
          selectedIndex={selectedIndex}
          setData={setData}
        />
      )}
      {addEditModal && (
        <AddEdit
          addEditModal={addEditModal}
          setAddEditModal={setAddEditModal}
          selectedData={selectedData}
          setData={setData}
        />
      )}

      <div className="container d-flex align-items-center justify-content-center flex-column ">
        {data?.length ? (
          <>
            <div className="row row-cols-1 row-cols-md-2  gap-5 p-4">
              {currentData.map((val, index) => (
                <div
                  className="col"
                  key={index}
                  style={{ width: "20vw" }}
                  role="button"
                  onClick={() => handleViewModal(val, index)}
                >
                  <div className="card shadow-lg p-3  bg-body-tertiary rounded border-0">
                    <img
                      src={ val.logo}
                      className="card-img-top "
                      alt="..."
                      style={{ height: "55vh" }}
                      lazy="true"
                      onError={(e) => {
                        e.target.src =
                          "https://www.ecreativeim.com/blog/wp-content/uploads/2011/05/image-not-found.jpg"; // Replace with the path to your fallback image
                      }}
                      download
                    />
                    <div className="card-body " style={{ height: "12vh" }}>
                      <h5 className="card-title fs-6">{val.title}</h5>
                      <p className="card-text text-secondary"> {val.year}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <nav aria-label="Page navigation ">
              <ul className="pagination">
                {Array.from({ length: totalPages }, (_, index) => (
                  <li
                    key={index}
                    className={`page-item ${
                      currentPage === index + 1 ? "active" : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() => handlePageChange(index + 1)}
                    >
                      {index + 1}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </>
        ) : (
          <div className="d-flex align-items-center justify-content-center flex-column">
            <h1>Add your first movie</h1>
            <button
              className="btn btn-outline-primary"
              onClick={handleAddModal}
            >
              {" "}
              Add Movie
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
