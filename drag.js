//dragging

const editBtn = document.getElementById("editBtn");

document.addEventListener("dragstart",(e)=>{
    if(e.target.classList.contains("card")){

        if(e.target.classList.contains("Done")) return;
        e.target.classList.add("dragging");
        
    }
});

document.addEventListener("dragend",(e)=>{
    if(e.target.classList.contains("card")){
        e.target.classList.remove("dragging");
    }
});

//drop

const columns = document.querySelectorAll(".column");

columns.forEach(column => {
    column.addEventListener("dragover",(e)=>{
        e.preventDefault();
    });

    column.addEventListener("drop",()=>{
        const dragging = document.querySelector(".dragging");

         const tasks= column.querySelector(".tasks");
    
    //U priority koloni ne može biti preko 3 taska

        if(column.id === "priority"){
            const cards = column.querySelectorAll(".card");
            if(cards.length>=3){
                alert("You have already reached maximum!");
                return;
            }
        }

        tasks.appendChild(dragging);

        //U done koloni nema prevlačenja i buttoni su disabled
        
        if(column.id === "done"){
            dragging.classList.add("Done");
            dragging.setAttribute("draggable",false);
            const buttons = dragging.querySelectorAll("button");
            buttons.forEach(btn => {
                btn.disabled = true;
            });

        }

    });
});