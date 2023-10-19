import { galleryCard } from "./gallery_card.js";

export function imagesOfCategory(category) {

    let images = Object.values(category.categoryImages).map((image) => galleryCard(image));

    return `
    <br />
    <!-- Category Change Button -->
    <div class="text-center mt-5">
      <button id="change-category" class="btn custom-btn"
          style="margin: 0 auto; padding: 15px 30px; font-size: 18px; text-transform: uppercase;">Rubrik
          ändern</button>
    </div>
    <!-- Category Container -->
    <section id="${category.path}" class="py-5 gallery">
      <div class="container">
          <h2 class="text-center mb-5">${category.name}</h2>
          <div class="row">
              ${images.join('')}
          </div>
      </div>
    </section>
    <br />
  `;
}
