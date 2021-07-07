import React, { useState, useEffect } from 'react'
import List from './List'
import Alert from './Alert'

function App() {
  const [list, setList] = useState([]);
  const [inputBox, setInputBox] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [alert, setAlert] = useState({show:false, msg:'', type:''})
  const [editID, setEditID] = useState(null);
  const showAlert = (show=false, type='', msg='') => {
    setAlert({show, type, msg})
  }
  const handleSubmit = (e) =>{
    e.preventDefault()
    if(!inputBox){//display alert
      showAlert(true, 'danger', 'please enter Value');
    }
    else if(inputBox && isEditing){ //deal with Edit
      setList(list.map((item)=>{
        if(item.id===editID){
          return {...item,title:inputBox}
        }
        return item;     
      }))
      setInputBox('');
      setEditID(null);
      setIsEditing(false);
    }
    else {// show alert
      showAlert(true, 'success', 'item added to the list')
      const newItem = {id:new Date().getTime().toString(), title:inputBox};
      setList([...list, newItem]);
      setInputBox('');
    }
  }

  const clearList = () => {
    setList([]);
    showAlert(true, 'danger', 'list has been cleared');
  }
  
  const removeItem = (id) => {
    setList(list.filter((item)=>item.id !== id));
    showAlert(true, 'danger', 'Item Removed');
  }
  
  const editItem = (id) => {
    const specificItem = list.find((item)=>item.id ===id);
    setIsEditing(true);
    setEditID(id);
    setInputBox(specificItem.title);
  }

  return(
    <section className="section-center">
      <form className="grocery-form" onSubmit={handleSubmit}>{alert.show && <Alert {...alert} removeAlert={showAlert}  />}
      <h3>gocery bud</h3>
      <div className="form-control">
          <input type="text" placeholder="eg: Eggs" value={inputBox} onChange={(e)=>setInputBox(e.target.value)} />
        <button className="submit-btn" type="submit">{isEditing? 'edit' : 'submit'}</button>
      </div>
      </form>
      {list.length > 0 && (
        <div className="grocery-container">
          <List items={list} removeItem={removeItem} editItem={editItem} />
          <button className="clear-btn" onClick={clearList}  >clear items</button>
        </div>
      )}

    </section>
  )

}

export default App
