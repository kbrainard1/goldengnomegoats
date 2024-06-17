function displayModal(newImage) {
    document.querySelector(".modal_image").src = newImage;
    document.querySelector(".modal").style.display = "block";
}

function closeModal() {
    document.querySelector(".modal").style.display = "none";
}

window.onclick = function (event) {
    if (event.target == document.querySelector(".modal")) {
        closeModal();
    }
}