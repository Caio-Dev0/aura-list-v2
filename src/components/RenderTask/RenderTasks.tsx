import { difficultyLabel, type Difficulty, type Filter, type Task } from "../../types/taskType"
import styles from "./RenderTasks.module.css"
import Modal from "../ModalEdit/Modal"

export default function RenderTasks({tasks, handleDeleteTask, modal, handleEditTask, editTask, handleChangeTask, handleUpdateTasks, handleCloseModal, filteredTasks, handleSelectFilter}: {tasks: Task[], handleDeleteTask(id: string): void, modal: boolean, handleEditTask(taskId: string, editName: string, difficulty: Difficulty): void, editTask: Task,  handleChangeTask(editName: string, difficulty: Difficulty): void, handleUpdateTasks(): void, handleCloseModal(): void, filteredTasks: Task[], handleSelectFilter(filter: Filter): void}){
    return(
    <>        
    <ul className={styles["tasks-container"]}>

    <fieldset className={styles["filter-container"]}>
        <legend className={styles.legend}></legend>
        <label htmlFor="allFilter"><input type="radio" className={styles["input-radio"]} name="difficultyFilter" onChange={e => handleSelectFilter(e.currentTarget.value as Filter)} id="allFilter" value="all"/>Todos ({tasks.length})</label>
        <label htmlFor="hardFilter"><input type="radio" className={styles["input-radio"]} name="difficultyFilter" onChange={e => handleSelectFilter(e.currentTarget.value as Filter)} id="hardFilter" value="hard"/>Difícil</label>
        <label htmlFor="mediumFilter"><input type="radio" className={styles["input-radio"]} name="difficultyFilter" onChange={e => handleSelectFilter(e.currentTarget.value as Filter)} id="mediumFilter"  value="medium"/>Médio</label>  
        <label htmlFor="easyFilter"><input type="radio" className={styles["input-radio"]} name="difficultyFilter" onChange={e => handleSelectFilter(e.currentTarget.value as Filter)} id="easyFilter" value="easy"/>Fácil</label>
    </fieldset>

    {filteredTasks.map(a => {
        return <li key={a.id} className={styles.task}><span className={styles["task-name"]}>{a.name}</span> <span className={styles[a.difficulty]}>{difficultyLabel[a.difficulty]}</span> <div className={styles["icons-container"]}><svg onClick={() =>{handleEditTask(a.id, a.name, a.difficulty)
        }} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`${styles.icon}`} ><path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z"/></svg><svg onClick={() => handleDeleteTask(a.id)} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`${styles.icon}`}><path d="M10 5a2 2 0 0 0-1.344.519l-6.328 5.74a1 1 0 0 0 0 1.481l6.328 5.741A2 2 0 0 0 10 19h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2z"/><path d="m12 9 6 6"/><path d="m18 9-6 6"/></svg></div></li>
        })}
    </ul>
        {modal ? <Modal modal={modal} editTask={editTask} handleChangeTask={handleChangeTask} handleUpdateTasks={handleUpdateTasks} handleCloseModal={handleCloseModal}  /> : ""}
    </>
    )
}

