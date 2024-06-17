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
    var windowWidth = window.innerWidth;
    var windowHeight = window.innerHeight;

    // ugh, mobile
    var screenWidth = screen.availWidth;
    var screenHeight = screen.availHeight;
    if (windowWidth > screenWidth) {
        windowWidth = screenWidth;
    } 
    if (windowHeight > screenHeight) {
        windowHeight = screenHeight;
    }
    
    var smallWindowWidth = windowWidth * 0.7;
    var smallWindowHeight = windowHeight * 0.7;

    // determine limiting dimension for image scaling
    var modalImage = document.querySelector(".modal_image");
    var dummyImage = document.querySelector(".dummy_image");
    const imageWidth = dummyImage.width;
    const imageHeight = dummyImage.height;

    const widthFraction = smallWindowWidth / imageWidth;
    const heightFraction = smallWindowHeight / imageHeight;
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

    // update visible component dimensions
    modalImage.style.width = adjustedWidth + "px";
    modalImage.style.height = adjustedHeight + "px";
    var modalContent = document.querySelector(".modal_content");
    modalContent.style.width = adjustedWidth + "px";
    modalContent.style.height = adjustedHeight + "px";

    // mobile is unhelpful about the positioning here
    // We want it to hover just above the gallery, centered
    // in the visible window
    var remainingWidth = (windowWidth - adjustedWidth)/2;
    var remainingHeight = (windowHeight - adjustedHeight)/2;
    modalContent.style.marginLeft = remainingWidth + "px";
    
    var scrollY = window.scrollY;
    // safari
    if (scrollY < 0) {
        scrollY = 0;
    }

    var galleryLocation = carouselGallery.getBoundingClientRect();
    var newHeight = galleryLocation.top - adjustedHeight + scrollY - 10;
    modalContent.style.marginTop = newHeight + "px";

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