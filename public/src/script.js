const titelPage = async () => {
    const bgPoster = document.getElementById('bgPoster');
    const dots = document.querySelectorAll('#dots span');
    const infoTitle = document.getElementById('infoTitle');
    const listPage = [];

    for (let id = 1; id <= 5; id++) {
        const res = await axios.get(`https://moviesapi.ir/api/v1/movies/${id}`);
        listPage.push(res.data);
    }

    let currentIndex = 0;
    let intervalId;

    const showMovie = (index) => {
        infoTitle.innerHTML = '';

        dots.forEach((d, i) => {
            d.classList.remove("dot-active");
            d.classList.add("dot");
            if (i === index) {
                d.classList.remove("dot");
                d.classList.add("dot-active");
            }
        });

        bgPoster.style.backgroundImage = `url(${listPage[index].images[0]})`;

        const h1 = document.createElement('h1');
        h1.className = 'movie-title';
        h1.innerText = listPage[index].title;

        const parentDiv = document.createElement("div");
        parentDiv.className = "genres-tags";
        listPage[index].genres.forEach(text => {
            const childDiv = document.createElement("div");
            childDiv.className = "genre-tag";
            childDiv.innerText = text;
            parentDiv.appendChild(childDiv);
        });

        const infoDiv = document.createElement("div");
        infoDiv.className = "movie-info";

        const para = document.createElement("p");
        para.innerText = listPage[index].plot;

        const h2 = document.createElement('h2');
        h2.className = 'movie-year';
        h2.innerText = listPage[index].released;

        infoDiv.appendChild(para);

        infoTitle.appendChild(h1);
        infoTitle.appendChild(parentDiv);
        infoTitle.appendChild(infoDiv);
        infoTitle.appendChild(h2);
    };

    showMovie(currentIndex);

    const startAutoSlide = () => {
        intervalId = setInterval(() => {
            currentIndex = (currentIndex + 1) % listPage.length;
            showMovie(currentIndex);
        }, 5000);
    };

    startAutoSlide();

    dots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
            clearInterval(intervalId);
            currentIndex = index;
            showMovie(currentIndex);
            startAutoSlide();
        });
    });
};


const apiMov = async (page = 1) => {
    const list = document.getElementById('list')
    try {
        const req = await axios.get(`https://moviesapi.ir/api/v1/movies?page=${page}`);
        const listPage = req.data.data
        list.innerHTML = "";

        listPage.forEach(poster => {
            const card = document.createElement("div");
            card.className = "movie-card";

            const img = document.createElement("img");
            img.src = poster.poster
            img.alt = "Poster";
            img.className = "movie-img";
            card.appendChild(img);

            const infoDiv = document.createElement("div");
            infoDiv.className = "card-info";
            infoDiv.innerHTML = `
                <h2 class="card-title">${poster.title}</h2>
                <span class="card-genres">${poster.genres.join(" / ")}</span>
            `;
            card.appendChild(infoDiv);

            const bottomDiv = document.createElement("div");
            bottomDiv.className = "card-bottom";

            const rateDiv = document.createElement("div");
            rateDiv.className = "card-rate";
            rateDiv.innerHTML = `
                <img src="img /Icon.svg" alt="star">
                <span>${poster.imdb_rating}</span>
            `;
            bottomDiv.appendChild(rateDiv);

            const btnDiv = document.createElement("div");
            btnDiv.innerHTML = `
                <a href="src/info.html?=${poster.id}" class="btn-info">View Info</a>
            `;
            bottomDiv.appendChild(btnDiv);

            card.appendChild(bottomDiv);

            list.appendChild(card);
        });

    } catch (err) {
        console.error("خطا در گرفتن داده:", err);
    }
};

const totalPages = 25;
let currentPage = 1;
const pagination = document.getElementById("pagination");

function renderPagination() {
    pagination.innerHTML = "";

    const prev = document.createElement("button");
    prev.innerHTML = "&lt;";
    prev.className = `btn-pagination ${currentPage === 1 ? "disabled" : ""}`;
    prev.disabled = currentPage === 1;
    prev.onclick = () => {
        if (currentPage > 1) {
            currentPage--;
            apiMov(currentPage)
            renderPagination();
        }
    };
    pagination.appendChild(prev);

    for (let i = 1; i <= totalPages; i++) {
        if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
            const page = document.createElement("button");
            page.innerText = i;
            page.className = `btn-page ${i === currentPage ? "active" : ""}`;
            page.onclick = () => {
                currentPage = i;
                const list = document.getElementById('list');
                list.innerHTML = '<div class="loading"><img src="img/1488.gif" alt="loading"></div>';
                apiMov(currentPage);
                renderPagination();
            };
            pagination.appendChild(page);
        } else if (i === currentPage - 2 || i === currentPage + 2) {
            const dots = document.createElement("span");
            dots.innerText = "...";
            dots.className = "dots-sep";
            pagination.appendChild(dots);
        }
    }

    const next = document.createElement("button");
    next.innerHTML = "&gt;";
    next.className = `btn-pagination ${currentPage === totalPages ? "disabled" : ""}`;
    next.disabled = currentPage === totalPages;
    next.onclick = () => {
        if (currentPage < totalPages) {
            currentPage++;
            apiMov(currentPage)
            renderPagination();
        }
    };
    pagination.appendChild(next);
}


const searchGet = async (e) => {
    const req = await axios.get(`https://moviesapi.ir/api/v1/movies?q=${e}`);
    const listPage = req.data.data
    const search = document.getElementById('search')
    search.innerHTML = '';
    listPage.forEach(e => {
        const a = document.createElement('a')
        a.className = 'search-item';
        if (window.location.href.includes("src")) {
            a.href = `info.html?=${e.id}`

        } else {
            a.href = `src/info.html?=${e.id}`

        }

        const img = document.createElement('img')
        img.className = 'search-img'
        img.src = e.poster;

        const div = document.createElement('div')

        const li = document.createElement('li')
        li.className = 'search-title'
        li.innerText = e.title

        const span = document.createElement('span');
        span.className = 'search-genres'
        span.innerText = e.genres.join(' / ')

        div.appendChild(li)
        div.appendChild(span)
        a.appendChild(img)
        a.appendChild(div)
        search.appendChild(a)
    });
}

const searchInput = document.getElementById('searchInput')
searchInput.addEventListener('input', (e) => {
    searchGet(e.target.value)
})




const addrespag = document.getElementById("addrespag");

addrespag.addEventListener("click", (e) => {
    e.preventDefault(); 
    const query = searchInput.value.trim();

    if (query) {
        if (window.location.href.includes("src")) {
            window.location.href = `search.html?query=${encodeURIComponent(query)}`
        } else {
            window.location.href = `src/search.html?query=${encodeURIComponent(query)}`;

        }
    } else {
        alert("لطفاً چیزی وارد کنید 🙂");
    }
});



titelPage();
renderPagination();
const list = document.getElementById('list')
list.innerHTML = '<div class="loading"><img src="img /1488.gif" alt="loading"></div>'
apiMov(1)
