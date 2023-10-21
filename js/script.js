
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMWZhODY1OGNhZTc4NmE4ZDg2YjAzOWRjMjczMGJhZSIsInN1YiI6IjY1MzIzYzNmOGQyMmZjMDEwYjcxY2UwYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ERsC-Mk8MWMzc_0lRgOFwD3wXKoyHrTqeUSGRAbx8bs'
    }
};


let movieList = document.querySelector("#movieList")
let idSearch = document.querySelector("#idSearch")
let searchBtn = document.querySelector("#searchBtn")

let result = ""; // li의 정보를 담는 변수

// 아이디를 alert으로 출력하는 함수
let printId = (id) => {
    alert(`영화 id : ${id}`)
}
let searchData = []; // title의 정보를 담은 배열
// 검색함수
let titleSearch = () => {
    let SearchInput = idSearch.value;
    // 내가 검색한 제목과 리스트의 제목이 일치하는지 확인아여 
    // 일치하는 배열의 객체를 가져온다
    let searchFil = searchData.filter((item) => {
        return item.title === SearchInput
    })
    if (searchFil[0].title === SearchInput) {
        console.log(searchFil[0].title)
        let titleAppend =
            `<li class="cell" id="${searchFil[0].title}" onclick="printId(\'' + ${searchFil[0].id} + '\')">
                    <div class="imgBox">
                    <img src="https://image.tmdb.org/t/p/w500${searchFil[0].poster_path}" alt="">
                    </div>
                    <div class="movicInforBox">
                        <span class="movieTitle">${searchFil[0].title}</span>
                        <span class="movieoverview">${searchFil[0].overview}</span>
                        <span class="movievote_average">평점 : ${searchFil[0].vote_average}</span>
                    </div>
                </li>`;
        movieList.innerHTML = titleAppend;
    } else {
        alert("영화제목이 올바르지 않습니다. ");
        return;
    }


}


console.log(searchData)
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



