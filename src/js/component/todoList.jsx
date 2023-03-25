import React, { useEffect, useState } from "react";

const TodoList = () => {
  const [todo, setTodo] = useState("");
  const [todoList, setTodoList] = useState([]);

  useEffect(() => {
    const getTodo = async () => {

      try {
        await fetch("https://assets.breatheco.de/apis/fake/todos/user/MasterSergio")
          .then((response) => response.json())
          .then((data) => setTodoList(data));
      } catch (error) {
        console.log(error);
      }
    };
    getTodo();
  }, []);

  const putTodo = async (todoList) => {
    try {
      await fetch("https://assets.breatheco.de/apis/fake/todos/user/MasterSergio", {
        method: "PUT",
        body: JSON.stringify(todoList),
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
  
  useEffect(() => {
    if (todoList.length > 0) {
      putTodo(todoList);
    }
  }, [todoList]);
  
  const deleteAllTodo = async () => {
    setTodoList([]);
    try {
      fetch("https://assets.breatheco.de/apis/fake/todos/user/MasterSergio", {
        method: "PUT",
        body: JSON.stringify([{ "msg": "Me siento vacio,llename", "done": false }]),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((data) => {if(data.result === "ok") {setTodoList([])}});
    } catch (error) {
      console.log(error);
    }
  };

  //guarda las tareas
  const handleTodo = (e) => {
    if (e.key === "Enter") {
      if (todo !== "") {
        setTodoList([...todoList, { label: todo, done: false }]);
        setTodo("");
      } else {
        alert("llename");
      }
    }
  };
  // eliminar tareas

  const deleteTodo = (indexToDelete) => {
    setTodoList(
      todoList.filter((todo, todoIndex) => todoIndex !== indexToDelete)
    );
  };

  return (
    <>
      <div className="row flex-wrap justify-content-center align-items-center gap-2 mb-5 mx-2">
        <div className="col-5 col-sm-3 ">
          <input
            type="text"
            className="form-control text-dark fw-bolder  mb-4"
            placeholder="Aqui,Aqui"
            aria-label="Username"
            onChange={(e) => setTodo(e.target.value)}
            value={todo}
            onKeyDown={handleTodo}
          />
        </div>

        <ul className="">
          {todoList.length === 0 && (
            <p className=" d-flex justify-content-center p-0 ">
              Me siento vacio, llename!
            </p>
          )}
          {Array.isArray(todoList) && todoList.map((item, i) => {
            return (
              
              <li
                key={i}
                className="d-flex justify-content-center  text-dark item fw-bold"
              >
                {item.label}
                <p className="delete  text-end" onClick={() => deleteTodo(i)}>

                  x
                </p>
              </li>
            );
          })}
        </ul>
        <div className="d-flex justify-content-center">
          <button className="btn btn-danger" onClick={deleteAllTodo}>
            Ya me esta vaciando
          </button>
        </div>
      </div>
    </>
  );
};
export default TodoList;