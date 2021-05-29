import React, { useState } from 'react';
import './App.css';

function App() {

  const setDataToLocalStorage = (data) => {
    localStorage.setItem('data', JSON.stringify(data))
  }

  const getDataFromLocalStorage = () => {
    return JSON.parse(localStorage.getItem('data'))
  }

  const intialNotesData = getDataFromLocalStorage()
  const [allNotes, setAllNotes] = useState(intialNotesData ? intialNotesData : []);
  const [newnote, setNewNote] = useState("");
  const intialEditState = {status : false,id : null}
  const [isEdit, setIsEdit] = useState(intialEditState);

  const setNewNoteHandler = (event) => {
    setNewNote(event.target.value)
  }

  const addNewNote = () => {
    let tempAllNotes = [...allNotes]
    tempAllNotes.push({
      id: allNotes.length,
      text: newnote
    })
    setAllNotes(tempAllNotes)
    setNewNote("")
    setDataToLocalStorage(tempAllNotes)
  }

  const onEdit = (id) => {
    setIsEdit({status : true,id: id})
    let filteredArray = allNotes.filter((item)=>item.id === id)
    setNewNote(filteredArray[0].text)
  }

  const deleteNote = (id) => {
    let filteredArray = allNotes.filter((item)=>item.id !== id)
    setAllNotes(filteredArray)
    setDataToLocalStorage(filteredArray)
  }

  const updateNote = () => {
    let tempAllNotes = [...allNotes]
    tempAllNotes.map((item) => {
      if(item.id === isEdit.id){
        item.text = newnote
      }
    })
    setAllNotes(tempAllNotes)
    setNewNote("")
    setIsEdit(intialEditState)
    setDataToLocalStorage(tempAllNotes)
  }

  return (
    <div className="App">
      <div className="noteInputContainer">
        <input type="submit" value={isEdit.status ? "Update" : "Add"} className="buttonStyle" disabled={!newnote.length} onClick={isEdit.status ? updateNote : addNewNote} />
        <div className="inputContainer">
          <input type="text" className="inputStyle" value={newnote} onChange={setNewNoteHandler} />
        </div>
      </div>
      {allNotes.length ? 
        allNotes.map((item,index)=>(
          <div key={index} className="notesContainer">
            <div className="notes">{item.text}</div>
            <div className="buttonContainer">
              <button type="button" onClick={()=>onEdit(item.id)}>Edit</button>
              <button type="button" onClick={()=>deleteNote(item.id)}>delete</button>
            </div>
          </div>
        )) 
        :
        <div>No notes found, try adding one</div> 
      }
    </div>
  );
}

export default App;
