import { useState } from "react"
import type { Task, Difficulty } from "../types/taskType"
import { difficultyWeight } from "../types/taskType"

export function useTasks(){
    const [nameTask, setNameTask] = useState<string>("")
    const [tasks, setTasks] = useState<Task[]>([])
    const [modal, setModal] =useState<boolean>(false)
    const [taskEdit, setTaskEdit] = useState<Task | null> (null)
    const [taskDifficulty, setTaskDifficulty] = useState<Difficulty>("easy")
    
      function handleSubmitForm(): void{
        if(nameTask === ""){
          return
        }
        setTasks(e => [...e, {id: tasks.length + 1, name: nameTask, difficulty: taskDifficulty}].sort((a, b) => difficultyWeight[b.difficulty] - difficultyWeight[a.difficulty]))
        setNameTask("")
      }
    
      function handleDeleteTask(id: number): void{
        setTasks(prev => prev.filter(task => task.id !== id))
        setModal(false)
      }
    
      function handleEditTask(idTask: number, nameTask: string, difficulty: Difficulty): void{
        setTaskEdit({id: idTask, name: nameTask, difficulty: difficulty})
        setModal(true)
      }
    
      function handleChangeTask(nameTask: string): void{
        setTaskEdit({id: taskEdit!.id, name: nameTask, difficulty: taskEdit!.difficulty})
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
    
      function handleSaveDifficulty(e: Difficulty): void{
        setTaskDifficulty(e)
      }
      return {handleSubmitForm, handleDeleteTask, handleEditTask, handleChangeTask, handleUpdateTasks, handleCloseModal, handleSaveNameTask, handleSaveDifficulty, tasks, nameTask, modal, taskEdit} as const
}