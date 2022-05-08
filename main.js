function Title (props) {
    const {text, className} = props;
    return (<h1 className={className}>{text}</h1>)
}

const reducer = (state, action) => {
    switch (action.type) {
        case "ADD":
            return {
                currentId: state.currentId + 1,
                toDos: [...state.toDos, {id: state.currentId, text: action.text, completed: action.completed}]
            };
        case "REMOVE": 
            return {
                ...state,
                toDos: state.toDos.filter((toDo) => toDo.id !== action.id)
            }
        case "TODO_COMPLETED":
            return {
                ...state,
                toDos: state.toDos.map((toDo) =>
                  toDo.id === action.id
                    ? { ...toDo, completed: !toDo.completed }
                    : toDo,
                ),
            };
            default :
                return (state);
    }
}


function ToDoForm (props) {
    const {formClassName, inputClassName} = props;
    const [newToDo, getNewToDo] = React.useState('');
    const [{toDos}, dispatch] = React.useReducer(reducer, {
        currentId: 0,
        toDos: [],
    });

    const handleSubmit = (e) => {
        e.preventDefault ();

        dispatch({type: "ADD", text: newToDo});
        getNewToDo('');
    }   

    const handleRightClick = (id) => (e) => {
        e.preventDefault();

        dispatch({type: "REMOVE", id})
    }

    const handleLeftClick = (id) => (e) => {
        e.preventDefault ();

        dispatch({type: "TODO_COMPLETED", id})
    }

    return (
        <form action="post" className={formClassName} onSubmit={handleSubmit}>
            <input 
            type="text" 
            className={inputClassName}
            value={newToDo}
            placeholder="Enter your ToDo"
            onChange={(e) => getNewToDo(e.target.value)}/>
            
            <ul className="todos">
                {toDos.map(({id, text, completed}) => 
                <li key={id}
                    className={completed ? "todo completed" : "todo"}
                    onClick={handleLeftClick(id)}
                    onContextMenu={handleRightClick(id)}>
                    {text}
                </li>)}
            </ul>
        </form>
    )
}

function ToDo () {
    return (
        <div className="container">
            <Title text="ToDos" className="title"/>
            <ToDoForm formClassName="form" inputClassName="inputForm"/>
            <small className="small">
                Left click to toggle complete.<br/>
                Right click to delete the todo.
            </small>
        </div>
    )
}

ReactDOM.render(<ToDo/>, document.querySelector('#root'));