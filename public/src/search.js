const apiserch = async (e) => {
    const list = document.getElementById('list')
    try {
        const req = await axios.get(`https://moviesapi.ir/api/v1/movies?q=${e}`);
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

 const addresPage = window.location.href 

 const e = addresPage.split('=')[1]
console.log('ffffffffffffff')
 apiserch(e)