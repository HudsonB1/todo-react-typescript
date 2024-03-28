import React, { useState } from 'react';

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import TaskForm from './components/TaskForm/TaskForm';
import ModalEdit from './components/ModalEdit/ModalEdit';
import ModalDelete from './components/ModalDelete/ModalDelete';

import styles from './App.module.css';
import TaskList from './components/TaskList/TaskList';

import { ITask } from './interfaces/Task';

export default function App() {

   const [taskList, setTaskList] = useState<ITask[]>([]);
   const [taskToUpdate, setTaskToUpdate] = useState<ITask | null>(null);
   const [id, setId] = useState(0);

   function modalDelete(id: number)  {
      const modal = document.querySelector('#modal_delete');
      modal!.classList.remove("hide");
      setId(id);
   }

   function confirmDelete() {
      const modal = document.querySelector('#modal_delete');
      modal!.classList.toggle("hide");
      deleteTask(id);
   }
   
   function cancelDelete() {
      const modal = document.querySelector('#modal_delete');
      modal!.classList.toggle("hide");
   }

   function deleteTask(id: number) {
      setTaskList(taskList.filter((task) => task.id !== id));
   }

   function editTask(task: ITask) {
      const modal = document.querySelector('#modal_edit');
      modal!.classList.toggle("hide");
      setTaskToUpdate(task);
   }

   function updateTask(id: number, title: string, difficulty: number) {
      const updatedTask: ITask = { id, title, difficulty };

      const updatedItems = taskList.map((task) => {
         return task.id === updatedTask.id ? updatedTask : task;
      });

      setTaskList(updatedItems);

      const modal = document.querySelector('#modal_edit');
      modal!.classList.toggle("hide");
   }


   return (
      <>
         <ModalEdit children={<TaskForm btnText='Editar tarefa' taskList={taskList} task={taskToUpdate} handleUpdate={updateTask} />} />
         <ModalDelete cancelDelete={cancelDelete} confirmDelete={confirmDelete}/>
         <Header />
         <main className={styles.main}>
            <div>
               <h2>O que você vai fazer?</h2>
               <TaskForm btnText='Criar tarefa' taskList={taskList} setTaskList={setTaskList} />
            </div>
            <div>
               <h2>Suas tarefas</h2>
               <p>Lista</p>
               <TaskList taskList={taskList} handleDelete={modalDelete} handleEdit={editTask} />
            </div>
         </main>
         <Footer />
      </>
   );
}