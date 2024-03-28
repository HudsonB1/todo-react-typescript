import React from "react";

import styles from "./TaskList.module.css";

import { ITask } from "../../interfaces/Task";

interface Props {
   taskList: ITask[];
   handleDelete(id: number): void;
   handleEdit(task: ITask): void;
}

export default function TaskList({ taskList, handleDelete, handleEdit }: Props) {

   return (
      <>
         {taskList.length > 0 ? (
            taskList.map((task) => (
               <div className={styles.task_list} key={task.id}>
                  <div className={styles.details}>
                     <p>Título: <h4>{task.title}</h4></p>
                     <p>Dificuldade: {task.difficulty}</p>
                  </div>
                  <div className={styles.actions}>
                     <i className="bi bi-pencil-square" onClick={() => handleEdit(task)}/>
                     <i className="bi bi-x-square" onClick={() => handleDelete(task.id)}/>
                  </div>
               </div>
            ))
         ) : (
            <p>Não há tarefas</p>
         )}
      </>
   );
}