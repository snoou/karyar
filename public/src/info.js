const infoPage = async (id) => {
    try {
        const req = await axios.get(`https://moviesapi.ir/api/v1/movies/${id}`);
        const movie = req.data;
        console.log(movie);

        document.querySelector(".info-title-page .title").textContent = movie.title;

        document.querySelector(".title-page span").textContent = movie.year + ' . ' + movie.rated + ' . ' + movie.runtime
        document.querySelector(".title-page div span").textContent = movie.imdb_rating;

        document.querySelector(".poster-img-info").src = movie.poster;

        const genreBox = document.querySelector(".genre-info:nth-of-type(1) div");
        genreBox.innerHTML = "";
        movie.genres.forEach(g => {
            const span = document.createElement("span");
            span.textContent = g;
            genreBox.appendChild(span);
        });

        document.querySelector(".genre-info:nth-of-type(2) div span").textContent = movie.plot;

        document.querySelector(".genre-info:nth-of-type(3) div span").textContent = movie.director;

        const writersBox = document.querySelector(".genre-info:nth-of-type(4) div");
        writersBox.innerHTML = "";
        movie.writer.split(",").forEach(w => {
            const span = document.createElement("span");
            span.textContent = w.trim();
            writersBox.appendChild(span);
        });

        const starsBox = document.querySelector(".genre-info:nth-of-type(5) div");
        starsBox.innerHTML = "";
        movie.actors.split(",").forEach(a => {
            const span = document.createElement("span");
            span.textContent = a.trim();
            starsBox.appendChild(span);
        });

        const imagesBox = document.querySelector(".group-img-info");
        imagesBox.innerHTML = "";
        movie.images.forEach(img => {
            const image = document.createElement("img");
            image.src = img;
            imagesBox.appendChild(image);
        });

    } catch (error) {
        console.log("error:", error);
    }
};
document.addEventListener("DOMContentLoaded", async () => {
    const addres = window.location.href;
    const id = addres.split("=")[1];

    await infoPage(id);

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

});
