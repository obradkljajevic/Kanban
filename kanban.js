document.addEventListener("DOMContentLoaded",()=>{
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

        //Delete button kojim se uklanja određena kartica

        deleteBtn.addEventListener("click", () => {
            newCard.remove();
        });

        //Edit button kojim se uređuje naziv ili opis, tj. stari se zamjenjuje novim

        editBtn.addEventListener("click",()=>{

            const textAndDesc = newCard.querySelector(".texts");
            const textSpan = newCard.querySelector(".taskText");
            const descSpan = newCard.querySelector(".taskDesc");

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

            inputTask.addEventListener("keypress", (e) => {
                if (e.key === "Enter") {
                    const newSpan = document.createElement("span");
                    newSpan.classList.add("taskText");
                    newSpan.textContent = inputTask.value;
                    textAndDesc.replaceChild(newSpan, inputTask);
                }
            });
            inputDesc.addEventListener("keypress", (e) => {
                if (e.key === "Enter") {
                    const newSpan = document.createElement("span");
                    newSpan.classList.add("taskDesc");
                    newSpan.textContent = inputDesc.value;
                    textAndDesc.replaceChild(newSpan, inputDesc);
                }
            });
        });

        //Done button u samoj kartici, ako se klikne automatski prelazi kartica u done kolonu
        //Takođe su buttoni disabled jer nema daljeg uređivanja

        doneBtn.addEventListener("click",()=>{
            const done = document.getElementById("done").querySelector(".tasks");
            done.appendChild(newCard);

            newCard.setAttribute("draggable",false);

            newCard.classList.add("Done");

            const edit = newCard.querySelector("#edit");
            const Done = newCard.querySelector("#Done");
            if (edit){
                edit.disabled = true;
                Done.disabled = true;
            }
        });


        const texts = document.createElement("div");
        texts.classList.add("texts");

        texts.appendChild(textSpan);
        texts.appendChild(descSpan);

        newCard.appendChild(texts);
        newCard.appendChild(buttons);
        toDoList.appendChild(newCard);

        newTask.value = "";
        newDesc.value = "";
        
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
        h2.textContent=col;

        const removeCol = document.createElement("button");
        removeCol.textContent = "❌";
        removeCol.classList.add("deleteBtn");
        h2.appendChild(removeCol);

        removeCol.addEventListener("click",()=>{
            newColDiv.remove();
        })
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
    });

    //Uređivanje naziva kolone

    const h2 = document.querySelectorAll(".h2");

    h2.forEach(h => {
        const editBtnH = document.createElement("button");
        editBtnH.textContent = "✏️";
        editBtnH.classList.add("editBtn");
        h.appendChild(editBtnH);

        editBtnH.addEventListener("click", () => {

            const input2 = document.createElement("input");
            input2.type = "text";
            input2.value = "Enter title"; 
            input2.classList.add("h2");

            h.textContent = "";
            h.appendChild(input2);

            input2.focus();
            input2.classList.add("changeName");

            input2.addEventListener("keypress", (e) => {
                if (e.key === "Enter") {
                    h.textContent = input2.value;
                    h.appendChild(editBtnH);
                    
                }
            });
        });
    });

    const restart = document.getElementById("restart");
    const restartCol = document.getElementById("restartColumn");

    //uklanjanje svih kartica i novih kolona

    restart.addEventListener("click",()=>{
        document.querySelectorAll(".tasks").forEach(t =>{
            t.textContent="";
        });

    });
    restartCol.addEventListener("click",()=>{
        document.querySelectorAll(".column2").forEach(c=>{
            c.remove();
        })
    })
});
    