import { navbar } from '../features/navbar/presentation/navbar.js';
import { footer } from '../features/footer/presentation/footer.js';

window.onload = function() {
    document.querySelector('#navbar').innerHTML = navbar();
    document.querySelector('#footer').innerHTML = footer();
}