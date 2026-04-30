import type { Task } from "../types/taskType";


export function saveLocalStorage(name: string, item: Task[]){
    localStorage.setItem(name, JSON.stringify(item))
}

export function getLocalStorage(name: string){
    const itemStorage = localStorage.getItem(name)
    if(itemStorage){
        return JSON.parse(itemStorage) as Task[]
    }
    return []
}