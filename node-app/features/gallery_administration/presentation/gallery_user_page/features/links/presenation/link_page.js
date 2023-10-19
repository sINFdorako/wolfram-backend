export function linksPage(linksArray) {
    let pageContent = `
        <section id="links-section" class="mt-5">
        <div class="container">
            <h3 class="text-center mb-5">Nützliche Links</h3>
            <div class="row justify-content-center">
    `;

    for (let linkObj of linksArray) {
        pageContent += `
            <div class="col-md-6 mb-4">
                <div class="link-card card">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-8">
                                <h5 class="card-title">${linkObj.name}</h5>
                                <p class="card-text">${linkObj.description}</p>
                            </div>
                            <div class="col-md-4 text-right">
                                <a target="_blank" href="${linkObj.link}" class="btn custom-btn">Besuchen</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    pageContent += `
            </div>
        </div>
        </section>
    `;

    return pageContent;
}
