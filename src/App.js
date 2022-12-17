import React, { useState } from 'react';
import Alert from './Alert';
import List from './List';

const App = () => {
  const [name,setName]= useState('');
  const [isEdit,setEditMode]=useState(false);
  const [editId,setEditID]=useState('');
  const [list,setList]=useState([]);
  const [alert, setAlert] = useState({ show: false, msg: '', type: '' });


  const handleSubmit =(e)=>{
    e.preventDefault();

    if(!name){
      showAlert(true, 'danger', 'please enter value');
    }else if(name && isEdit){
      setList(
        list.map((item)=>{
          if(item.id===editId){
            return({...item,title:name})
          }
          return item;
        })
      )
        setEditID('');
        setEditMode(false);
        setName("");
        showAlert(true, 'success', 'value changed');
    }else{
      let newItem = {id:new Date().getTime().toString(),title:name};
      setList([...list,newItem]);
      setName('');
      showAlert(true, 'success', 'item added to the list');
    }
  }

  const showAlert = (show = false, type = '', msg = '') => {
    setAlert({ show, type, msg });
  };

  const removeItem = (id)=>{
    showAlert(true, 'danger', 'item removed');
    setList(list.filter((item)=>{return item.id!==id}));
  }

  const editItem = (id)=>{
    const item = list.find((item)=>item.id===id)
    setName(item.title);
    setEditMode(true);
    setEditID(id);
  }

  const clearList = ()=>{
   setList([]);
   showAlert(true, 'danger', 'empty list');
  }

  
  return (
    <section className='section-center'>
    <form className='grocery-form' onSubmit={handleSubmit}>
    {alert.show && <Alert {...alert} removeAlert={showAlert} list={list} />}
        <h3>grocery bud</h3>
        <div className='form-control'>
          <input
            type='text'
            className='grocery'
            placeholder='e.g. eggs'
            value={name}
            onChange={(e)=>{setName(e.target.value)}}
          />
          <button type='submit' className='submit-btn' >
           submit
          </button>
        </div>
      </form>
      {list.length > 0 && (
        <div className='grocery-container'>
          <List items={list} removeItem={removeItem} editItem={editItem} />
          <button className='clear-btn' onClick={clearList}>
            clear items
          </button>
        </div>
      )}
    </section>
  )
}

export default App;