import type React from "react"

function FormTask({handleSubmitForm, nameTask, handleSaveNameTask}: {handleSubmitForm(e: React.SubmitEvent): void, nameTask: string, handleSaveNameTask(e: string): void}){
    return(
    <form className="task-form" onSubmit={(e) =>{
        handleSubmitForm(e)
        
    }}>
        <label htmlFor="task-form__input">Adicione sua tarefa</label>
            <input className='task-form__input' id="task-form__input" value={nameTask} onChange={(e) => handleSaveNameTask(e.currentTarget.value)} type="text" aria-label="Adicione o nome de sua tarefa"/>
            <fieldset className="task-form__priority">
                <legend className="task-form__priority-legend">Prioridade Tarefa</legend>
                <label htmlFor="dificil"><input type="radio" name="dificuldade" id="dificil" value="dificil"  className="task-form__priority-input task-form__priority-input--urgente"/>Urgente</label>
                <label htmlFor="medio"><input type="radio" name="dificuldade" id="medio" value="medio"  className="task-form__priority-input task-form__priority-input--importante"/>Importante</label>  
                <label htmlFor="facil"><input type="radio" name="dificuldade" id="facil" value="facil"  className="task-form__priority-input task-form__priority-input--rotineira"/>Rotineira</label>
            </fieldset>
            <input type="submit" className="task-form__button" value="Adicionar tarefa"/>
    </form>
 )
}

export default FormTask