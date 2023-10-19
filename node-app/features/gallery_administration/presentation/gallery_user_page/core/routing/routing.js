import { calendarPage } from '../../features/calendar/presentation/calendar.js';
import { loadingAnimation } from '../../features/gallery/domain/usecases/load_image_animation.js';
import { populateCategoryCards } from '../../features/gallery/domain/usecases/populate_category_cards.js';
import { galeryPage } from '../../features/gallery/presentation/galerie.js';
import { getGalleryPreview } from '../../features/home/domain/usecases/get_gallery_preview.js';
import { homePage } from '../../features/home/presentation/home.js';
import { linksPage } from '../../features/links/presenation/link_page.js';
import {Links} from '../../features/links/domain/entities/links.js';
import { pictureStoryPage } from '../../features/picture_story/presentation/picture_story_page.js';
import { aboutPage } from '../../features/about/presentation/about.js';

addEventListener("DOMContentLoaded", (event) => {
    console.log(window.location.pathname);
    loadPage(window.location.pathname);
});

async function loadPage(path) {
    switch (path) {
        case '/':
        case '/index.html':
            // Load index (home) page...
            document.querySelector('#app').innerHTML = homePage();
            await getGalleryPreview()
            break;
        case '/galerie':
            // Load galerie page...
            document.querySelector('#app').innerHTML = galeryPage();
            await populateCategoryCards();
            break;
        case '/kalender':
            // Load calendar page...
            document.querySelector('#app').innerHTML = calendarPage();
            break;
        case '/links':
            // Load links page...
            const linksArray = [
                new Links("Fotoclub Erding", "https://www.fotoclub-erding.de", "www.fotoclub-erding.de"),
                new Links("Fotoklicke Dorfen", "http://fotoklicke-dorfen.de/", "​www.fotoklickedorfen.de"),
                new Links("Gesellige Vereinigung bildender Künstler Münchens e.V.", "https://​www.gesellige-kuenstler-muenchen.de", "​www.gesellige-kuenstler-muenchen.de"),
                new Links("Fotografie und digitale Malerei von Dagmar Laimgruber", "https://www.dls-kunst.de/", "www.dls-kunst.de")
            ];
            
            document.querySelector('#app').innerHTML = linksPage(linksArray);
            break;
        case '/ein-bild-und-seine-geschichte':
            document.querySelector('#app').innerHTML = pictureStoryPage();
            break;
        case '/ueber-mich':
            document.querySelector('#app').innerHTML = aboutPage();
            break;
        default:
            // If no match is found, load the 404 page or homepage...
            document.querySelector('#app').innerHTML = homePage();
            break;
        // ...and so on...
    }
}


// click event listener to all links in app
document.body.addEventListener('click', function (event) {
    if (event.target.tagName === 'A') {
        let href = event.target.getAttribute('href');
        
        // Check if the link is internal (starts with "/")
        if (href.startsWith('/')) {
            event.preventDefault();
            history.pushState(null, null, href);
            loadPage(href);
        }
        // If it's external, just allow the default behavior
    }
});

// Listen for back/forward navigation
window.addEventListener('popstate', function (event) {
    loadPage(window.location.pathname);
});


