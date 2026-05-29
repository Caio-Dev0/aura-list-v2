import { useEffect, useState } from "react"
import type { Task, Difficulty, Filter } from "../types/taskType"
import { difficultyWeight } from "../types/taskType"
import { saveLocalStorage, getLocalStorage } from "../storage/taskStorage"
import type { Toast } from "../types/toastType"


export function useTasks(handleCreateToast: (toast: Toast) => void){
    const [nameTask, setNameTask] = useState<string>("")
    const [tasks, setTasks] = useState<Task[]>(getLocalStorage("tasks"))
    const [modal, setModal] =useState<boolean>(false)
    const [taskEdit, setTaskEdit] = useState<Task | null> (null)
    const [taskDifficulty, setTaskDifficulty] = useState<Difficulty>("easy")
    const [activeFilter, setActiveFilter] = useState<Filter>("all")

    let filteredTasks: Task[] = []

    if(activeFilter === "all"){
      filteredTasks = tasks
    }else if(activeFilter === "easy" || activeFilter === "medium" || activeFilter === "hard"){
      filteredTasks = tasks.filter(task => task.difficulty === activeFilter)
    }else if(activeFilter === "completed"){
      filteredTasks = tasks.filter(task => task.completed)
    }else if(activeFilter === "pending"){
      filteredTasks = tasks.filter(task => !task.completed)
    }

    useEffect(() =>{
      saveLocalStorage("tasks", tasks)
    }, [tasks])


      function handleSubmitForm(): void{
        if(nameTask === ""){
          handleCreateToast({id: crypto.randomUUID(), message: "Adicione um nome para a tarefa", type: "error"})
          return
        }
        setTasks(e => [...e, {id: crypto.randomUUID(), name: nameTask, difficulty: taskDifficulty, completed: false}].sort((a, b) => difficultyWeight[b.difficulty] - difficultyWeight[a.difficulty]))
        setNameTask("")
        handleCreateToast({id: crypto.randomUUID(), message: "Tarefa adicionada com sucesso", type: "success"})
      }
    
      function handleDeleteTask(id: string): void{
        setTasks(prev => prev.filter(task => task.id !== id))
        setModal(false)
      }
    
      function handleEditTask(idTask: string, nameTask: string, difficulty: Difficulty, completed: boolean): void{
        setTaskEdit({id: idTask, name: nameTask, difficulty: difficulty, completed: completed})
        setModal(true)
      }
    
      function handleChangeTask(nameTask: string, difficulty: Difficulty, completed: boolean): void{
        setTaskEdit({id: taskEdit!.id, name: nameTask, difficulty: difficulty, completed: completed})
      }
      
      function handleUpdateTasks(nameTask: string){
        if(taskEdit?.name === ""){
          handleCreateToast({id: crypto.randomUUID(), message: "O nome da tarefa não pode ser vazio", type: "error"})
          return
        }else if(taskEdit?.name === nameTask){
          handleCreateToast({id: crypto.randomUUID(), message: "Altere o nome da tarefa para salvar", type: "error"})
          return
        }
        setTasks(tasks.map(task => task.id === taskEdit!.id ? {...task, name: taskEdit!.name, difficulty: taskEdit!.difficulty} : task).sort((a, b) => difficultyWeight[b.difficulty] - difficultyWeight[a.difficulty]))
        setModal(false)
        handleCreateToast({id: crypto.randomUUID(), message: "Tarefa atualizada com sucesso", type: "success"})
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

      function handleSelectFilter(filter: Filter){
        setActiveFilter(filter)
      }

      function handleCompleteTask(task: Task){
        setTasks(tasks.map(taskState => taskState.id === task!.id ? {...task, completed: !task.completed} : taskState).sort((a, b) => difficultyWeight[b.difficulty] - difficultyWeight[a.difficulty]))
      }

      return {handleSubmitForm, handleDeleteTask, handleEditTask, handleChangeTask, handleUpdateTasks, handleCloseModal, handleSaveNameTask, handleSaveDifficulty, tasks, nameTask, modal, taskEdit, handleSelectFilter, filteredTasks, handleCompleteTask }
}