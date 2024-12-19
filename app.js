//---------------------------------------
// Changing Dial Preview Functionality
//---------------------------------------

document.addEventListener("DOMContentLoaded", function () {
    // Select all interactive elements
    const dialColors = document.querySelectorAll(".dialcolor");
    const dialMovements = document.querySelectorAll(".dialmovement");
    const dialDesigns = document.querySelectorAll(".dialdesign");
    const dialIndices = document.querySelectorAll(".dialindex");
    const dialSizes = document.querySelectorAll(".dialsize");

    // Get preview elements
    const dialBaseImage = document.getElementById("dialBaseImage");
    const dialMovementOverlay = document.getElementById("dialMovementOverlay");
    const dialDesignOverlay = document.getElementById("dialDesignOverlay");
    const dialIndexOverlay = document.getElementById("dialIndexOverlay");

    // Default selections
    const defaultSelections = {
        size: null,
        movement: "none",
        color: "white",
        design: "none",
        index: "none" // No default index
    };

    let selectedDialColor = `./img/dialcolors/${defaultSelections.color}.png`;
    let selectedMovement = defaultSelections.movement ? `./img/dialmovements/${defaultSelections.movement}.png` : null;
    let selectedDesign = defaultSelections.design ? `./img/dialdesigns/${defaultSelections.design}.png` : null;
    let selectedIndex = defaultSelections.index ? `./img/dialindices/${defaultSelections.index}.png` : null;

    // Set initial default image
    dialBaseImage.src = selectedDialColor;

    // Utility to clear selected classes
    const clearSelected = (elements) => {
        elements.forEach(el => el.classList.remove("selected"));
    };

    // Utility to add hover effect
    const addHoverEffect = (elements, imageElement, folder, type) => {
        elements.forEach(element => {
            element.addEventListener("mouseenter", function () {
                const value = this.dataset.value;
                imageElement.src = `./img/${folder}/${value}.png`;
                imageElement.style.display = "block";
            });
            element.addEventListener("mouseleave", function () {
                const selectedValue = type === "color" ? selectedDialColor :
                                      type === "movement" ? selectedMovement :
                                      type === "design" ? selectedDesign : selectedIndex;

                if (selectedValue) {
                    imageElement.src = selectedValue;
                    imageElement.style.display = "block";
                } else if (type === "color") {
                    imageElement.src = selectedDialColor;
                } else {
                    imageElement.style.display = "none";
                }
            });
        });
    };

    // Utility to handle click and selection
    const handleClick = (elements, imageElement, folder, type) => {
        elements.forEach(element => {
            element.addEventListener("click", function () {
                clearSelected(elements);
                this.classList.add("selected");

                const value = this.dataset.value;
                const newValue = `./img/${folder}/${value}.png`;

                if (type === "color") {
                    selectedDialColor = newValue;
                    dialBaseImage.src = selectedDialColor;
                } else if (type === "movement") {
                    selectedMovement = newValue;
                    imageElement.src = selectedMovement;
                } else if (type === "design") {
                    selectedDesign = newValue;
                    imageElement.src = selectedDesign;
                } else if (type === "index") {
                    selectedIndex = newValue;
                    imageElement.src = selectedIndex;
                }
            });
        });
    };

    // Apply default selections
    const applyDefaultSelection = (elements, category, value) => {
        const defaultElement = [...elements].find(el => el.dataset.value === value);
        if (defaultElement) {
            defaultElement.classList.add("selected");
            if (category === "size") {
                // Size does not update overlays
            } else if (category === "movement") {
                dialMovementOverlay.src = `./img/dialmovements/${value}.png`;
            } else if (category === "color") {
                dialBaseImage.src = `./img/dialcolors/${value}.png`;
            } else if (category === "design") {
                dialDesignOverlay.src = `./img/dialdesigns/${value}.png`;
            } else if (category === "index") {
                dialIndexOverlay.src = value ? `./img/dialindices/${value}.png` : "";
            }
        }
    };

    applyDefaultSelection(dialSizes, "size", defaultSelections.size);
    applyDefaultSelection(dialMovements, "movement", defaultSelections.movement);
    applyDefaultSelection(dialColors, "color", defaultSelections.color);
    applyDefaultSelection(dialDesigns, "design", defaultSelections.design);
    applyDefaultSelection(dialIndices, "index", defaultSelections.index); 

    // Add hover and click effects to all elements
    addHoverEffect(dialColors, dialBaseImage, "dialcolors", "color");
    addHoverEffect(dialMovements, dialMovementOverlay, "dialmovements", "movement");
    addHoverEffect(dialDesigns, dialDesignOverlay, "dialdesigns", "design");
    addHoverEffect(dialIndices, dialIndexOverlay, "dialindices", "index");

    handleClick(dialColors, dialBaseImage, "dialcolors", "color");
    handleClick(dialMovements, dialMovementOverlay, "dialmovements", "movement");
    handleClick(dialDesigns, dialDesignOverlay, "dialdesigns", "design");
    handleClick(dialIndices, dialIndexOverlay, "dialindices", "index");
    handleClick(dialSizes, dialBaseImage, "dialsizes", "size");
});

