import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Container } from "react-bootstrap";
function App() {
  const [todosList, setTodosList] =useState([])
  const [todo, setTodo] =useState({
    title:"",
    describtion:'',
    id:'',
    creatAt:''
  })
  const areThereANyInput = (e)=>{
    e.preventDefault()
    todo.title? alert('Enter a describtion'):alert('Enter a title');
  }
  const handelNewTodo = (e)=>{
    e.preventDefault()
    
    setTodosList([...todosList, {...todo,id:Date.now(),creatAt:new Date().toLocaleDateString(),disabled: true, checked:false }])

    
    setTodo({
    title:"",
    describtion:'',
    id:'',
    creatAt:''
  })
  }
  const handelDelete =(id)=>{
    const filterdTodo = todosList.filter(item => item.id!==id)
    setTodosList(filterdTodo);

  }
  const handelEdit =(id)=>{
    const todoDisable= todosList.map(i =>{
      if (i.id ===id){
        return{...i,disabled:false}
      }else{
        return i

      }
    })
    setTodosList(todoDisable)
  }


  const handelcheck =(id)=>{
    const todoChecked= todosList.map(i =>{
      if (i.id === id){
        console.log(i.checked);
        if(!i.checked) {return{...i,checked:true}} else return{...i,checked:false}
      }else return i
    })
    setTodosList(todoChecked)
  }

 let printTodo = todosList.map((item) =>
 <li id={item?.id} className='p-3 border'>
   
    <h2><Form.Control disabled={item.disabled} value={item.title} /></h2>
    <p><Form.Control disabled={item.disabled}  value={item.describtion} /></p>
    <small>{item?.creatAt}</small>
    <div className='d-flex gap-3 '>

        <Button variant="outline-dark" onClick={()=>handelDelete(item.id)}>Delete</Button>
        <Button variant="outline-dark" onClick={()=>handelEdit(item.id)}>Edit</Button>
        <Button variant="warning" style={{backgroundColor:item.checked ?'green':'#fff' }} onClick={()=>handelcheck(item.id)}>checked</Button>
    </div>


  </li>)
 

 


  return (
<>
<Container>
  <h1>
      Todo
  </h1>
  <Form className="d-flex flex-column gap-3">
    <div>
    <Form.Label>Enter a title</Form.Label>
      <Form.Control value={todo.title} placeholder='Enter a title' onChange={(e)=>setTodo({...todo, 
      title:e.target.value})} />
      

    </div>
    <div>
      <Form.Label>Enter a describtion</Form.Label>
      <Form.Control value={todo.describtion} placeholder='Enter a describtion' onChange={(e)=>setTodo({...todo, 
       describtion:e.target.value})} />
    </div>
    <Button onClick={todo.title && todo.describtion?handelNewTodo:areThereANyInput}
     type="submit">submit</Button>
  </Form>
  <ul className="pt-5">
  
  {printTodo}
  </ul>
  </Container>
</>
  );
}

export default App;
