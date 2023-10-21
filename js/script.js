// tmdb데이터 변수에 담기
let movveData = []
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMWZhODY1OGNhZTc4NmE4ZDg2YjAzOWRjMjczMGJhZSIsInN1YiI6IjY1MzIzYzNmOGQyMmZjMDEwYjcxY2UwYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ERsC-Mk8MWMzc_0lRgOFwD3wXKoyHrTqeUSGRAbx8bs'
    }
};


let movieList = document.querySelector("#movieList")
let idSearch = document.querySelector("#idSearch")
let listLi = document.querySelector("#listLi")
let result = "";


let printId = (id)=>{
    alert(`영화 id : ${id}`)
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
            // listLi.addEventListener("click",printId())
            
            let appendHtml =
                `<li class="cell" id="listLi" onclick="printId(\'' + ${id} + '\')">
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
        })
    )
    .catch(err => console.error(err));
