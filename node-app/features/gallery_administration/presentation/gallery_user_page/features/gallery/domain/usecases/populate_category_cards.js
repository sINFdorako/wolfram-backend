import { categoryCard } from '../../presentation/components/category_card.js';
import { Category } from './../entities/category.js';
import { Image } from './../entities/image.js';
import { showGallery } from "../../domain/usecases/show_gallery.js";

const BASE_URL = 'https://backend.fotogalerie-wolfram-wildner.de';
const API_KEY = '3868e53658f4582b80a8056f3fb81f7d59860dd6062e9a678a219f95b2d1b227';

export function populateCategoryCards() {
    return new Promise(async (resolve, reject) => {
        try {
            const categoriesResponse = await fetch(`${BASE_URL}/public/get-all-categories`, {
                headers: {
                    'x-api-key': API_KEY 
                }
            });
            
            if (!categoriesResponse.ok) {
                throw new Error(`HTTP error! status: ${categoriesResponse.status}`);
            }

            const categories = await categoriesResponse.json();

            for (let categoryData of categories) {
                const imagesResponse = await fetch(`${BASE_URL}/public/category-images/${categoryData.id}`, {
                    headers: {
                        'x-api-key': API_KEY 
                    }
                });
                
                if (!imagesResponse.ok) {
                    throw new Error(`HTTP error fetching images! status: ${imagesResponse.status}`);
                }

                const images = await imagesResponse.json();

                const categoryImages = images.map(image => new Image(image.originalFilename, BASE_URL + image.url, image.description || image.originalFilename));
                
                const randomIndex = Math.floor(Math.random() * categoryImages.length);
                const backgroundImage = categoryImages[randomIndex];

                const category = new Category(categoryData.name, categoryData.name.replace(/\s+/g, '-').toLowerCase(), backgroundImage, categoryImages);
                
                let categoryContainer = document.querySelector('#category-selection .row');
                categoryContainer.insertAdjacentHTML('beforeend', categoryCard(category));
                
                const element = document.getElementById(categoryData.name.replace(/\s+/g, '-').toLowerCase());
                element.addEventListener('click', (event) => {
                    event.preventDefault();
                    showGallery(category);
                });
            }

            resolve(); 

        } catch (e) {
            console.error('Error: ' + e);
            reject(e);
        }
    });
}
