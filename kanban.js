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

            const allButtons = newCard.querySelectorAll("button");
            allButtons.forEach(btn => {
                btn.disabled = true;
            });
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

    const restart = document.getElementById("restart");
    const tasks = document.querySelectorAll(".tasks");

    //uklanjanje svih kartica

    restart.addEventListener("click",()=>{
        tasks.forEach(t =>{
            t.textContent="";
        });
    });

    const h2 = document.querySelectorAll(".h2");

    //Uređivanje naziva kolone

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
});
    