import { useState } from 'react'
import './App.css'

function App() {
  const [nameTask, setNameTask] = useState<string>("")
  const [tasks, setTasks] = useState<string[]>([])


  function handleSubmitForm(e: any): void{
    e.preventDefault()
    if(nameTask === ""){
      return
    }
    setTasks(e => [...e, nameTask])
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
        return <li key={a}>{a}</li>
        })}
    </ul>
    </>
  )
}

export default App