//--------------------------------------------
// Dial Preview Hoving Centre Functionality
//--------------------------------------------

// Get the dial preview element
const dialPreview = document.querySelector('.dialPreview');

// Get the dial preview container element
const dialPreviewContainer = document.querySelector('.dialPreviewContainer');

// Listen to window scroll events
window.addEventListener('scroll', () => {
    const containerTop = dialPreviewContainer.getBoundingClientRect().top;
    
    if (containerTop <= 0) {
        // If the container is at the top of the screen, make the dial preview sticky
        dialPreview.classList.add('sticky');
    } else {
        // If the container is scrolled down, remove the sticky class
        dialPreview.classList.remove('sticky');
    }
});

//---------------------------------------------
// Dial Customization Section Opening / Closing Logic
//---------------------------------------------

document.addEventListener("DOMContentLoaded", function () {
    // Select all section titles and sections
    const sectionTitles = document.querySelectorAll('.dialsizestitles, .dialmovementstitles, .dialcolorstitles, .dialdesignstitles, .dialindiciestitles, .diallogostitles');
    const sections = document.querySelectorAll('.dialcustomization .dialsizes, .dialcustomization .dialmovements, .dialcustomization .dialcolors, .dialcustomization .dialdesigns, .dialcustomization .dialindicies, .dialcustomization diallogoscontainer');

    // Ensure the first section (Dial Size) is open by default
    document.querySelector('.dialsizes').style.display = 'flex';

    // Function to toggle sections
    sectionTitles.forEach(sectionTitle => {
        sectionTitle.addEventListener("click", function () {
            const targetSection = sectionTitle.nextElementSibling;

            // Toggle the visibility of the section
            if (targetSection.style.display === 'flex') {
                targetSection.style.display = 'none';
            } else {
                targetSection.style.display = 'flex';
            }
        });
    });

    // Function to scroll to the next section after clicking a button, with the title 25% from the top
    const scrollToNextSection = (elements, nextSection) => {
        elements.forEach(element => {
            element.addEventListener("click", function () {
                // Ensure the next section is visible
                if (nextSection.style.display !== 'flex') {
                    nextSection.style.display = 'flex';
                }

                // Calculate the position where we want the section to land (25% from top of the screen)
                const nextSectionPosition = nextSection.getBoundingClientRect().top + window.scrollY;
                const offset = window.innerHeight * 0.25;  // 25% of the viewport height

                // Scroll to that position
                window.scrollTo({
                    top: nextSectionPosition - offset,
                    behavior: 'smooth'
                });
            });
        });
    };

    // Add scroll-to functionality for each section
    scrollToNextSection(document.querySelectorAll('.dialsize'), document.querySelector('.dialmovements'));
    scrollToNextSection(document.querySelectorAll('.dialmovement'), document.querySelector('.dialcolors'));
    scrollToNextSection(document.querySelectorAll('.dialcolor'), document.querySelector('.dialdesigns'));
    scrollToNextSection(document.querySelectorAll('.dialdesign'), document.querySelector('.dialindicies'));
    scrollToNextSection(document.querySelectorAll('.dialindicies'), document.querySelector('.diallogos'));
});


