
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMWZhODY1OGNhZTc4NmE4ZDg2YjAzOWRjMjczMGJhZSIsInN1YiI6IjY1MzIzYzNmOGQyMmZjMDEwYjcxY2UwYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ERsC-Mk8MWMzc_0lRgOFwD3wXKoyHrTqeUSGRAbx8bs'
    }
};


let movieList = document.querySelector("#movieList")
let idSearch = document.querySelector("#idSearch")

let result = ""; // li의 정보를 담는 변수

// 아이디를 alert으로 출력하는 함수
let printId = (id) => {
    alert(`영화 id : ${id}`)
}
let searchData = []; // title의 정보를 담은 배열
let searchResult = ""; // 검색한 li의 정보를 담는 변수
// 검색함수


let titleSearch = () => {
    let SearchInput = idSearch.value;
    console.log(SearchInput)
    // 내가 검색한 제목과 리스트의 제목이 일치하는지 확인
    let searchFil = searchData.filter((item) => {
        for (let i = 0; i < searchData.length; i++) {
            for (let k = 0; k < searchData[i].title.length; k++) {
                if (item.title.startsWith(SearchInput, k)) {
                    return item.title
                }
            }
        }

    })

    // console.log(searchFil[0].title.indexOf("S", 4))
    if (searchFil.length === 0 || SearchInput === "") {
        alert("영화제목이 올바르지 않습니다. ");
        location.reload();
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

        }

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



