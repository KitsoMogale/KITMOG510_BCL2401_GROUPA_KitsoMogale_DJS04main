


//function to display the books
// export const displayBooks = (listOfBooks)=>{

//     const starting = document.createDocumentFragment()

// for (const { author, id, image, title } of listOfBooks.slice(0, BOOKS_PER_PAGE)) {
//     const element = document.createElement('button')
//     element.classList = 'preview'
//     element.setAttribute('data-preview', id)

//     element.innerHTML = `
//         <img
//             class="preview__image"
//             src="${image}"
//         />
        
//         <div class="preview__info">
//             <h3 class="preview__title">${title}</h3>
//             <div class="preview__author">${authors[author]}</div>
//         </div>
//     `

//     starting.appendChild(element)
// }

// document.querySelector('[data-list-items]').appendChild(starting)
// }


//function to create options 
export const options = (list,target,innerText) => {
    const genreHtml = document.createDocumentFragment()
    const firstGenreElement = document.createElement('option')
    firstGenreElement.value = 'any'
    firstGenreElement.innerText = innerText
    genreHtml.appendChild(firstGenreElement)
    
    for (const [id, name] of Object.entries(list)) {
        const element = document.createElement('option')
        element.value = id
        element.innerText = name
        genreHtml.appendChild(element)
    }
    
    document.querySelector(target).appendChild(genreHtml)
    }


 //function to open or close modal when eventlistener for 'click' is triggered 
export const openModal = (target)=>{
   let key = Object.keys(target)
   let value = Object.values(target)

   document.querySelector(key[0]).addEventListener('click',()=>{
         document.querySelector(value[0][0]).open = value[0][1]
       //    console.log(value[0][0])
           }
       )
}



export const themeChange = (theme) =>{
    if (theme === 'night') {
        document.documentElement.style.setProperty('--color-dark', '255, 255, 255');
        document.documentElement.style.setProperty('--color-light', '10, 10, 20');
        
    } else {
        document.documentElement.style.setProperty('--color-dark', '10, 10, 20');
        document.documentElement.style.setProperty('--color-light', '255, 255, 255');
    }

}

export const searchedBooks = (filters,result,books) =>{
    for (const book of books) {
        let genreMatch = filters.genre === 'any'

        for (const singleGenre of book.genres) {
            if (genreMatch) break;
            if (singleGenre === filters.genre) { genreMatch = true }
        }

        if (
            (filters.title.trim() === '' || book.title.toLowerCase().includes(filters.title.toLowerCase())) && 
            (filters.author === 'any' || book.author === filters.author) && 
            genreMatch
        ) {
            result.push(book)
        }
    }

}


export  const abstraction = (patharray,active,books)=>{
           for (const node of patharray) {
               if (active) break

                  if (node?.dataset?.preview) {
                 let result = null
    
                for (const singleBook of books) {
                if (result) break;
                if (singleBook.id === node?.dataset?.preview) result = singleBook
                  } 
          
            active = result;
            console.log(result);
            console.log(active);

               }
           }
             return active;
        }
