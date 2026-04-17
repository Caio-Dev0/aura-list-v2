import React, { useState } from 'react'
import './App.css'
import type { Task } from './types/taskType'
import RenderTasks from './components/RenderTasks'
import FormTask from './components/FormTask'

function App() {
  const [nameTask, setNameTask] = useState<string>("")
  const [tasks, setTasks] = useState<Task[]>([])
  const [modal, setModal] =useState<boolean>(false)
  const [taskEdit, setTaskEdit] = useState<Task | null> (null)
 

  function handleSubmitForm(e: React.SubmitEvent): void{
    e.preventDefault()
    if(nameTask === ""){
      return
    }
    setTasks(e => [...e, {id: tasks.length + 1, name: nameTask}])
    setNameTask("")
  }

  function handleDeleteTask(id: number): void{
    setTasks(prev => prev.filter(task => task.id !== id))
    setModal(false)
  }

  function handleEditTask(idTask: number, nameTask: string): void{
    setTaskEdit({id: idTask, name: nameTask})
    setModal(true)
  }

  function handleChangeTask(nameTask: string): void{
    setTaskEdit({id: taskEdit!.id, name: nameTask})
  }

  function handleUpdateTasks(tasks: Task[]){
    setTasks(tasks)
    setModal(false)
  }

  function handleCloseModal(): void{
    setModal(false)
  }

  function handleSaveNameTask(e: string){
    setNameTask(e)
  }
  
  return (
    <>
    <FormTask handleSubmitForm={handleSubmitForm} nameTask={nameTask} handleSaveNameTask={handleSaveNameTask}/>
    <RenderTasks tasks={tasks} handleDeleteTask={handleDeleteTask} modal={modal} handleEditTask={handleEditTask} editTask={{name: taskEdit?.name ?? "", id: taskEdit?.id ?? 0}} handleChangeTask={handleChangeTask} handleUpdateTasks={handleUpdateTasks} handleCloseModal={handleCloseModal}/>
  </>
  )
}

export default App