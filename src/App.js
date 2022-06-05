import { useState } from "react";
import { Button, FormLabel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

// on removeTodoHandler, why must .bind and why "this" on it

const App = () => {
  const [activity, setActivity] = useState("");
  const [todos, setTodos] = useState([]);
  const [edit, setEdit] = useState({});

  const generateId = () => {
    return Date.now();
  };

  const saveTodoHandler = (event) => {
    event.preventDefault();

    if (edit.id) {
      // console.log("edited");
      const updatedTodo = {
        id: edit.id,
        activity,
      };
      // console.log(updatedTodo);

      const editTodoIndex = todos.findIndex(function (todo) {
        return todo.id === edit.id;
      });
      // console.log(editTodoIndex);

      const updatedTodos = [...todos];
      updatedTodos[editTodoIndex] = updatedTodo;
      // console.log("updatedTodos:", updatedTodos);

      return setTodos(updatedTodos);
    }

    setTodos([...todos, { id: generateId(), activity }]);
    setActivity("");
    // console.log("new activity:", activity);
    // console.log("todo list:", todos);
  };

  const removeTodoHandler = (todoId) => {
    // console.log("deleted button");
    const filteredTodos = todos.filter(function (todo) {
      // console.log(todo.id, todoId);
      return todo.id !== todoId;
    });
    // console.log(filteredTodos);
    setTodos(filteredTodos);
  };

  const editTodoHandler = (todo) => {
    // console.log(todo);
    setActivity(todo.activity);
    setEdit(todo);
  };

  return (
    <>
      <h1>todos</h1>
      <form onSubmit={saveTodoHandler}>
        <FormLabel htmlFor="todoinput">what needs to be done?</FormLabel>
        <br />
        <input
          type="text"
          id="todoinput"
          value={activity}
          placeholder="coding, dancing, etc."
          style={{ marginRight: "8px" }}
          onChange={function (event) {
            setActivity(event.target.value);
          }}
        />
        <Button type="submit" size="sm">
          {edit.id ? "update" : "add"}
        </Button>
      </form>
      <ul style={{ marginTop: "8px" }}>
        {todos.map(function (todo) {
          return (
            <li key={todo.id} style={{ marginTop: "8px" }}>
              {todo.activity}
              <Button
                size="sm"
                variant="success"
                onClick={editTodoHandler.bind(this, todo)}
                style={{ marginLeft: "8px", marginRight: "8px" }}
              >
                edit
              </Button>
              <Button
                size="sm"
                variant="danger"
                onClick={removeTodoHandler.bind(this, todo.id)}
              >
                delete
              </Button>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default App;
