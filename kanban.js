import { loadBoard, saveBoard } from "./storage.js";
import { callDrag } from "./drag.js";

function callEvents(){
    const addButton = document.getElementById("add");
    const newTask = document.getElementById("newTask");
    const newDesc = document.getElementById("newDescription");
    const toDoList = document.getElementById("toDoList");

    //Dodavanje novog taska

    addButton.addEventListener("click", () => {
        const task = newTask.value.trim();

        //Provjera da li je unešen naziv taska, nije obavezan opis
        if (!task) return;

        //Kreiranje kartice sa nazivom, opisom i buttonima

        const newCard = document.createElement("div");
        newCard.classList.add("card");
        newCard.setAttribute('draggable', true);

        const textSpan = document.createElement("span");
        textSpan.classList.add("taskText");
        textSpan.textContent = task;

        const descSpan = document.createElement("span");
        descSpan.classList.add("taskDesc");
        descSpan.textContent = newDesc.value; 

        const deleteBtn = document.createElement("button");
        const doneBtn = document.createElement("button");
        const editBtn = document.createElement("button");

        const buttons = document.createElement("div");

        editBtn.textContent = "✏️";
        deleteBtn.textContent = "❌";
        doneBtn.textContent = "✔️";

        buttons.appendChild(editBtn);
        buttons.appendChild(doneBtn);
        buttons.appendChild(deleteBtn);

        doneBtn.classList.add("doneBtn");
        deleteBtn.classList.add("deleteBtn");
        editBtn.classList.add("editBtn");
        editBtn.id="edit";
        doneBtn.id="Done";

        const texts = document.createElement("div");
        texts.classList.add("texts");

        texts.appendChild(textSpan);
        texts.appendChild(descSpan);

        newCard.appendChild(texts);
        newCard.appendChild(buttons);
        toDoList.appendChild(newCard);

        newTask.value = "";
        newDesc.value = "";

        saveBoard();
        
    });

    //dodavanje nove kolone

    const addColumn = document.getElementById("addColumn");
    const newColumn = document.getElementById("newColumn");
    const board = document.querySelector(".kanbanBoard");

    addColumn.addEventListener("click",()=>{
        const col =  newColumn.value.trim();
        if (!col) return;

        const newColDiv = document.createElement("div");
        newColDiv.classList.add("column");
        newColDiv.setAttribute("draggable",true);

        const h2 = document.createElement("h2");
        h2.classList.add("h2");
        h2.appendChild(document.createTextNode(col));

        const removeCol = document.createElement("button");
        removeCol.textContent = "❌";
        removeCol.classList.add("deleteCol");
        h2.appendChild(removeCol);

        removeCol.addEventListener("click",()=>{
            newColDiv.remove();
            saveBoard();
        });

        //edit button imena kolone

        const editBtnH = document.createElement("button");
        editBtnH.textContent = "✏️";
        editBtnH.classList.add("editBtn");
        h2.appendChild(editBtnH);

        editBtnH.addEventListener("click", () => {
            const currentTitle = h2.firstChild.textContent.trim();

            const input2 = document.createElement("input");
            input2.type = "text";
            input2.value = currentTitle;
            input2.classList.add("h2", "changeName");

            removeCol.style.display = "none";
            editBtnH.style.display = "none";
            h2.removeChild(h2.firstChild);
            h2.insertBefore(input2, h2.firstChild);
            input2.focus();

            input2.addEventListener("keypress", (e) => {
                if (e.key === "Enter") {
                    h2.removeChild(input2);
                    h2.insertBefore(document.createTextNode(input2.value || currentTitle), h2.firstChild);
                    removeCol.style.display = "";
                    editBtnH.style.display = "";
                    saveBoard();
                }
            });
        });

        newColDiv.appendChild(h2);

        const tasksDiv = document.createElement("div");
        tasksDiv.classList.add("tasks");
        newColDiv.appendChild(tasksDiv);

        //Lista gradijenata koje koristim za nove kolone

        const gradients = [
            "linear-gradient(120deg, #f6d365, #fda085 100%)",
            "linear-gradient(120deg, #a1c4fd, #c2e9fb 100%)",
            "linear-gradient(120deg, #fccb90, #d57eeb 100%)"
        ];

        const randomGradient = gradients[Math.floor(Math.random() * gradients.length)];

        newColDiv.style.background = randomGradient;
        newColDiv.classList.add("column");
        newColDiv.classList.add("column2");

        const inProgress = document.getElementById("inProgress");
        board.insertBefore(newColDiv, inProgress);

        newColumn.value="";
        saveBoard();
    });

    //Delegacija klikova na dugmad kartica

    board.addEventListener("click", (e) => {

        if(e.target.classList.contains("deleteCol")){
            const col = e.target.closest(".column");
            if(col){
                col.remove();
                saveBoard();
            }
        }
        const card = e.target.closest(".card");
        if (!card) return;
        
        // Delete button kojim se uklanja određena kartica
        if (e.target.classList.contains("deleteBtn")) {
            card.remove();
            saveBoard();
        }

        //Done button u samoj kartici, ako se klikne automatski prelazi kartica u done kolonu
        if (e.target.id === "Done") {
            const done = document.getElementById("done").querySelector(".tasks");
            done.appendChild(card);

            card.setAttribute("draggable",false);

            card.classList.add("Done");

            const edit = card.querySelector("#edit");
            const Done = card.querySelector("#Done");
            if (edit){
                edit.disabled = true;
                Done.disabled = true;
            }
            saveBoard();
        }

        //Edit button kojim se uređuje naziv ili opis, tj. stari se zamjenjuje novim
        if (e.target.id === "edit"){

            const textAndDesc = card.querySelector(".texts");
            const textSpan = card.querySelector(".taskText");
            const descSpan = card.querySelector(".taskDesc");

            const inputTask = document.createElement("input");
            inputTask.type = "text";
            inputTask.value = textSpan.textContent;
            inputTask.classList.add("changeName");

            const inputDesc = document.createElement("input");
            inputDesc.type = "text";
            inputDesc.value = descSpan.textContent;
            inputDesc.classList.add("changeName");

            textAndDesc.replaceChild(inputTask, textSpan);
            textAndDesc.replaceChild(inputDesc, descSpan);

            //mijenjanje naziva 
            
            function replace(input, className) {
                input.addEventListener("keypress", (e) => {
                    if (e.key === "Enter") {
                        const newSpan = document.createElement("span");
                        newSpan.classList.add(className);
                        newSpan.textContent = input.value;
                        textAndDesc.replaceChild(newSpan, input);
                        saveBoard();
                    }
                });
            }
            replace(inputTask, "taskText");
            replace(inputDesc, "taskDesc");
        }
    });

    const restart = document.getElementById("restart");
    const restartCol = document.getElementById("restartColumn");

    //uklanjanje svih kartica i novih kolona

    restart.addEventListener("click",()=>{
        document.querySelectorAll(".tasks").forEach(t =>{
            t.textContent="";
        });
        saveBoard();
    });

    restartCol.addEventListener("click",()=>{
        document.querySelectorAll(".column2").forEach(c=>{
            c.remove();
        })
        saveBoard();
    })

    //Uređivanje naziva kolone nakon load-a 

    const H2 = document.querySelectorAll(".h2");
    H2.forEach(h => h.querySelectorAll(".editBtn").forEach(b => b.remove()));

    H2.forEach(h => {

        // Provjera da li edit dugme već postoji — izbjegava duplikate nakon refresha
        if (h.querySelector(".editBtn")) return;

        const editBtnH = document.createElement("button");
        editBtnH.textContent = "✏️";
        editBtnH.classList.add("editBtn");
        h.appendChild(editBtnH);

        editBtnH.addEventListener("click", () => {
            const currentTitle = h.firstChild.textContent.trim();

            const input2 = document.createElement("input");
            input2.type = "text";
            input2.value = currentTitle;
            input2.classList.add("h2", "changeName");

            // Sakrivamo editBtn tokom edita — bez brisanja h2 sadržaja
            editBtnH.style.display = "none";
            h.removeChild(h.firstChild);
            h.insertBefore(input2, h.firstChild);
            input2.focus();

            input2.addEventListener("keypress", (e) => {
                if (e.key === "Enter") {
                    h.removeChild(input2);
                    h.insertBefore(document.createTextNode(input2.value || currentTitle), h.firstChild);
                    editBtnH.style.display = "";
                    saveBoard();
                }
            });
        });
    });
}

document.addEventListener("DOMContentLoaded",()=>{
    loadBoard();
    callEvents();
    callDrag();
});