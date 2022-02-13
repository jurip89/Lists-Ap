import React,{useState} from 'react'
import NavBar from './NavBar'
import { v4 as uuidv4 } from 'uuid';

const BigOne = () => {
    const [lists, setLists] = useState([]);
    const [selected, setSelected] = useState([]);

  const selectList = (id) => {
       setSelected([]) 
        
        const theOne = lists.filter(el => el.id === id)
        setSelected(...theOne);
      

  }
  
  const filterEmpties = (list) => {
   return list.elements.filter(el=>el.name !== '');
  }


    const addList = (list) => {
        list.elements = filterEmpties(list)
        list.date= new Date().toLocaleDateString()
        list.id = uuidv4();
        const listsClone =[...lists,list]
        setLists(listsClone)
       
    }
    const deleteList = () => {
        setLists(prev => prev.filter(el => el.id !== selected.id))
      setSelected([])
      console.log(lists)
  }
  
  const addElement = (element) => {
    if (element.name === '') return;
    else {
      
    const elementsClone = [...selected.elements, element]
    setSelected({ ...selected, elements: elementsClone })
    const listsClone = lists.filter(el => el.id !== selected.id)
    setLists([...listsClone, selected])}
  }


  const deleteElement = (element) => {
    
    const clone = selected.elements.filter(el=> el.id !== element.id)
    setLists(prev => prev.filter(el => el.id !== selected.id));
    setSelected(prev => { return { ...prev, elements: clone } })
    setLists(prev => [...prev, selected])
    if (selected.length === 1) deleteAllElements();
   console.log(selected)
  }

  const deleteAllElements = () => {
    if (selected.length === 0) return;
    
    else{
    //setSelected( {...selected, elements:[]} );
    setSelected((prev) => {return{...prev, elements:[]}} );
   
    setLists(prev => prev.filter(el => el.id !== selected.id));
   console.log('selected: ',selected) 
    setLists(prev=> [...prev, selected]);
    
    }
  }

   


  return (
    <div>
      <NavBar
        lists={lists}
        add={addList}
        deleteL={deleteList}
        selected={selected}
        selectList={selectList}
        addElement={addElement}
        deleteElement={deleteElement}
        deleteAllElements={deleteAllElements}
      />
    </div>
  )
}

export default BigOne
