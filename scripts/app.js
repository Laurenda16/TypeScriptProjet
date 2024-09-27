"use strict";
const itemsContainer = document.querySelectorAll('.items-container');

function addContainerListners(currentContainer) {
    const currentContainerDeletionBtn = currentContainer.querySelector('.delete-container-btn');
    deleteBtnListeners(currentContainerDeletionBtn);
}
itemsContainer.forEach((container) => {
    addContainerListners(container);
});
function deleteBtnListeners(btn) {
    btn.addEventListener("click", handleContainerDeletion);
}
function handleContainerDeletion(e) {
    const btn = e.target;
    const btnsArray = [...document.querySelectorAll('.delete-container-btn')];
    const containers = [...document.querySelectorAll('.items-container')];
    containers[btnsArray.indexOf(btn)].remove();
}
