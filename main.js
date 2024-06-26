var carouselThumb = 0;
var carouselGallery;

function displayModal(index, galleryId) {
    carouselIndex = index;
    carouselGallery = document.getElementById(galleryId);
    displayImage();
    document.querySelector(".modal").style.display = "flex";
    document.querySelector(".modal_close_layer").style.display = "block";
}

function closeModal() {
    carouselIndex = 0;
    document.querySelector(".modal").style.display = "none";
    document.querySelector(".modal_close_layer").style.display = "none";
}

window.onclick = function (event) {
    if (event.target == document.querySelector(".modal") ||
        event.target == document.querySelector(".modal_close_layer")) {
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
    document.querySelector(".modal_content").style.visibility = "hidden";
    document.querySelector(".modal_spinner").style.visibility = "";
    checkBounds();
}

// "Scale this image to at most 70% of the page in terms of width/height,
// and then set the outer div to those dimensions" is not easily expressed
// in CSS in both firefox and chromium.
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
    const imageWidth = modalImage.naturalWidth;
    const imageHeight = modalImage.naturalHeight;

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

    // We want it to hover just above the gallery, centered
    var galleryLocation = carouselGallery.getBoundingClientRect();
    var remainingWidth = (windowWidth - adjustedWidth) / 2;
    var gapToGallery = 15;

    // center image and gallery on screen
    var remainingHeight = (windowHeight - adjustedHeight - 100 - gapToGallery) / 2;

    modalContent.style.marginLeft = remainingWidth + "px";

    var scrollY = window.scrollY;
    // safari
    if (scrollY < 0) {
        scrollY = 0;
    }

    var newHeight = galleryLocation.top - adjustedHeight + scrollY - gapToGallery;
    modalContent.style.marginTop = newHeight + "px";

    document.querySelector(".modal_spinner").style.visibility = "hidden";
    modalContent.style.visibility = "";
    modalContent.scrollIntoView(); // if the gallery was near the top of the page, the image opens out of view, which is weird
    window.scrollBy(0, -1*remainingHeight); // give the image a little space
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