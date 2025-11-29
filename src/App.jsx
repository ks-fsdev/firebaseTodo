import { useEffect, useRef, useState } from "react";
import Card from "./Card";
import Intro from "./Intro";
import axios from "axios";
import { AnimatePresence, motion } from "motion/react";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useUser,
  useAuth,
} from "@clerk/clerk-react";

const firebaseUrl =
  "https://fir-project-6fcdf-default-rtdb.asia-southeast1.firebasedatabase.app/";

function App() {
  const [showForm, setShowForm] = useState(false);
  const taskInput = useRef(null);
  let [formStatus, setFormStatus] = useState(false);
  let [todos, setTodos] = useState([]);
  let { user } = useUser();
  const { isSignedIn } = useAuth();

  function handleSubmit(e) {
    e.preventDefault();
    let task = taskInput.current.value;
    axios
      .post(`${firebaseUrl}todos.json`, { title: task, creator: user.username })
      .then(() => {
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
      {isSignedIn ? (
        <div className="min-h-screen bg-slate-950 text-white cursor-default">
          <header className="px-2 md:px-0 py-3 flex justify-between w-full mx-auto max-w-[500px] items-center">
            <p className="font-bold text-xl">TodoTada</p>

            <div className="flex gap-2 items-center justify-between">
              <button
                className="px-3.5 py-2 text-sm hover:cursor-pointer border-2 border-slate-800 transition-all duration-300 ease-in-out hover:ring-3 hover:ring-slate-900 rounded-full items-center justify-center flex gap-1.5 outline-0"
                onClick={() => setShowForm((prev) => !prev)}>
                Add Task
              </button>
              <SignedOut>
                <SignInButton className="px-3.5 py-2 text-sm hover:cursor-pointer border-2 border-slate-800 transition-all duration-300 ease-in-out hover:ring-3 hover:ring-slate-900 rounded-full items-center justify-center flex gap-1.5 outline-0" />
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </div>
          </header>
          <div className="w-full mx-auto max-w-[500px] p-3">
            <p className="p-3 text-center text-3xl mb-2">
              Welcome back,
              <span className="text-gray-500">
                @{isSignedIn ? user.username : ""}
              </span>
            </p>
            <p className="text-neutral-400 text-center max-w-[90%] mx-auto mb-3">
              Manage your tasks with TodoTada. World's leading task manager app.
            </p>

            <AnimatePresence>
              {showForm ? (
                <motion.div
                  key="add-task-form"
                  exit={{ opacity: 0, height: 0, width: "auto", y: -20 }}
                  animate={{ opacity: 1, height: "auto", width: "auto", y: 0 }}
                  initial={{ opacity: 0, height: 0, width: "auto", y: -20 }}
                  transition={{ duration: 0.3 }}>
                  <form action="" className="my-5">
                    <input
                      type="text"
                      autoFocus
                      className="mb-3 w-full bg-gray-900/50 border border-transparent text-gray-600 p-2 rounded-lg outline-0 focus:text-white focus:border focus:border-slate-500"
                      placeholder="add task.."
                      ref={taskInput}
                    />
                    <div className="flex gap-3">
                      <input
                        type="submit"
                        value={formStatus ? "Submiting..." : "Submit"}
                        onClick={handleSubmit}
                        className="w-full justify-center rounded-md px-3 py-2 text-sm font-semibold text-white sm:ml-3 sm:w-auto transition-all duration-300 ease-in-out bg-green-500 hover:bg-green-700 hover:cursor-pointer"
                      />
                      <button
                        className="w-full justify-center rounded-md bg-white/10 px-3 py-2 text-sm font-semibold transition-all duration-300 ease-in-out text-white inset-ring inset-ring-white/5 hover:bg-white/20 sm:mt-0 sm:w-auto hover:cursor-pointer"
                        onClick={(e) => {
                          e.preventDefault();
                          setShowForm((prev) => !prev);
                        }}>
                        Close
                      </button>
                    </div>
                  </form>
                </motion.div>
              ) : null}
            </AnimatePresence>

            <div className="mt-12">
              {todos
                .filter((todo) => user.username === todo.creator)
                .map((todo) => {
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
          </div>{" "}
        </div>
      ) : (
        <Intro />
      )}
    </>
  );
}

export default App;
