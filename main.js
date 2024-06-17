var carouselThumb = 0;
var carouselGallery;

function displayModal(index, galleryId) {
    carouselIndex = index;
    carouselGallery = document.getElementById(galleryId);
    displayImage();
    document.querySelector(".modal").style.display = "block";
}

function closeModal() {
    carouselIndex = 0;
    document.querySelector(".modal").style.display = "none";
}

window.onclick = function (event) {
    if (event.target == document.querySelector(".modal")) {
        closeModal();
    }
}

function prevImage() {
      carouselIndex--;
      displayImage();
}

function nextImage() {
    carouselIndex++;
    displayImage();
}

function displayImage() {
    var nextImage = carouselGallery.children[carouselIndex].getAttribute("full_size");
    document.querySelector(".modal_content").style.backgroundImage = "url('" + nextImage + "')";
    checkBounds();
}

function checkBounds() {
    var numChildren = carouselGallery.childElementCount;
    if (carouselIndex <= 0) {
        hide("prev_image");
    } else {
        show("prev_image");
    }
    if (carouselIndex >= numChildren - 1) {
        hide("next_image");
    } else {
        show("next_image");
    }
}

function hide(elemClass) {
    document.querySelector("." + elemClass).className = elemClass + " inline hidden";
}

function show(elemClass) {
    document.querySelector("." + elemClass).className = elemClass;
}