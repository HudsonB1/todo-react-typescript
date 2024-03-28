import React from "react";

import styles from "./ModalEdit.module.css";

interface Props {
   children: React.ReactNode;
}

export default function ModalEdit({children }: Props) {

   function closeModal(e: React.MouseEvent): void {
      const modal = document.querySelector('#modal_edit');
      modal!.classList.toggle("hide");
   }

   return (
      <div id="modal_edit" className="hide">
         <div className={styles.fade} onClick={closeModal} />
         <div className={styles.modal}>
            <h2>Editar tarefa</h2>
            {children}
         </div>
      </div>
   );
}