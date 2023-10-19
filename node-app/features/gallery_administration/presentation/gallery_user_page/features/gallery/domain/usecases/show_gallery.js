import { imagesOfCategory } from "../../presentation/components/category_container.js";

export function showGallery(category) {
    // Scroll to the top of the page
    document.body.scrollTop = 0;  // For Safari
    document.documentElement.scrollTop = 0;  // For other browsers

    let categorySelection = document.getElementById('category-selection')
    let categoryGallery = document.getElementById('category-gallery');
    categorySelection.style.display = 'none';
    categoryGallery.style.display = 'block';
    categoryGallery.innerHTML = imagesOfCategory(category);

    const changeButton = document.getElementById('change-category');
    changeButton.addEventListener( 'click', (event) => {
        categoryGallery.style.display = 'none';
        categorySelection.style.display = 'block';
    })
}
