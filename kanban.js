const addButton = document.getElementById("add");
const newTask = document.getElementById("newTask");
const toDoList = document.getElementById("toDoList");

addButton.addEventListener("click", () => {
    const task = newTask.value.trim();
    if (!task) return;

    const newCard = document.createElement("div");
    newCard.classList.add("card");
    newCard.setAttribute('draggable', true);

    const textSpan = document.createElement("span");
    textSpan.classList.add("taskText");
    textSpan.textContent = task;

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
    
    deleteBtn.addEventListener("click", () => {
        newCard.remove();
    });

    editBtn.addEventListener("click",()=>{

        const textSpan = newCard.querySelector(".taskText");
        const input = document.createElement("input");
        input.type = "text";
        input.value = textSpan.textContent;
        newCard.replaceChild(input, textSpan);
        input.focus();
        input.classList.add("changeName");

        input.addEventListener("keypress", (e) => {
            if (e.key === "Enter") {
                const newSpan = document.createElement("span");
                newSpan.classList.add("taskText");
                newSpan.textContent = input.value;
                newCard.replaceChild(newSpan, input);
             }
        });

    })
    newCard.appendChild(textSpan);
    newCard.appendChild(buttons);
    toDoList.appendChild(newCard);

    newTask.value = "";

    
});

const restart = document.getElementById("restart");
const tasks = document.querySelectorAll(".tasks");

restart.addEventListener("click",()=>{
    tasks.forEach(t =>{
        t.textContent="";
    });
});

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