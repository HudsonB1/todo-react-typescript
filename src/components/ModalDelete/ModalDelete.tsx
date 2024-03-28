import React from "react";

import styles from "./ModalDelete.module.css";

interface Props {
   confirmDelete: () => void;
   cancelDelete: () => void;
}

export default function ModalDelete({ confirmDelete, cancelDelete }: Props) {

   function closeModal(e: React.MouseEvent): void {
      const modal = document.querySelector('#modal_delete');
      modal!.classList.toggle("hide");
   }


   return (

      <div id="modal_delete" className="hide">
         <div className={styles.fade} onClick={closeModal} />
         <div className={styles.modal}>
            <h2>Excluir tarefa</h2>
            <p>Tem certeza que deseja excluir esta tarefa?</p>
            <div>
               <i className="bi bi-check-square" onClick={confirmDelete}/>
               <i className="bi bi-x-square" onClick={cancelDelete} />
            </div>
         </div>
      </div>
   );
}