var carouselThumb = 0;
var carouselGallery;

function displayModal(index, galleryId) {
    carouselIndex = index;
    carouselGallery = document.getElementById(galleryId);
    displayImage();
    document.querySelector(".modal").style.display = "flex";
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
    document.querySelector(".modal_image").src = nextImage;
    document.querySelector(".dummy_image").src = nextImage;
    document.querySelector(".modal_image").style.visibility = "hidden";
    checkBounds();
}

// "Scale this image to at most 70% of the page in terms of width/height,
// and then set the outer div to those dimensions" is not easily expressed
// in CSS in both firefox and chromium.
// Also needs a dummy image to prevent the size from "sticking" across images
function resize() {
    const windowWidth = window.innerWidth * 0.7;
    const windowHeight = window.innerHeight * 0.7;
    var modalImage =  document.querySelector(".modal_image");
    var dummyImage =  document.querySelector(".dummy_image");
    const imageWidth = dummyImage.width;
    const imageHeight = dummyImage.height;

    const widthFraction = windowWidth / imageWidth;
    const heightFraction = windowHeight / imageHeight;
    var adjustedWidth = imageWidth;
    var adjustedHeight = imageHeight;
    if (widthFraction < 1 || heightFraction < 1) {
        if (widthFraction < heightFraction) {
            adjustedWidth = imageWidth * widthFraction;
            adjustedHeight = imageHeight * widthFraction;
        } else {
            adjustedWidth = imageWidth * heightFraction;
            adjustedHeight = imageHeight * heightFraction;
        }
    }

    modalImage.style.width = adjustedWidth + "px";
    modalImage.style.height = adjustedHeight + "px";
    document.querySelector(".modal_content").style.width = adjustedWidth + "px";
    document.querySelector(".modal_content").style.height = adjustedHeight + "px";
    modalImage.style.visibility = "";
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