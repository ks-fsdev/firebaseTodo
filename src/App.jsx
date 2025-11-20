import { useEffect, useRef, useState } from "react";
import Card from "./Card";
import axios from "axios";

const firebaseUrl =
  "https://fir-project-6fcdf-default-rtdb.asia-southeast1.firebasedatabase.app/";

function App() {
  let taskInput = useRef(null);
  let [formStatus, setFormStatus] = useState(false);
  let [todos, setTodos] = useState([]);

  function handleSubmit(e) {
    e.preventDefault();
    let task = taskInput.current.value;
    axios.post(`${firebaseUrl}todos.json`, { title: task }).then(() => {
      setFormStatus(true);
      setTimeout(() => {
        setFormStatus(false);
      }, 300);

      fetchTodos();
    });

    console.log(task);
  }

  function fetchTodos() {
    axios.get(`${firebaseUrl}todos.json`).then((todos) => {
      let tempTodos = [];
      for (let key in todos.data) {
        let todo = {
          id: key,
          ...todos.data[key],
        };
        tempTodos.push(todo);
      }
      setTodos(tempTodos);
    });
  }

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleDelete = (id) => {
    console.log("handle deleted" + id);
    axios.delete(`${firebaseUrl}todos/${id}.json`).then(() => fetchTodos());
  };
  return (
    <>
      <div className="w-[90vw] mx-auto md:w-[500px]">
        <h1 className="font-black text-4xl my-5">
          Welcome back, <span>@khushi</span>
        </h1>
        <p className="text-2xl my-3">Manage your tasks!</p>
        <p className="">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ullam quam
          iusto at rem mollitia, maiores nisi quaerat eius alias earum.
        </p>

        <form action="" className="my-5">
          <input
            type="text"
            name=""
            className="p-3 outline-none border border-neutral-200 rounded-lg w-full"
            placeholder="add task.."
            id=""
            ref={taskInput}
          />
          <input
            type="submit"
            value={formStatus ? "Submiting..." : "Create Task"}
            onClick={handleSubmit}
            className="bg-cyan-100 text-cyan-800 py-3 px-8 font-semibold rounded-lg mt-3 cursor-pointer"
          />
        </form>

        <div className="mt-12">
          {todos.map((todo) => {
            return (
              <Card
                title={todo.title}
                key={todo.id}
                handleDelete={handleDelete}
                id={todo.id}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
