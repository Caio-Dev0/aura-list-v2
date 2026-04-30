function FormTask({handleSubmitForm, nameTask, handleSaveNameTask, handleSaveDifficulty}: {handleSubmitForm(): void, nameTask: string, handleSaveNameTask(e: string): void, handleSaveDifficulty(e: string): void}){
    return(
    <form className="task-form" onSubmit={(e) =>{
        e.preventDefault()
        handleSubmitForm()
    }}>
        <label htmlFor="task-form__input">Adicione sua tarefa</label>
            <input className='task-form__input' id="task-form__input" value={nameTask} onChange={(e) => handleSaveNameTask(e.currentTarget.value)} type="text" aria-label="Adicione o nome de sua tarefa"/>
            <fieldset className="task-form__priority">
                <legend className="task-form__priority-legend">Prioridade Tarefa</legend>
                <label htmlFor="dificil"><input type="radio" name="dificuldade" id="dificil" onChange={e => handleSaveDifficulty(e.currentTarget.value)} value="hard"  className="task-form__priority-input task-form__priority-input--urgente" />Difícil</label>
                <label htmlFor="medio"><input type="radio" name="dificuldade" id="medio" onChange={e => handleSaveDifficulty(e.currentTarget.value)} value="medium"  className="task-form__priority-input task-form__priority-input--importante"/>Médio</label>  
                <label htmlFor="facil"><input type="radio" name="dificuldade" id="facil" onChange={e => handleSaveDifficulty(e.currentTarget.value)} value="easy"  className="task-form__priority-input task-form__priority-input--rotineira" defaultChecked/>Fácil</label>
            </fieldset>
            <input type="submit" className="task-form__button" value="Adicionar tarefa"/>
    </form>
 )
}

export default FormTask