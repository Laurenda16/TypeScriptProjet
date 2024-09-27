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
    deleteBtnListeners(currentContainerDeletionBtn);
    addItemBtnListeners(currentAddItemBtn);
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