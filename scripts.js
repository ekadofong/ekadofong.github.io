function openTab(tabId) {
    var i, tabcontent;
    tabcontent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";  
    }


    var activeTab = document.getElementById(tabId);
    activeTab.style.display = "block";
    
    // Use a slight delay to ensure the layout updates before scrolling
    setTimeout(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }, 50); // Adjust this delay if needed for better reliability
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
