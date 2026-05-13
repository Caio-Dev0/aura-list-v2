import { useEffect, useState } from "react"
import type { Task, Difficulty } from "../types/taskType"
import { difficultyWeight } from "../types/taskType"
import { saveLocalStorage, getLocalStorage } from "../storage/taskStorage"


export function useTasks(){
    const [nameTask, setNameTask] = useState<string>("")
    const [tasks, setTasks] = useState<Task[]>(getLocalStorage("tasks"))
    const [modal, setModal] =useState<boolean>(false)
    const [taskEdit, setTaskEdit] = useState<Task | null> (null)
    const [taskDifficulty, setTaskDifficulty] = useState<Difficulty>("easy")
    
    useEffect(() =>{
      saveLocalStorage("tasks", tasks)
    }, [tasks])


      function handleSubmitForm(): void{
        if(nameTask === ""){
          return
        }
        setTasks(e => [...e, {id: crypto.randomUUID(), name: nameTask, difficulty: taskDifficulty}].sort((a, b) => difficultyWeight[b.difficulty] - difficultyWeight[a.difficulty]))
        setNameTask("")
      }
    
      function handleDeleteTask(id: string): void{
        setTasks(prev => prev.filter(task => task.id !== id))
        setModal(false)
      }
    
      function handleEditTask(idTask: string, nameTask: string, difficulty: Difficulty): void{
        setTaskEdit({id: idTask, name: nameTask, difficulty: difficulty})
        setModal(true)
      }
    
      function handleChangeTask(nameTask: string, difficulty: Difficulty): void{
        setTaskEdit({id: taskEdit!.id, name: nameTask, difficulty: difficulty})
      }
      
      function handleUpdateTasks(){
        setTasks(tasks.map(task => task.id === taskEdit!.id ? {...task, name: taskEdit!.name, difficulty: taskEdit!.difficulty} : task).sort((a, b) => difficultyWeight[b.difficulty] - difficultyWeight[a.difficulty]))
        setModal(false)
      }
   
      function handleCloseModal(): void{
        setModal(false)
      }
    
      function handleSaveNameTask(e: string){
        setNameTask(e)
      }
    
      function handleSaveDifficulty(e: Difficulty): void{
        setTaskDifficulty(e)
      }


      return {handleSubmitForm, handleDeleteTask, handleEditTask, handleChangeTask, handleUpdateTasks, handleCloseModal, handleSaveNameTask, handleSaveDifficulty, tasks, nameTask, modal, taskEdit}
}