//-----------------------------------------
// Custom Dial Size Hidden Option's Logic
//-----------------------------------------

document.addEventListener("DOMContentLoaded", function () {
    const customSizeButton = document.querySelector('.dialsize[data-value="custom"]');
    const customSizeSection = document.querySelector('.customSizeSection');
    const saveButton = document.getElementById('saveCustomSize');
    const dialMovementsSection = document.querySelector('.dialmovements');
    const dialSizeOptions = document.querySelectorAll('.dialsize');  // Assuming these represent all the options

    // Initially hide dial movements section
    dialMovementsSection.style.display = "none"; 

    // Custom Size button functionality
    customSizeButton.addEventListener("click", () => {
        // Toggle visibility of the custom size section
        if (customSizeSection.style.display === "none") {
            customSizeSection.style.display = "flex";
            customSizeSection.scrollIntoView({ behavior: "smooth", block: "center" });
        } else {
            customSizeSection.style.display = "none";
        }

        // Hide dial movements section when custom size is selected
        dialMovementsSection.style.display = "none"; 
    });

    // Handle non-custom size selection
    dialSizeOptions.forEach(button => {
        button.addEventListener("click", () => {
            if (button !== customSizeButton) {
                customSizeSection.style.display = "none";  // Hide custom size section when a non-custom option is selected
                dialMovementsSection.style.display = "flex"; // Show dial movements section if other size option is selected

                // Scroll to dial movements section after it's displayed
                dialMovementsSection.scrollIntoView({ behavior: "smooth", block: "center" });
            }
        });
    });

    // Save button functionality for custom size
    saveButton.addEventListener("click", () => {
        // Validate inputs
        const dialDiameter = parseFloat(document.getElementById('dialDiameter').value);
        const additionalComments = document.getElementById('additionalComments').value;
        const uploadFile = document.getElementById('uploadDialShape').files[0];

        if (!dialDiameter || dialDiameter < 20 || dialDiameter > 50) {
            alert("Please enter a valid diameter (20-50 mm).");

            // Reset the diameter input to the nearest valid value
            const resetValue = dialDiameter < 20 ? 20 : 50;
            document.getElementById('dialDiameter').value = resetValue;

            return;
        }

        // Proceed to the next section
        dialMovementsSection.style.display = "flex";  // Show dial movements section when saved
        dialMovementsSection.scrollIntoView({ behavior: "smooth", block: "center" });
    });
});

//-----------------------------------------
// Custom Movement Hidden Option's Logic
//-----------------------------------------

document.addEventListener("DOMContentLoaded", function () {
    const customMovementButton = document.querySelector('.dialmovement[data-value="custom"]'); // Assuming "none" is for custom movement
    const customMovementSection = document.querySelector('.customMovementSection');
    const saveButton = document.getElementById('saveCustomMovement');
    const dialColorsSection = document.querySelector('.dialcolors');
    const dialMovementOptions = document.querySelectorAll('.dialmovement');

    // Initially hide dial colors section
    dialColorsSection.style.display = "none"; 

    // Custom Movement button functionality
    customMovementButton.addEventListener("click", () => {
        // Toggle visibility of the custom movement section
        if (customMovementSection.style.display === "none") {
            customMovementSection.style.display = "flex";
            customMovementSection.scrollIntoView({ behavior: "smooth", block: "center" });
        } else {
            customMovementSection.style.display = "none";
        }

        // Hide dial colors section when custom movement is selected
        dialColorsSection.style.display = "none"; 
    });

    // Handle non-custom movement selection
    dialMovementOptions.forEach(button => {
        button.addEventListener("click", () => {
            if (button !== customMovementButton) {
                customMovementSection.style.display = "none";  // Hide custom movement section when a non-custom option is selected
                dialColorsSection.style.display = "flex"; // Show dial colors section if other movement option is selected

                // Scroll to dial colors section after it's displayed
                dialColorsSection.scrollIntoView({ behavior: "smooth", block: "center" });
            }
        });
    });

    // Save button functionality for custom movement
    saveButton.addEventListener("click", () => {
        const customMovementName = document.getElementById('customMovement').value;

        if (!customMovementName.trim()) {
            alert("Please enter a valid movement name.");
            return;
        }

        // Proceed to the next section
        dialColorsSection.style.display = "flex";  // Show dial colors section when saved
        dialColorsSection.scrollIntoView({ behavior: "smooth", block: "center" });
    });
});


