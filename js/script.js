
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMWZhODY1OGNhZTc4NmE4ZDg2YjAzOWRjMjczMGJhZSIsInN1YiI6IjY1MzIzYzNmOGQyMmZjMDEwYjcxY2UwYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ERsC-Mk8MWMzc_0lRgOFwD3wXKoyHrTqeUSGRAbx8bs'
    }
};


let movieList = document.querySelector("#movieList")
let idSearch = document.querySelector("#idSearch")
let alertText = document.querySelector('.searchWrap > p')

// Enter키 
let enter = (e) => {
    if(window.event.keyCode == 13) {
        titleSearch()
    }
}


let result = ""; // li의 정보를 담는 변수

// 아이디를 alert으로 출력하는 함수
let printId = (id) => {
    alert(`영화 id : ${id}`)
}
let searchData = []; // 영화 정보를 담은 배열
let searchResult = ""; // 검색한 li의 정보를 담는 변수
// 검색함수
let titleSearch = () => {
    let SearchInput = idSearch.value;
    // 내가 검색한 제목과 리스트의 제목이 일치하는지 확인
    let searchFil = searchData.filter((item) => {
        for (let i = 0; i < searchData.length; i++) {
            for (let k = 0; k < searchData[i].title.length; k++) {
                if (item.title.toLowerCase().startsWith(SearchInput.toLowerCase(), k)) {
                    return item.title
                }
            }
        }
    })
    if (searchFil.length === 0 ) {
        let errText = `${SearchInput}과 일치하는 영화제목이 없습니다. `
        alertText.style.visibility = "visible"
        alertText.innerText = errText;
        return;
    }else if (SearchInput === "") {
        let errText = `제목이 입력되지 않았습니다. `
        alertText.style.visibility = "visible"
        alertText.innerText = errText;
        return;
    } else {
        searchResult = "";
        for (let i = 0; i < searchFil.length; i++) {
            let titleAppend =
                `<li class="cell" onclick="printId(\'' + ${searchFil[i].id} + '\')">
                    <div class="imgBox">
                    <img src="https://image.tmdb.org/t/p/w500${searchFil[i].poster_path}" alt="">
                    </div>
                    <div class="movicInforBox">
                        <span class="movieTitle">${searchFil[i].title}</span>
                        <span class="movieoverview">${searchFil[i].overview}</span>
                        <span class="movievote_average">평점 : ${searchFil[i].vote_average}</span>
                    </div>
                </li>`;

            searchResult += titleAppend;
            movieList.innerHTML = searchResult;
            alertText.innerText = '';
            alertText.style.visibility = "hidden"
        }
    }
}





fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
    .then(response => response.json())
    .then(response =>
        response.results.forEach(item => {
            let id = item.id;
            let title = item.title
            let poster_path = item.poster_path
            let overview = item.overview;
            let vote_average = item.vote_average;

            let appendHtml =
                `<li class="cell" onclick="printId(\'' + ${id} + '\')">
                    <div class="imgBox">
                    <img src="https://image.tmdb.org/t/p/w500${poster_path}" alt="">
                    </div>
                    <div class="movicInforBox">
                        <span class="movieTitle">${title}</span>
                        <span class="movieoverview">${overview}</span>
                        <span class="movievote_average">평점 : ${vote_average}</span>
                    </div>
                </li>`;
            result += appendHtml
            movieList.innerHTML = result

            searchData.push(item)
        })
    )
    .catch(err => console.error(err));



