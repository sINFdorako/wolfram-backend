const linksArray = [
    new Links("OpenAI", "https://www.openai.com/"),
    new Links("Google", "https://www.google.com/"),
    new Links("Bootstrap", "https://getbootstrap.com/")
];

document.querySelector('#app').innerHTML = linksPage(linksArray);