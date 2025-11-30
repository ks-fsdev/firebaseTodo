import { motion } from "motion/react";
import { useState } from "react";
import Loader from "./Loader";

function Card({ title, handleDelete, id }) {
  const [deleting, setDeleting] = useState(false);

  const deletingFunction = () => {
    handleDelete(id);
    setDeleting(true);
  };

  return (
    <motion.div
      layout
      key={id}
      initial={{ opacity: 0, x: 0, y: -10 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      exit={{ opacity: 0, x: -40, y: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}>
      <div className="p-3 mb-5 m-auto border border-neutral-500 transition-all duration-300 ease-in-out rounded-xl  flex justify-between items-center">
        <p className="text-lg">{title}</p>

        {!deleting ? (
          <button
            onClick={deletingFunction}
            id="taskDelete"
            className="flex items-center justify-between p-1 gap-2 text-sm hover:cursor-pointer hover:text-red-600 transition duration-500 ${statusDelBtn}">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-trash3"
              viewBox="0 0 16 16">
              <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
            </svg>
            <p>Delete</p>
          </button>
        ) : (
          <Loader />
        )}
      </div>
    </motion.div>
  );
}

export default Card;
