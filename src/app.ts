const itemsContainer = document.querySelectorAll('.items-container') as NodeListOf<HTMLDivElement>
let actualContainer:HTMLDivElement;
let actualBtn :HTMLButtonElement;
let actualUL:HTMLUListElement;
let actualForm:HTMLFormElement;
let actualTextInput:HTMLInputElement;
let actualValidation:HTMLSpanElement;






function addContainerListners(currentContainer: HTMLDivElement)
{
    const currentContainerDeletionBtn = currentContainer.querySelector('.delete-container-btn') as HTMLButtonElement;
    const currentAddItemBtn = currentContainer.querySelector('.add-item-btn') as HTMLButtonElement
    const currentCloseFormBtn = currentContainer.querySelector('.close-form-btn') as HTMLButtonElement
    const currentForm = currentContainer.querySelector('form') as HTMLFormElement
   

    deleteBtnListeners(currentContainerDeletionBtn);
    addItemBtnListeners(currentAddItemBtn);
    closingFormBtnListeners(currentCloseFormBtn);
   addFormSubmitListeners(currentForm);
   addDDListeners(currentContainer);


}
itemsContainer.forEach((container: HTMLDivElement)=>
{
    addContainerListners(container);
})


//function2
function addItemBtnListeners(btn:HTMLButtonElement)

{
btn.addEventListener("click", handleAddItem)
}


function deleteBtnListeners(btn:HTMLButtonElement)

{
btn.addEventListener("click", handleContainerDeletion)
}

//fonction3
function closingFormBtnListeners(btn:HTMLButtonElement){
    btn.addEventListener('click',() => toggleForm( actualBtn, actualForm, false))
    }
function addFormSubmitListeners(form:HTMLFormElement)
{
    form.addEventListener('submit', createNewItem)
}
//ADD
function addDDListeners(element:HTMLElement)
{
    element.addEventListener('dragstart', handleDragStart)
    element.addEventListener('dragover', handleDragOver)
    element.addEventListener('drop', handleDrop)
    element.addEventListener('dragend', handleDragEnd)
}



function handleContainerDeletion(e:MouseEvent)
{
const btn = e.target as HTMLButtonElement;
const btnsArray = [...document.querySelectorAll('.delete-container-btn')] as HTMLButtonElement[];
const containers = [...document.querySelectorAll('.items-container')] as HTMLDivElement[];

containers[btnsArray.indexOf(btn)].remove();

}

function handleAddItem(e:MouseEvent)
{
    const btn = e.target as HTMLButtonElement;
    if(actualContainer)toggleForm(actualBtn,actualForm,false);
   
    setContainerItems(btn);
    toggleForm(actualBtn,actualForm,true);

}
function toggleForm(btn:HTMLButtonElement, form:HTMLFormElement, action:boolean)
{
    if(!action)
    {
        form.style.display= "none"
        btn.style.display ="block"
    }else if(action)
    {
         form.style.display= "block"
        btn.style.display ="note"
    }

}
///fonction setConatainer

function setContainerItems(btn:HTMLButtonElement)
{
  actualBtn =btn;
 actualContainer= btn.parentElement as HTMLDivElement;

 actualUL= actualContainer.querySelector('ul') as HTMLUListElement;
actualForm= actualContainer.querySelector('form') as HTMLFormElement;
 actualTextInput= actualContainer.querySelector('input') as HTMLInputElement;
 actualValidation = actualContainer.querySelector('.validation-msg') as HTMLSpanElement;

}
function createNewItem(e:Event)
{
    e.preventDefault()
    //validation
    if(actualTextInput.value.length === 0)
    {
        actualValidation.textContent = "Must be at least 1 character long"
    return;

    }else{
        actualValidation.textContent = "";
    }
    //creation Item
    const itemContent =actualTextInput.value;
    const li =`
    <li class="item" graggable ="true">
    <p>${itemContent} </p>
    <button>X</button>
    </li>`
    actualUL.insertAdjacentHTML('beforeend',li);
  const item = actualUL.lastElementChild as HTMLLIElement
  const liBtn = item.querySelector('button') as HTMLButtonElement
  handleItemDelection(liBtn);
//ajout
addDDListeners(item);


  actualTextInput.value = "";

}
function   handleItemDelection(btn:HTMLButtonElement)
{
btn.addEventListener('click',()=>
{
    const elToRemove =btn.parentElement as HTMLLIElement

elToRemove.remove();
})
}
//add new container
const addContainerBtn = document.querySelector('.add-container-btn') as HTMLButtonElement
const addContainerForm = document.querySelector('.add-new-container form') as HTMLFormElement
const addContainerFormInput =document.querySelector('.add-new-container input') as HTMLInputElement
const validationNewContainer=document.querySelector('.add-new-container .validation-msg')as HTMLSpanElement
const addContainerCloseBtn=document.querySelector('.close-add-list') as HTMLButtonElement 
const addNewContainer =document.querySelector('.add-new-container')as HTMLDivElement
const containersList =document.querySelector('.main-content') as HTMLDivElement