// File Previewing Under Uploaded Files Functionality
document.addEventListener("DOMContentLoaded", function () {
    const upperLogoInput = document.getElementById("upper-logo");
    const lowerLogoInput = document.getElementById("lower-logo");

    const upperLogoPreview = document.getElementById("upper-logo-preview");
    const lowerLogoPreview = document.getElementById("lower-logo-preview");

    // Handle file preview for Upper Logo
    upperLogoInput.addEventListener("change", function (e) {
        const file = e.target.files[0];
        if (file && (file.type === "image/png" || file.type === "image/svg+xml")) {
            const reader = new FileReader();
            reader.onload = function (event) {
                const preview = document.createElement("img");
                preview.src = event.target.result;
                upperLogoPreview.innerHTML = ""; // Clear previous preview
                upperLogoPreview.appendChild(preview);
            };
            reader.readAsDataURL(file);
        } else {
            upperLogoPreview.innerHTML = "<p>Please upload a valid PNG or SVG file.</p>";
        }
    });

    // Handle file preview for Lower Logo
    lowerLogoInput.addEventListener("change", function (e) {
        const file = e.target.files[0];
        if (file && (file.type === "image/png" || file.type === "image/svg+xml")) {
            const reader = new FileReader();
            reader.onload = function (event) {
                const preview = document.createElement("img");
                preview.src = event.target.result;
                lowerLogoPreview.innerHTML = ""; // Clear previous preview
                lowerLogoPreview.appendChild(preview);
            };
            reader.readAsDataURL(file);
        } else {
            lowerLogoPreview.innerHTML = "<p>Please upload a valid PNG or SVG file.</p>";
        }
    });
});


// Uploading Custom Logo Witchcraft

