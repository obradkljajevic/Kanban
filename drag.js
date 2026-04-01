//dragging

const editBtn = document.getElementById("editBtn");
const board = document.querySelector(".kanbanBoard");

document.addEventListener("dragstart",(e)=>{

    if(e.target.classList.contains("card")){
        if(e.target.classList.contains("Done")) return; 
        e.target.classList.add("dragging");
        e.target.classList.add("active");
        
    }
});

document.addEventListener("dragend",(e)=>{
    if(e.target.classList.contains("card")){
        e.target.classList.remove("dragging");
        e.target.classList.remove("active");
    }
});


board.addEventListener("dragover", e => e.preventDefault());

//Drop

board.addEventListener("drop", e => {
    const column = e.target.closest(".column"); 
    if (!column) return;

    const dragging = document.querySelector(".dragging");
    if (!dragging) return;

    const task = column.querySelector(".tasks");

    //Ako je kolona property ne može preko 3 kartice da ima

    if (column.id === "priority" && task.children.length >= 3) {
        alert("You have already reached maximum!");
        return;
    }

    task.appendChild(dragging);

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
});