addContainerBtn.addEventListener('click',()=>
{
    toggleForm(addContainerBtn, addContainerForm, true)
})
addContainerCloseBtn.addEventListener('click', ()=>
{
    toggleForm(addContainerBtn,addContainerForm,false)
})

addContainerForm.addEventListener('submit',createNewContainer);

function createNewContainer(e:Event)
{
    e.preventDefault();
    if(addContainerFormInput.value.length === 0)
    {
        validationNewContainer.textContent ="Mulst be at least 1 charatee long";
        return;
    }else{
        validationNewContainer.textContent='';
    }
const itemsContainer = document.querySelector('.items-container') as HTMLDivElement

const newContainer = itemsContainer.cloneNode() as HTMLDivElement

const newContainerContent=
`
            <div class="top-container">
                <h2>${addContainerFormInput.value}</h2>
                <button class="delete-container-btn">X</button>
            </div>
<ul></ul>
<button type="button" class="add-item-btn">Add an item</button>
<form action="" autocomplete="off">
    <div class="top-form-container">
        <label for="">Add a new item</label>
        <button class="close-form-btn">x</button>
    </div>
   

<input type="text" name="" id="item">
<span class="validation-msg"></span>
<button type="submit">Submit</button>



</form>
      

`
newContainer.innerHTML =newContainerContent;
containersList.insertBefore(newContainer,addNewContainer)
addContainerFormInput.value=""
addContainerListners(newContainer);
}
//dree and drop

let dragSrcEl:HTMLElement;
function handleDragStart(this:HTMLElement, e:DragEvent)
{
e.stopPropagation();
if(actualContainer) toggleForm(actualBtn,actualForm,false)
dragSrcEl = this;
e.dataTransfer?.setData('text/html', this.innerHTML)

}

function handleDragOver(e:DragEvent)
{
    e.preventDefault();
}

function handleDrop(this:HTMLElement, e:DragEvent)
{
    e.stopPropagation();
    
    const receptionEl = this;
    if(dragSrcEl.nodeName === "LI" && receptionEl.classList.contains("items-container"))
    {
         (receptionEl.querySelector('ul') as HTMLUListElement).appendChild(dragSrcEl);
        addDDListeners(dragSrcEl)
        handleItemDelection(dragSrcEl.querySelector("button") as HTMLButtonElement)
    }

    if(dragSrcEl !== this && this.classList[0] === dragSrcEl.classList[0]){
        dragSrcEl.innerHTML = this.innerHTML;
        this.innerHTML = e.dataTransfer?.getData('text/html') as string;

    if(this.classList.contains("items-container")) {
        addContainerListners(this as HTMLDivElement);

       this.querySelectorAll('li').forEach((li: HTMLLIElement)=>  {
            handleItemDelection(li.querySelector('button')as HTMLButtonElement)
            addDDListeners(li) ;
        })
    } else{
        addDDListeners(this)
        handleItemDelection(this.querySelector("button") as HTMLButtonElement)
    }
}

}

function handleDragEnd(this:HTMLElement, e:DragEvent)
{
    e.stopPropagation();
    if(this.classList.contains('items-container'))
    {
        addContainerListners(this as HTMLDivElement)
        this.querySelectorAll('li').forEach((li: HTMLLIElement)=>  {
            handleItemDelection(li.querySelector('button')as HTMLButtonElement)
            addDDListeners(li) ;
        })
    }else{
        addDDListeners(this);
        }
}