import './App.css'
import RenderTasks from './components/RenderTasks'
import FormTask from './components/FormTask'
import { useTasks } from './hooks/useTasks'



function App() {
  
  const { handleSubmitForm, handleDeleteTask, handleEditTask, handleChangeTask, handleUpdateTasks, handleCloseModal, handleSaveNameTask, handleSaveDifficulty, tasks, nameTask, modal, taskEdit } = useTasks()
  
  return (
    <>
    <FormTask handleSubmitForm={handleSubmitForm} nameTask={nameTask} handleSaveNameTask={handleSaveNameTask} handleSaveDifficulty={handleSaveDifficulty}/>
    <RenderTasks tasks={tasks} handleDeleteTask={handleDeleteTask} modal={modal} handleEditTask={handleEditTask} editTask={{name: taskEdit?.name ?? "", id: taskEdit?.id ?? 0, difficulty: taskEdit?.difficulty ?? "easy"}} handleChangeTask={handleChangeTask} handleUpdateTasks={handleUpdateTasks} handleCloseModal={handleCloseModal} />
  </>
  )
}

export default App