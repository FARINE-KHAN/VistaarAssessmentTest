import React, { useEffect, useState } from "react";
import "./AddEdit.scss";
import { newLocalStorage, useLocalStorage } from "../../utils/helper";
import toast from "react-hot-toast";
const AddEdit = ({ addEditModal, setAddEditModal, selectedData, setData }) => {
  const [inputs, setInputs] = useState({
    title: "",
    desc: "",
    month: "",
    year: "",
    runtime: "",
    logo: "",
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
        const reader = new FileReader();
        reader.onload = () => {
          setInputs((prevInputs) => ({
            ...prevInputs,
            logo: reader.result, 
          }));
        };
        reader.readAsDataURL(file);
      
  };

  const handleCloseModal = () => {
    setAddEditModal(null);
  };
  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit = () => {

      if(!inputs.title){
          return toast.error('Title is required!')
      }
      if(!inputs.desc){
          return toast.error('Description is required!')
      }
    if (addEditModal === "add") {
        const presentTitle = useLocalStorage("movies").filter((item) => item.title.toLowerCase() == inputs.title.toLowerCase().trim());
        if(presentTitle.length > 0) return toast.error("Movie already exists!");
      const existingData = useLocalStorage("movies") || [];
      const newMovie = {
        title: inputs.title,
        desc: inputs.desc,
        month: inputs.month,
        year: inputs.year,
        runtime: inputs.runtime,
        logo: inputs.logo,

      };

      const updatedData = [...existingData, newMovie];

      newLocalStorage("movies", updatedData);
      setData(updatedData);
      setAddEditModal(null);
    }
    if (addEditModal === "edit") {
      const existingData = useLocalStorage("movies") || [];

      const indexToEdit = existingData.findIndex(
        (movie) => movie.title === selectedData.title
      );

      if (indexToEdit !== -1) {
        existingData[indexToEdit] = {
          title: inputs.title,
          desc: inputs.desc,
          month: inputs.month,
          year: inputs.year,
          runtime: inputs.runtime,
          logo: inputs.logo,
        };

        newLocalStorage("movies", existingData);
        setData(existingData);

        setAddEditModal(null);
      }
    }
  };

  useEffect(() => {
    setInputs(selectedData ? selectedData : inputs);
  }, []);
  console.log(selectedImage);
  return (
    <>
      <div className="blur-bg">
        <div className="modalContainer  fadeIn">
          <div className="modalBody  d-flex flex-column align-items-start ">
            <div className="movieData addEitdMovieData  border-0 d-flex w-100 justify-content-between align-items-center ">
                <div className=" addeditData d-flex  flex-column gap-3">
                <img
                  src={inputs.logo}
                  alt="poster"
                  lazy="true"
                  name="logo"
                  onError={(e) => {
                    e.target.src =
                      "https://www.ecreativeim.com/blog/wp-content/uploads/2011/05/image-not-found.jpg";
                  }}
                />

              <input  className="w-75" type="file" name="logo" onChange={handleImageChange} />
          </div>
              <div className="movieDetails movieDesc d-flex flex-column w-75">
                <div className="item">
                  <label>Title:</label>
                  <input
                    type="text"
                    name="title"
                    value={inputs?.title}
                    placeholder="Enter Title"
                    className="w-75"
                    onChange={handleChange}
                  />
                </div>
                <div className="item flex-column gap-0 align-items-start">
                  <label>Description:</label>
                  <textarea
                    type="text"
                    name="desc"
                    value={inputs?.desc}
                    placeholder="Enter Description"
                    onChange={handleChange}
                  ></textarea>
                </div>
                <div className="item ">
                  <label>Release Date:</label>
                  <div className="dateInput d-flex gap-2">
                    <input
                      type="text"
                      name="month"
                      value={inputs?.month}
                      placeholder="Enter Month ex:Apr"
                      onChange={handleChange}
                    ></input>
                    <input
                      type="number"
                      name="year"
                      value={inputs?.year}
                      placeholder="Enter Year ex:2024"
                      onChange={handleChange}
                    ></input>
                  </div>
                </div>
                <div className="item">
                  <label>Runtime:</label>
                  <input
                    className="runtimeInput"
                    type="number"
                    name="runtime"
                    value={inputs?.runtime}
                    placeholder="Enter Runtime ex:123"
                    onChange={handleChange}
                  ></input>
                  <span className="fs-7 fw-light">min</span>
                </div>
              </div>
            </div>
            <div className="footer d-flex justify-content-end align-items-center gap-3 w-100">
              <button className="btn btn-primary" onClick={handleSubmit}>
                {addEditModal == "edit" ? "Save Changes" : "Add Movie"}
              </button>
              <button className="btn btn-danger" onClick={handleCloseModal}>
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddEdit;
