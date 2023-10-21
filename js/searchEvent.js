function addClassName() {
    let searchActive = document.querySelector('search')
    let searchInput = document.querySelector('.searchWrap > input')
    let searchButton = document.querySelector('.searchWrap > button')
    searchActive.classList.toggle('active');
    if (searchActive.classList.contains('active')) {
        setTimeout(() => {
            searchInput.style.display = "block"
            searchButton.style.display = "block"
            console.log("성공")
        }, 80);
    } else {
        setTimeout(() => {
            searchInput.style.display = "none"
            searchButton.style.display = "none"
            console.log("성공")
        }, 100);
    }
}