document.addEventListener("DOMContentLoaded", function () {
    const upperLogoInput = document.getElementById("upper-logo");
    const lowerLogoInput = document.getElementById("lower-logo");
    const dialPreview = document.querySelector(".dialPreview");
    const upperLogoPreview = document.getElementById("upper-logo-preview");
    const lowerLogoPreview = document.getElementById("lower-logo-preview");

    function createResizableImage(file, target, previewTarget, previewElement) {
        const reader = new FileReader();
        reader.onload = function (event) {
            const imgContainer = document.createElement("divFlo");
            imgContainer.classList.add("resizable-image-container");

            const img = document.createElement("img");
            img.src = event.target.result;
            img.classList.add("resizable-image");

            const removeButton = document.createElement("div");
            removeButton.textContent = "X";
            removeButton.classList.add("remove-button");
            removeButton.addEventListener("click", function () {
                target.removeChild(imgContainer);
                previewElement.innerHTML = ""; // Clear the logo preview
                previewTarget.value = ""; // Reset the file input field
            });

            imgContainer.appendChild(img);
            imgContainer.appendChild(removeButton);
            target.appendChild(imgContainer);

            makeElementResizable(imgContainer);
            makeElementDraggable(imgContainer, target);

            // Show controls when hovering over the image container
            imgContainer.addEventListener("mouseenter", function () {
                imgContainer.classList.add("show-controls");
            });

            // Hide controls when leaving the image container (unless it's clicked)
            imgContainer.addEventListener("mouseleave", function () {
                if (!imgContainer.classList.contains("clicked")) {
                    imgContainer.classList.remove("show-controls");
                }
            });

            // Click to keep controls visible until clicked outside
            imgContainer.addEventListener("click", function () {
                imgContainer.classList.add("clicked");
                imgContainer.classList.add("show-controls");
                // Prevent click from propagating to body
                event.stopPropagation();
            });
        };
        reader.readAsDataURL(file);
    }

    upperLogoInput.addEventListener("change", function (e) {
        const file = e.target.files[0];
        if (file && (file.type === "image/png" || file.type === "image/svg+xml")) {
            createResizableImage(file, dialPreview, upperLogoInput, upperLogoPreview);
        } else {
            alert("Please upload a valid PNG or SVG file.");
        }
    });

    lowerLogoInput.addEventListener("change", function (e) {
        const file = e.target.files[0];
        if (file && (file.type === "image/png" || file.type === "image/svg+xml")) {
            createResizableImage(file, dialPreview, lowerLogoInput, lowerLogoPreview);
        } else {
            alert("Please upload a valid PNG or SVG file.");
        }
    });

    // Detect clicks outside of the image container to hide controls
    document.addEventListener("click", function (e) {
        const clickedInside = e.target.closest(".resizable-image-container");
        if (!clickedInside) {
            const allContainers = document.querySelectorAll(".resizable-image-container");
            allContainers.forEach(container => {
                container.classList.remove("clicked");
                container.classList.remove("show-controls");
            });
        }
    });

    function makeElementDraggable(element, container) {
        let isDragging = false;
        let offsetX, offsetY;

        element.addEventListener("mousedown", function (e) {
            isDragging = true;
            offsetX = e.clientX - element.offsetLeft;
            offsetY = e.clientY - element.offsetTop;
            element.style.cursor = "grabbing";
            e.preventDefault();
        });

        window.addEventListener("mousemove", function (e) {
            if (isDragging) {
                let newX = e.clientX - offsetX;
                let newY = e.clientY - offsetY;

                const rect = container.getBoundingClientRect();
                const elemRect = element.getBoundingClientRect();

                newX = Math.max(0, Math.min(newX, rect.width - elemRect.width));
                newY = Math.max(0, Math.min(newY, rect.height - elemRect.height));

                element.style.left = newX + "px";
                element.style.top = newY + "px";
            }
        });

        window.addEventListener("mouseup", function () {
            isDragging = false;
            element.style.cursor = "grab";
        });
    }

    function makeElementResizable(element) {
        const resizeHandles = ["top", "bottom", "left", "right", "top-left", "top-right", "bottom-left", "bottom-right"];

        resizeHandles.forEach(handle => {
            const resizeHandle = document.createElement("div");
            resizeHandle.classList.add("resize-handle", handle);
            resizeHandle.style.cursor = `${handle.replace("-", "")}-resize`;
            resizeHandle.addEventListener("mousedown", function (e) {
                e.preventDefault();

                const startX = e.clientX;
                const startY = e.clientY;
                const startWidth = element.offsetWidth;
                const startHeight = element.offsetHeight;
                const startLeft = element.offsetLeft;
                const startTop = element.offsetTop;

                function resizeHandler(moveEvent) {
                    const deltaX = moveEvent.clientX - startX;
                    const deltaY = moveEvent.clientY - startY;

                    if (handle.includes("left")) {
                        const newWidth = startWidth - deltaX;
                        if (newWidth > 50) {
                            element.style.width = newWidth + "px";
                            element.style.left = startLeft + deltaX + "px";
                        }
                    }
                    if (handle.includes("right")) {
                        const newWidth = startWidth + deltaX;
                        if (newWidth > 50) {
                            element.style.width = newWidth + "px";
                        }
                    }
                    if (handle.includes("top")) {
                        const newHeight = startHeight - deltaY;
                        if (newHeight > 50) {
                            element.style.height = newHeight + "px";
                            element.style.top = startTop + deltaY + "px";
                        }
                    }
                    if (handle.includes("bottom")) {
                        const newHeight = startHeight + deltaY;
                        if (newHeight > 50) {
                            element.style.height = newHeight + "px";
                        }
                    }
                }

                function stopResizeHandler() {
                    window.removeEventListener("mousemove", resizeHandler);
                    window.removeEventListener("mouseup", stopResizeHandler);
                }

                window.addEventListener("mousemove", resizeHandler);
                window.addEventListener("mouseup", stopResizeHandler);
            });
            element.appendChild(resizeHandle);
        });
    }
});




