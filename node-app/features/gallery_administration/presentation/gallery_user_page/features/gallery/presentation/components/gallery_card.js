export function galleryCard(image) {
    return `
        <div class="gallery-img col-lg-4 col-md-4 col-sm-12 mb-4 mt-4">
            <div class="image-container">
                <a href="${image.src}" data-lightbox="gallery" data-title="${image.alt}">
                    <img id="${image.name}" loading="lazy" src="${image.src}" alt="${image.alt}" class="img-fluid gallery-img">
                </a>
                <!-- <p id="image-description">${image.name}</p> -->
            </div>
        </div>
    `;
}
