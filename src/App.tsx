import './globals.css'
import RenderTasks from './components/RenderTask/RenderTasks'
import FormTask from './components/FormTask/FormTask'
import { useTasks } from './hooks/useTasks'
import { useToast } from './hooks/useToast'



function App() {
  const {isActive, toast, handleCreateToast} = useToast()
  const { handleSubmitForm, handleDeleteTask, handleEditTask, handleChangeTask, handleUpdateTasks, handleCloseModal, handleSaveNameTask, handleSaveDifficulty, tasks, nameTask, modal, taskEdit, handleSelectFilter, filteredTasks, handleCompleteTask } = useTasks(handleCreateToast)
  

  return (
    <>
    <FormTask handleSubmitForm={handleSubmitForm} nameTask={nameTask} handleSaveNameTask={handleSaveNameTask} handleSaveDifficulty={handleSaveDifficulty}/>
    <RenderTasks tasks={tasks} handleDeleteTask={handleDeleteTask} modal={modal} handleEditTask={handleEditTask} editTask={{name: taskEdit?.name ?? "", id: taskEdit?.id ?? "", difficulty: taskEdit?.difficulty ?? "easy", completed: taskEdit?.completed ?? false}} handleChangeTask={handleChangeTask} handleUpdateTasks={handleUpdateTasks} handleCloseModal={handleCloseModal} filteredTasks={filteredTasks} handleSelectFilter={handleSelectFilter} handleCompleteTask={handleCompleteTask} isActive={isActive} toast={toast ?? null}/>
  </>
  )
}

export default App