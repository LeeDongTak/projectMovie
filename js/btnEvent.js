
let searchActive = document.querySelector('search')
let sortBox = document.querySelector('.sortBox')
let sortBtn = document.querySelector('.sortBtn')
let htmlBody = document.querySelector('.htmlBody')
let sortList = document.querySelectorAll('.sortBox > ul > li')


// search버튼 이벤트
function addClassName() {
    searchActive.classList.toggle('active');
}

//정렬박스 이벤트
function sortToggle() {
    sortBox.classList.toggle('active');
    if (sortBox.classList.contains('active')) {
        htmlBody.style.display = "block"
    } else if (sortBox.classList.contains('active') === false) {
        htmlBody.style.display = "none"
    }
}

function sortBodyClick() {
    sortBox.classList.remove('active')
    htmlBody.style.display = "none"
}



let sortTitleChe = (value) => {
    sortList.forEach((item) => {
        if (item.classList.contains(value)) {
            let icon = ` <i class="fa-solid fa-angle-down"></i>` // 아래화살표 아이콘
            sortBtn.innerHTML = item.innerText + icon
        }
    })
    sortEvent(value);
}

sortData = ''
let sortEvent = (value) => {
    // searchData.forEach(item => {
    //     searchDataSort += item
    // });
    let listClass = '';
    sortList.forEach((item, index) => {
        if (item.classList.contains(value)) {
            listClass += item.classList.contains(value)
        }
    })

    let resultSort = '';
    // 정렬 : 가나다 순
    if (value === 1) {
        // 영화데이터 정렬
        resultSort = searchData.sort((a, b) => {
            if (a.title < b.title) {
                return -1
            } else if (a.title > b.title) {
                return 1
            } else {
                return 0
            }
        })
    }
    // 정렬 : 높은 평점순
    if (value === 2) {
        // 영화데이터 정렬
        resultSort = searchData.sort((a, b) => {
            if (a.vote_average > b.vote_average) {
                return -1
            } else if (a.vote_average < b.vote_average) {
                return 1
            } else {
                return 0
            }
        })
    }
    // 정렬 : 낮은 평점 순
    if (value === 4) {
        // 영화데이터 정렬
        resultSort = searchData.sort((a, b) => {
            if (a.release_date > b.release_date) {
                return -1
            } else if (a.release_date < b.release_date) {
                return 1
            } else {
                return 0
            }
        })
    }
    if (value === 5) {
        // 영화데이터 정렬
        resultSort = searchData.sort((a, b) => {
            if (a.release_date <b.release_date) {
                return -1
            } else if (a.release_date > b.release_date) {
                return 1
            } else {
                return 0
            }
        })
    }
    // 정렬한 데이터를 html에 리스트로 뿌려주기
    let sortResult = '';
    for (let i = 0; i < resultSort.length; i++) {
        let titleAppend =
            `<li class="cell" onclick="printId(\'' + ${resultSort[i].id} + '\')">
                    <div class="imgBox">
                    <img src="https://image.tmdb.org/t/p/w500${resultSort[i].poster_path}" alt="">
                    </div>
                    <div class="movicInforBox">
                        <span class="movieTitle">${resultSort[i].title}</span>
                        <span class="movieoverview">${resultSort[i].overview}</span>
                        <span class="movievote_average">평점 : ${resultSort[i].vote_average}</span>
                    </div>
                </li>`;

        sortResult += titleAppend;
        movieList.innerHTML = sortResult;
    }

    console.log(resultSort);

}



