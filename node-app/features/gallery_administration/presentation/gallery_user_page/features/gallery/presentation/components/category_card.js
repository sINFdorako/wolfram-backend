export function categoryCard(category) {
    return `
        <div class="category-card col-lg-3 col-md-4 col-sm-6 mb-4">
            <div id="${category.path}"
                class="text-decoration-none text-dark">
                <div class="card">
                    <img
                        src="${category.backgroundImage.src}"
                        alt="${category.backgroundImage.alt}"
                        class="card-img-top img-fluid gallery-img">
                    <div class="card-body">
                        <h5 class="my-card-title text-center">${category.name}</h5>
                    </div>
                </div>
            </div>
        </div>
    `;
};




