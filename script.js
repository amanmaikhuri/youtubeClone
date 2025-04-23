// Helper function to select DOM elements
const $ = (selector, err = true) => {
    const el = document.querySelector(selector);
    if (!el && err !== false) {
        console.error(`Missing element: ${selector}`, err);
    }
    return el;
};

// DOM elements
const dom = {
    body: $("body"),
    hideMenu: $("#hide-menu"),
    sidebar: $("#sidebar"),
    showMenu: $("#show-menu"),
    toggle: $(".toggle"),
    videoCard: $(".vedio-container"),
    searchBar: $("#searchbar")
};

let data =[];

// Add event listeners
function addEvents() {
    dom.hideMenu?.addEventListener("click", hideMenuBar);
    dom.showMenu?.addEventListener("click", showMenuBar);
    dom.toggle?.addEventListener("click", switchTheme);
    // dom.searchBar?.addEventListener("input",filterBySearch);
}

// Hide menu bar
function hideMenuBar() {
    try {
        if (dom.sidebar?.classList.contains("visible")) {
            dom.sidebar.classList.replace("visible", "hidden");
        } else {
            dom.sidebar.classList.replace("hidden", "visible");
        }
    } catch (err) {
        console.error("Sidebar isn't loaded", err);
    }
}

// Show menu bar
function showMenuBar() {
    try {
        dom.sidebar.classList.replace("hidden", "visible");
    } catch (err) {
        console.error("Sidebar isn't loaded", err);
    }
}

// Switch between dark and light mode
function switchTheme() {
    switchThemeIcon();
    if (dom.body?.classList.contains("lightmode")) {
        dom.body.classList.replace("lightmode", "darkmode");
    } else {
        dom.body.classList.replace("darkmode", "lightmode");
    }
}

// Switch toggle icon
function switchThemeIcon() {
    if (dom.toggle?.classList.contains("fa-sun")) {
        dom.toggle.classList.replace("fa-sun", "fa-moon");
    } else {
        dom.toggle.classList.replace("fa-moon", "fa-sun");
    }
}

// Fetch video data and render
async function fetchVideos() {
    try {
        const res = await fetch("vedios.json");
        if (!res.ok) throw new Error('Failed to load product data');
        data = await res.json();
        renderVideos(data);
        dom.searchBar?.addEventListener("input", filterBySearch(data));
    } catch (err) {
        console.error("Failed to fetch videos", err);
    }
}

// Render video cards
function renderVideos(videos) {
    try{
        dom.videoCard.innerHTML = "";

    videos.forEach((video) => {
        const videoContent = document.createElement("div");
        videoContent.classList.add("vedio-content");

        videoContent.innerHTML = `
            <div class="img-container">
                <img src="${video.thumbnail}" alt="${video.title}" loading="lazy">
            </div>
            <div class="creator-container">
                <div class="creator-content">
                    <i class="fa-solid fa-user" aria-hidden="true"></i>
                    <h2>${video.title}</h2>
                </div>
                <div class="creator-details">
                    <p class="creator">${video.creator} <i class="fa-solid fa-music"></i></p>
                    <p class="views">${video.views}</p>
                    <p class="upload-time">${video["time-uploaded"]}</p>
                </div>
            </div>
        `;
        dom.videoCard.appendChild(videoContent);
    });
    } catch(err){
        console.error("Unable rendering vedios ???? try again",err)
    }
}

//search functionality
function filterBySearch(videos) {
    return function (e) {
        const searchText = e.target.value.toLowerCase();

        const filteredVideos = videos.filter((video) =>
            video.title.toLowerCase().includes(searchText)
        );

        renderVideos(filteredVideos);
    };
}


// App initialization
function init() {
    dom.sidebar.classList.add("hidden");
    dom.toggle.classList.add("fa-sun");
    addEvents();
    fetchVideos(); // This will now call renderVideos() with data
}

document.addEventListener("DOMContentLoaded", init);
