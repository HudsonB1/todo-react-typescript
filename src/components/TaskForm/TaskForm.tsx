import React, { useState, useEffect, FormEvent, ChangeEvent } from "react";

import styles from "./TaskForm.module.css";

import { ITask } from "../../interfaces/Task";

interface Props {
   btnText: string;
   taskList: ITask[];
   setTaskList?: React.Dispatch<React.SetStateAction<ITask[]>>;
   task?: ITask | null;
   handleUpdate?(id: number, title: string, difficulty: number): void;
}

export default function TaskForm({ btnText, taskList, setTaskList, task, handleUpdate }: Props) {

   const [id, setId] = useState<number>(0);
   const [title, setTitle] = useState<string>("");
   const [difficulty, setDifficulty] = useState<number>(0);

   useEffect(() => {
      if (task) {
         setId(task.id);
         setTitle(task.title);
         setDifficulty(task.difficulty);
      }
   }, [task])

   function addTaskHandler(event: FormEvent<HTMLFormElement>) {
      event.preventDefault();
      if (handleUpdate) {
         handleUpdate(id, title, difficulty);
      } else {
         const id = Math.floor(Math.random() * 1000);
         const newTask: ITask = { id, title, difficulty };
         setTaskList!([...taskList, newTask]);
         setTitle("");
         setDifficulty(0);
      }
   }

   function handleChange(event: ChangeEvent<HTMLInputElement>) {
      if (event.target.name === "title") {
         setTitle(event.target.value);
      } else if (event.target.name === "difficulty") {
         setDifficulty(parseInt(event.target.value));
      }
   }

   return (
      <form onSubmit={addTaskHandler} className={styles.form}>
         <div className={styles.input_container}>
            <label htmlFor="title">Título:</label>
            <input type="text" name="title" placeholder="Título da tarefa" onChange={handleChange} value={title} />
         </div>
         <div className={styles.input_container}>
            <label htmlFor="difficulty">Dificuldade:</label>
            <input type="text" name="difficulty" placeholder="Dificuldade da tarefa" onChange={handleChange} value={difficulty} />
         </div>
         <input type="submit" value={btnText} />
      </form>
   );
}