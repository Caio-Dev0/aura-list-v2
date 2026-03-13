import { useState } from 'react'
import './App.css'

interface Task{
  id: number,
  name: string
}


function App() {
  const [nameTask, setNameTask] = useState<string>("")
  const [tasks, setTasks] = useState<Task[]>([])
  const [modal, setModal] =useState<boolean>(false)
  const [editName, setEditName] = useState<string>("")
  const [taskId, setTaskId] = useState<number>(0)

  function handleSubmitForm(e: any): void{
    e.preventDefault()
    if(nameTask === ""){
      return
    }
    setTasks(e => [...e, {id: tasks.length + 1, name: nameTask}])
    setNameTask("")
    console.log(tasks)
  }

  return (
    <>
    <header className="task-app__header">
        <div className="task-app__title-wrapper">
            <h1>Aura List</h1>
        </div>
    </header>

    <form className="task-form" onSubmit={handleSubmitForm}>
            <input className='task-form__input' value={nameTask} onChange={(e) => setNameTask(e.currentTarget.value)} type="text" aria-label="Adicione o nome de sua tarefa"/>
            <fieldset className="task-form__priority">
                <legend className="task-form__priority-legend">Prioridade Tarefa</legend>
                <label htmlFor="urgente"><input type="radio" name="prioridade" id="urgente" className="task-form__priority-input task-form__priority-input--urgente"/>Urgente</label>
                <label htmlFor="importante"><input type="radio" name="prioridade" id="importante" className="task-form__priority-input task-form__priority-input--importante"/>Importante</label>  
                <label htmlFor="rotineira"><input type="radio" name="prioridade" id="rotineira" className="task-form__priority-input task-form__priority-input--rotineira"/>Rotineira</label>
            </fieldset>
            <input type="submit" className="task-form__button" value="Adicionar tarefa"/>
      </form>

    <ul>
      {tasks.map(a => {
        return <li key={a.id}>{a.name} <svg onClick={() => setTasks(tasks.filter(t => a !== t))} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-delete-icon lucide-delete"><path d="M10 5a2 2 0 0 0-1.344.519l-6.328 5.74a1 1 0 0 0 0 1.481l6.328 5.741A2 2 0 0 0 10 19h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2z"/><path d="m12 9 6 6"/><path d="m18 9-6 6"/></svg> <svg onClick={() =>{
          setModal(e => !e)
          setTaskId(a.id)
          setEditName(a.name)
        }} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-square-pen-icon lucide-square-pen"><path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z"/></svg></li>
        })}
    </ul>

    {modal && <> <div className="modal-edit__content">
                <label htmlFor="task-edit-input" className="modal-edit__label">Edite sua tarefa</label>
                <input type="text" value={editName} onChange={(e) => setEditName(e.currentTarget.value)}  name="task-edit-input" id="task-edit-input" className="modal-edit__input"/>
            </div>
            <div className="modal-edit__actions">
                <button className="modal-edit__button--update modal-edit__button">Atualizar</button>
                <button className="modal-edit__button--cancel modal-edit__button" onClick={() => setModal(e => !e)}>Cancelar</button>
            </div> </>}

    </>
  )
}

export default App
