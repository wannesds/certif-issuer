import React, {useState } from "react";

function AddCertif({ setCertifListQue }) {
  const [certifID, setCertifID] = useState("");
  const [webID, setWebID] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const newCertif = {
      certifID : certifID,
      webID : webID
    }
    
    setCertifListQue(certifListQue => [...certifListQue, newCertif])
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.id === "certifID-input"){
      setCertifID(e.target.value)
    } 
    if (e.target.id === "webID-input"){
      setWebID(`https://${e.target.value}/profile/card#me`) 
    }
    console.log("addCertif webID : ", webID)
    //`set${e.target.id}(e.target.value) -> would be better way but doesnt work;
  };

  return (
      <form onSubmit={handleSubmit} className="form">
        <label htmlFor="todo-input">
          <span>Certificate</span>
          <input
            id="certifID-input"
            type="text"
            //value={todoText}
            onChange={handleChange}
          />
          <span>WebID</span>
          <input
            id="webID-input"
            type="text"
            //value={todoText}
            placeholder='ksbuser.solidcommunity.net'
            onChange={handleChange}
          />
        </label>
        <button type="submit" className="add-button">
          Add Certificate
        </button>
      </form>
  );
}
  
  export default AddCertif;