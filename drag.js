import { saveBoard } from "./storage.js";

//Drag and drop

export function callDrag(){

    const board = document.querySelector(".kanbanBoard");

    //dragging

    document.addEventListener("dragstart",(e)=>{

        //drag kartice

        if(e.target.classList.contains("card")){
            if(e.target.classList.contains("Done")) return; 
            e.target.classList.add("dragging");
            e.target.classList.add("active");
            
        }

        //drag kolone

        if(e.target.classList.contains("column")){
            e.target.classList.add("draggingCol");
        }
    });

    document.addEventListener("dragend",(e)=>{
        if(e.target.classList.contains("card")){
            e.target.classList.remove("dragging");
            e.target.classList.remove("active");
        }
        if(e.target.classList.contains("column")){
            e.target.classList.remove("draggingCol");
        }
    });


    board.addEventListener("dragover", (e) => e.preventDefault());

    //Drop

    board.addEventListener("drop", e => {

        const dragging = document.querySelector(".dragging");

        const draggingCol = document.querySelector(".draggingCol");

        if(dragging){
            const column = e.target.closest(".column"); 
            if (!column) return;

            const task = column.querySelector(".tasks");

            //Ako je kolona property ne može imati preko 3 kartice

            if (column.id === "priority" && task.children.length >= 3) {
                alert("You have already reached maximum!");
                return;
            }

            //prevlačenje kartica unutar kolone

            const targetCard = e.target.closest(".card");

            if (targetCard && targetCard !== dragging) {
                task.insertBefore(dragging, targetCard);
            }else{
                task.appendChild(dragging);
            }

            if (column.id === "done") {
                dragging.classList.add("Done");
                dragging.setAttribute("draggable", false);
                const edit = dragging.querySelector("#edit");
                const done = dragging.querySelector("#Done")
                if (edit) {
                    edit.disabled = true;
                    done.disabled = true;
                }
            }
            dragging.classList.remove("active");
            saveBoard();
        }
        if(draggingCol){
            const targetCol = e.target.closest(".column");
            if(!targetCol) return; 
            board.insertBefore(draggingCol,targetCol);

            saveBoard();
        }
    });
}
