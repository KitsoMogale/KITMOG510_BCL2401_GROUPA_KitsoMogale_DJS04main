import { books, authors, genres, BOOKS_PER_PAGE } from './data.js'
import { options,openModal, themeChange, searchedBooks, abstraction } from './functions.js';
import { BookPreview } from './bookPreview.js';
let page = 1;
let matches = books




customElements.define('book-preview',BookPreview);

const bookElement = document.createElement('book-preview');

bookElement.setObject(matches,authors,BOOKS_PER_PAGE,true);
document.querySelector('[data-list-items]').appendChild(bookElement)
// document.body.appendChild(bookElement);
options(genres,'[data-search-genres]','All Genres');

options(authors,'[data-search-authors]','All Authors');


if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.querySelector('[data-settings-theme]').value = 'night'
    document.documentElement.style.setProperty('--color-dark', '255, 255, 255');
    document.documentElement.style.setProperty('--color-light', '10, 10, 20');
} else {
    document.querySelector('[data-settings-theme]').value = 'day'
    document.documentElement.style.setProperty('--color-dark', '10, 10, 20');
    document.documentElement.style.setProperty('--color-light', '255, 255, 255');
}

document.querySelector('[data-list-button]').innerText = `Show more (${books.length - BOOKS_PER_PAGE})`
document.querySelector('[data-list-button]').disabled = (matches.length - (page * BOOKS_PER_PAGE)) > 0

document.querySelector('[data-list-button]').innerHTML = `
    <span>Show more</span>
    <span class="list__remaining"> (${(matches.length - (page * BOOKS_PER_PAGE)) > 0 ? (matches.length - (page * BOOKS_PER_PAGE)) : 0})</span>
`

//array of objects with key as target element to add an eventlistener to 
const targetElements = [

    {'[data-search-cancel]': ['[data-search-overlay]',false]},
    {'[data-settings-cancel]':['[data-settings-overlay]',false]},
    {'[data-header-settings]':['[data-settings-overlay]',true]},
    {'[data-list-close]':['[data-list-active]',false]},
]

 //for loop to call openModal for each object in targetElements
 targetElements.forEach((item)=>{openModal(item)})

document.querySelector('[data-header-search]').addEventListener('click', () => {
    document.querySelector('[data-search-overlay]').open = true
    document.querySelector('[data-search-title]').focus()
})

document.querySelector('[data-settings-form]').addEventListener('submit', (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const { theme } = Object.fromEntries(formData)

    themeChange(theme);
    
    document.querySelector('[data-settings-overlay]').open = false
})

document.querySelector('[data-search-form]').addEventListener('submit', (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const filters = Object.fromEntries(formData)
    const result = []

    searchedBooks(filters,result,books)

    page = 1;
    matches = result
    console.log(result)

    if (result.length < 1) {
        document.querySelector('[data-list-message]').classList.add('list__message_show')
    } else {
        document.querySelector('[data-list-message]').classList.remove('list__message_show')
    }

    document.querySelector('[data-list-items]').innerHTML = ''

    const bookElement2 = document.createElement('book-preview');
// document.createDocumentFragment.appendChild(bookElement2);
bookElement2.setObject(matches,authors,BOOKS_PER_PAGE);

document.querySelector('[data-list-items]').appendChild(bookElement2)
    
    document.querySelector('[data-list-button]').disabled = (matches.length - (page * BOOKS_PER_PAGE)) < 1

    document.querySelector('[data-list-button]').innerHTML = `
        <span>Show more</span>
        <span class="list__remaining"> (${(matches.length - (page * BOOKS_PER_PAGE)) > 0 ? (matches.length - (page * BOOKS_PER_PAGE)) : 0})</span>
    `

    window.scrollTo({top: 0, behavior: 'smooth'});
    document.querySelector('[data-search-overlay]').open = false
})

document.querySelector('[data-list-button]').addEventListener('click', () => {
    const fragment = document.createDocumentFragment()
console.log('vsdjhsbs')
    for (const { author, id, image, title } of matches.slice(page * BOOKS_PER_PAGE, (page + 1) * BOOKS_PER_PAGE)) {
        const element = document.createElement('button')
        element.classList = 'preview'
        element.setAttribute('data-preview', id)
    
        element.innerHTML = `
            <img
                class="preview__image"
                src="${image}"
            />
            
            <div class="preview__info">
                <h3 class="preview__title">${title}</h3>
                <div class="preview__author">${authors[author]}</div>
            </div>
        `

        fragment.appendChild(element)
    }

    document.querySelector('[data-list-items]').appendChild(fragment)
    page += 1
})

document.querySelector('[data-list-items]').addEventListener('click', (event) => {
    const pathArray = Array.from(event.path || event.composedPath())
    let active = null;
    console.log('dvrgbhrntyfytogl')

    active = abstraction(pathArray,active,books)
     
    
    if (active) {
        console.log('dvrgbhrn')
        document.querySelector('[data-list-active]').open = true
        document.querySelector('[data-list-blur]').src = active.image
        document.querySelector('[data-list-image]').src = active.image
        document.querySelector('[data-list-title]').innerText = active.title
        document.querySelector('[data-list-subtitle]').innerText = `${authors[active.author]} (${new Date(active.published).getFullYear()})`
        document.querySelector('[data-list-description]').innerText = active.description
    }
})
