import { useEffect, useRef } from "react"
import type { Difficulty, Task } from "../../types/taskType"
import styles from "./Modal.module.css"

export default function Modal({editTask, modal, handleChangeTask, handleUpdateTasks, handleCloseModal}: {editTask: Task, modal: boolean, handleChangeTask(editName: string, difficulty: Difficulty): void, handleUpdateTasks(): void, handleCloseModal(): void}){
    const dialogRef = useRef<HTMLDialogElement | null>(null)
    
    useEffect(() =>{
        if(modal){
            dialogRef.current?.showModal()
        }else{
            dialogRef.current?.close()
        }
    }, [modal])
    
    return(
        <dialog ref={dialogRef} className={styles.modal}>
                <div className={styles["edit-actions"]}>
                    <label htmlFor="task-edit-input" className={styles.labels}>Edite sua tarefa</label>
                    <input type="text" value={editTask.name} onChange={(e) => handleChangeTask(e.currentTarget.value, editTask.difficulty)}  name="task-edit-input" id="task-edit-input" className={styles.input}/>
                    <fieldset className={styles["difficulty-container"]}>
                        <legend className={styles.legend}> Edite a dificuldade</legend>
                        <label htmlFor="dificilEdit" className={styles["badge-hard"]}><input type="radio" className={styles["input-radio"]} onChange={(e) => handleChangeTask(editTask.name, e.currentTarget.value as Difficulty)} name="editDificuldade" id="dificilEdit" value="hard" defaultChecked={editTask.difficulty === "hard"}/>Difícil</label>
                        <label htmlFor="medioEdit" className={styles["badge-medium"]}><input type="radio" className={styles["input-radio"]} onChange={(e) => handleChangeTask(editTask.name, e.currentTarget.value as Difficulty)} name="editDificuldade" id="medioEdit" value="medium" defaultChecked={editTask.difficulty === "medium"}/>Médio</label>  
                        <label htmlFor="facilEdit" className={styles["badge-easy"]}><input type="radio" className={styles["input-radio"]} onChange={(e) => handleChangeTask(editTask.name, e.currentTarget.value as Difficulty)} name="editDificuldade" id="facilEdit"  value="easy" defaultChecked={editTask.difficulty === "easy"} />Fácil</label>
                    </fieldset> 
                </div>
            
                <div className={styles["buttons-edit"]}>
                    <button className={`${styles.button} ${styles["button-update"]}`} onClick={() =>{
                    handleUpdateTasks()
                    }}>Atualizar</button>
                    <button className={`${styles.button} ${styles["button-cancel"]}`} onClick={handleCloseModal}>Cancelar</button>
                </div>
        </dialog>
    )
}