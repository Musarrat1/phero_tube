function loadCategory() {
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
        .then(res => res.json())
        .then((data) => displayCategory(data.categories));
}
loadCategory();
const  showLoader=()=>{
  document.getElementById("loading").classList.remove("hidden");
  document.getElementById("video-container").classList.add("hidden");

}
const  hideLoader=()=>{
  document.getElementById("loading").classList.add("hidden");
  document.getElementById("video-container").classList.remove("hidden");

}
function displayCategory(categories) {
    const categoryContainer = document.getElementById("category-container");
    for (let i of categories) {
        const categoryDiv = document.createElement("div");
        categoryDiv.innerHTML = `
        <div id="btn-${i.category_id}" onclick="loadCategoryVideo('${i.category_id}')" class="btn btn-soft hover:bg-[#FF1F3D] hover:text-white">${i.category}</div>
        `;
        categoryContainer.append(categoryDiv);
    }
}

function loadVideo(searchText = "") {
  showLoader();
 
    fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`)
        .then(response => response.json())
        .then((data) => {
            removeActiveclass();
            document.getElementById("btn-all").classList.add("active");
            displayVideos(data.videos);
        });
}

// ✅ FIXED: Added the keyup listener just once — outside of the function
document.getElementById('search-input').addEventListener("keyup", (e) => {
    const input = e.target.value;
    loadVideo(input);
});

const loadCategoryVideo = (id) => {
  showLoader();
    const url = `https://openapi.programming-hero.com/api/phero-tube/category/${id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => {
            removeActiveclass();
            const clickButton = document.getElementById(`btn-${id}`);
            clickButton.classList.add("active");
            displayVideos(data.category);
        });
};

const loadVideoDetails = (videoId) => {
    const url = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayVideoDetails(data.video));
};

const displayVideoDetails = (video) => {
    document.getElementById("video_details").showModal();
    const detailsContainer = document.getElementById("details-container");
    detailsContainer.innerHTML = `
    <div class="card bg-base-100 image-full shadow-sm">
        <figure><img src="${video.thumbnail}" alt="Shoes" /></figure>
        <div class="card-body">
            <h2 class="card-title">${video.title}</h2>
            <p>${video.authors[0].profile_name} 
            ${video.authors[0].verified ?
            `<img class="w-5 h-5" src="https://img.icons8.com/?size=100&id=98A4yZTt9abw&format=png&color=000000"/>`
            : ""}
            </p>
            <div class="card-actions justify-end">
                <button onclick="location.href='index.html'" class="btn">Close</button>
            </div>
        </div>
    </div>
    `;
};

function removeActiveclass() {
    const activeButtons = document.getElementsByClassName("active");
    for (let btn of activeButtons) {
        btn.classList.remove("active");
    }
}

const displayVideos = (videos) => {
    const videoContainer = document.getElementById("video-container");
    videoContainer.innerHTML = "";
    if (videos.length === 0) {
        videoContainer.innerHTML = `
            <div class="col-span-full flex flex-col text-center justify-center mx-auto items-center py-10">
                <img src="Icon.png" alt="no data" class="w-38 py-5">
                <h2 class="text-xl font-bold">Oops!! Sorry, There is no content here</h2>
            </div>
        `;
            hideLoader();
        return;
    
    }

    videos.forEach((video) => {
        const isVerified = video.authors[0].verified;
        const videoCard = document.createElement("div");
        videoCard.innerHTML = `
        <div class="card bg-base-100">
            <figure class="relative">
                <img class="w-full h-[180px] object-cover" src="${video.thumbnail}" alt="Shoes" />
                <span class="absolute bottom-2 right-2 bg-black text-white px-1.5 py-1 rounded-md text-sm">3hrs 56 min ago</span>
            </figure>
            <div class="flex gap-3 px-0 py-4">
                <div class="avatar">
                    <div class="ring-primary ring-offset-base-100 w-8 h-8 rounded-full">
                        <img src="${video.authors[0].profile_picture}" />
                    </div>
                </div>
                <div class="intro">
                    <h1 class="text-md font-bold">${video.title}</h1>
                    <p class="text-gray-400 flex items-center gap-1">
                        ${video.authors[0].profile_name}
                        ${isVerified ? `<img class="w-5 h-5" src="https://img.icons8.com/?size=100&id=98A4yZTt9abw&format=png&color=000000" />` : ""}
                    </p>
                    <small class="text-gray-400">${video.others.views}</small>
                </div>
            </div>
            <button onclick="loadVideoDetails('${video.video_id}')" class="btn btn-block">Show Details</button>
        </div>
        `;
        videoContainer.append(videoCard);
         hideLoader();
    });
};
