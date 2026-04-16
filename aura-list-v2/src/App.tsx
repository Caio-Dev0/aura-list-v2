import { useState } from 'react'
import './App.css'
import type { Task } from './types/taskType'
import RenderTasks from './components/renderTasks'

function App() {
  const [nameTask, setNameTask] = useState<string>("")
  const [tasks, setTasks] = useState<Task[]>([])
  const [modal, setModal] =useState<boolean>(false)
  const [taskEdit, setTaskEdit] = useState<Task | null> (null)
 

  function handleSubmitForm(e: any): void{
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
  

    <form className="task-form" onSubmit={handleSubmitForm}>
            <input className='task-form__input' value={nameTask} onChange={(e) => setNameTask(e.currentTarget.value)} type="text" aria-label="Adicione o nome de sua tarefa"/>
            <fieldset className="task-form__priority">
                <legend className="task-form__priority-legend">Prioridade Tarefa</legend>
                <label htmlFor="urgente"><input type="radio" name="prioridade" id="urgente" value="urgente"  className="task-form__priority-input task-form__priority-input--urgente"/>Urgente</label>
                <label htmlFor="importante"><input type="radio" name="prioridade" id="importante" value="importante"  className="task-form__priority-input task-form__priority-input--importante"/>Importante</label>  
                <label htmlFor="rotineira"><input type="radio" name="prioridade" id="rotineira" value="rotineira"  className="task-form__priority-input task-form__priority-input--rotineira"/>Rotineira</label>
            </fieldset>
            <input type="submit" className="task-form__button" value="Adicionar tarefa"/>
      </form>

    <RenderTasks tasks={tasks} handleDeleteTask={handleDeleteTask} modal={modal} handleEditTask={handleEditTask} editTask={{name: taskEdit?.name ?? "", id: taskEdit?.id ?? 0}} handleChangeTask={handleChangeTask} handleUpdateTasks={handleUpdateTasks} handleCloseModal={handleCloseModal}/>
  </>
  )
}

export default App