function openTab(tabId) {
    var i, tabcontent;
    tabcontent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";  
    }
    var activeTab = document.getElementById(tabId);
    activeTab.style.display = "block";
    
    // Force layout reflow and ensure the container and document scroll to the top
    setTimeout(function() {
        window.scrollTo(0, 300); // Scroll to the top of the document
    }, 0); // No delay
}


document.addEventListener("DOMContentLoaded", function() {
    // Show the first tab by default
    openTab("gallery");

    // Add event listeners for gallery thumbnails
    var thumbnails = document.querySelectorAll('.thumbnail');
    thumbnails.forEach(function(thumbnail) {
        thumbnail.addEventListener('click', function() {
            var mediaType = this.getAttribute('data-type');
            var mediaSrc = this.getAttribute('data-src');
            openMediaPlayer(mediaType, mediaSrc);
        });
    });
});

function openMediaPlayer(type, src) {
    var mediaPlayer = document.createElement('div');
    mediaPlayer.className = 'media-player';

    var mediaContent;
    if (type === 'video') {
        mediaContent = `<iframe width="100%" height="100%" src="${src}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
    } else {
        mediaContent = `<img src="${src}" alt="Media">`;
    }

    mediaPlayer.innerHTML = `
        <div class="media-player-overlay"></div>
        <div class="media-player-content">
            <span class="close-button">&times;</span>
            ${mediaContent}
        </div>
    `;
    document.body.appendChild(mediaPlayer);

    document.querySelector('.close-button').addEventListener('click', function() {
        document.body.removeChild(mediaPlayer);
    });

    document.querySelector('.media-player-overlay').addEventListener('click', function() {
        document.body.removeChild(mediaPlayer);
    });
}

window.addEventListener('scroll', function() {
    let scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
    let currentScroll = window.scrollY;

    // Prevent scrolling above the sidebar's bottom
    if (currentScroll < 300) { // 200 should be adjusted based on actual header and sidebar height
        window.scrollTo(0, 300);
    }
});

/* SORT PAPERS */
function clearPapers() {
    const papers = document.querySelectorAll('.paper-link');
    papers.forEach(paper => {
        paper.classList.add('hidden');
    });
}

function _filterPapers(year, topic, author) {
    const papers = document.querySelectorAll('.paper-link');
    papers.forEach(paper => {
        const paperYear = paper.getAttribute('data-year');
        const paperTopics = paper.getAttribute('data-topics').split(',');
        const paperAuthor = paper.getAttribute('data-firstauthor');

        // Check if the paper matches the current filters
        const matchesYear = (year === 'all') || (paperYear === year);
        const matchesTopic = (topic === 'all') || (paperTopics.includes(topic));
        const matchesAuthor = (author === 'all') || (paperAuthor === author);


        if (matchesYear && matchesTopic && matchesAuthor) {           
            paper.classList.remove('hidden');
        } else {
            paper.classList.add('hidden');
        }


    });
}


function filterPapers(year,topic,author) {
    clearPapers();
    setTimeout(() => {
        _filterPapers(year,topic,author);
    }, 150);
}
