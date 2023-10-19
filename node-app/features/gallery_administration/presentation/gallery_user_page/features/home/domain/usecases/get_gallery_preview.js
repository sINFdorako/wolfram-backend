import { Image } from '../../../gallery/domain/entities/image.js';
import { galleryCard } from '../../../gallery/presentation/components/gallery_card.js';

const BASE_URL = 'http://local.backend.fotogalerie-wolfram-wildner.de';
const API_KEY = 'f2971e0da2354f6a403852f9d3741d2cc7ae2cc9a1d512f676e63968bf2c9758';

export function getGalleryPreview() {
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
            let allImages = [];

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
                allImages.push(...images.map(image => new Image(image.originalFilename, BASE_URL + image.url, image.description || image.originalFilename)));
            }

            let imagePreviews = [];
            let randomImagesContainer = document.querySelector('#gallery-preview .row');
            
            while (imagePreviews.length < 6) {
                let randomIndex = Math.floor(Math.random() * allImages.length);
                let selectedImage = allImages[randomIndex];
                if (!imagePreviews.includes(selectedImage)) {
                    randomImagesContainer.innerHTML += galleryCard(selectedImage);
                    imagePreviews.push(selectedImage);
                }
            }

            resolve();

        } catch (e) {
            console.error('Error: ' + e);
            reject(e);
        }
    });
}


