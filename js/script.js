/* =======================
   Accordion Functionality (with smooth animation)
======================= */
document.querySelectorAll('.accordion-title').forEach(title => {
    title.addEventListener('click', () => {
        const content = title.nextElementSibling;

        if (content.style.maxHeight) {
            // Collapse
            content.style.maxHeight = null;
        } else {
            // Expand
            content.style.maxHeight = content.scrollHeight + "px";
        }
    });
});

/* =======================
   Tabs Functionality (with fade effect)
======================= */
const tabButtons = document.querySelectorAll('.tab-button');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => {
            content.style.display = 'none';
            content.style.opacity = 0;
        });

        button.classList.add('active');
        const content = tabContents[index];
        content.style.display = 'block';
        setTimeout(() => content.style.opacity = 1, 50); // fade in
    });
});

/* =======================
   Lightbox Gallery
======================= */
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const closeLightbox = document.getElementById('closeLightbox');

if (lightbox) {
    document.querySelectorAll('.gallery img').forEach(img => {
        img.addEventListener('click', () => {
            lightbox.style.display = 'flex';
            lightboxImg.src = img.src;
        });
    });

    closeLightbox.addEventListener('click', () => {
        lightbox.style.display = 'none';
    });

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.style.display = 'none';
        }
    });
}

/* =======================
   Search Functionality
======================= */
const searchInput = document.getElementById('searchInput');
const searchResultsContainer = document.getElementById('searchResults');

if (searchInput) {
    searchInput.addEventListener('input', () => {
        const filter = searchInput.value.toLowerCase();
        const items = document.querySelectorAll('.search-item');

        searchResultsContainer.innerHTML = '';

        items.forEach(item => {
            const text = item.textContent.toLowerCase();
            if (text.includes(filter)) {
                searchResultsContainer.appendChild(item.cloneNode(true));
            }
        });
    });
}

/* =======================
   Leaflet Map
======================= */
if (document.getElementById('map')) {
    const map = L.map('map').setView([-26.2041, 28.0473], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);
    L.marker([-26.2041, 28.0473]).addTo(map)
        .bindPopup('Trivest Publishing House')
        .openPopup();
}

/* =======================
   Newsletter Form Validation
======================= */
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    const emailInput = newsletterForm.querySelector('input[type="email"]');

    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = emailInput.value.trim();
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {
            alert('Please enter a valid email address.');
            emailInput.focus();
            return;
        }

        alert(`Thank you for subscribing, ${email}!`);
        newsletterForm.reset();
    });
}

/* =======================
   Contact & Submission Form Validation + AJAX
======================= */
const forms = document.querySelectorAll('.form-container form');
forms.forEach(form => {
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = new FormData(form);
        let valid = true;
        let messages = [];

        // Basic Validation: required fields
        form.querySelectorAll('[required]').forEach(input => {
            if (!input.value.trim()) {
                valid = false;
                messages.push(`${input.previousElementSibling.textContent} is required.`);
            }

            // Email validation
            if (input.type === 'email') {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(input.value.trim())) {
                    valid = false;
                    messages.push('Please enter a valid email address.');
                }
            }
        });

        if (!valid) {
            alert(messages.join('\n'));
            return;
        }

        // Simulate AJAX submission
        setTimeout(() => {
            alert('Your form has been submitted successfully!');
            form.reset();
        }, 500);
    });
});

/* =======================
   Modal Functionality
======================= */
const modalTriggers = document.querySelectorAll('[data-modal-target]');
const modals = document.querySelectorAll('.modal');
const modalCloses = document.querySelectorAll('.modal-close');

modalTriggers.forEach(trigger => {
    const target = document.querySelector(trigger.dataset.modalTarget);
    trigger.addEventListener('click', () => {
        target.style.display = 'flex';
    });
});

modalCloses.forEach(close => {
    close.addEventListener('click', () => {
        close.closest('.modal').style.display = 'none';
    });
});

modals.forEach(modal => {
    modal.addEventListener('click', e => {
        if (e.target === modal) modal.style.display = 'none';
    });
});

/* =======================
   Dynamic Content (Books & News)
======================= */
function loadDynamicContent() {
    const booksContainer = document.getElementById('dynamicBooks');
    const newsContainer = document.getElementById('dynamicNews');

    if (booksContainer) {
        fetch('books.json')
            .then(res => res.json())
            .then(books => {
                booksContainer.innerHTML = '';
                books.forEach(book => {
                    const card = document.createElement('div');
                    card.className = 'book-card';
                    card.innerHTML = `
                        <img src="${book.cover}" alt="${book.title}">
                        <h4>${book.title}</h4>
                        <p><em>${book.author}</em></p>
                        <p>${book.description}</p>
                        <a href="${book.link}" class="btn">Learn More</a>
                    `;
                    booksContainer.appendChild(card);
                });
            });
    }

    if (newsContainer) {
        fetch('news.json')
            .then(res => res.json())
            .then(newsItems => {
                newsContainer.innerHTML = '';
                newsItems.forEach(news => {
                    const card = document.createElement('div');
                    card.className = 'news-card';
                    card.innerHTML = `
                        <h4>${news.title}</h4>
                        <p>${news.date}</p>
                        <p>${news.description || ''}</p>
                    `;
                    newsContainer.appendChild(card);
                });
            });
    }
}

document.addEventListener('DOMContentLoaded', loadDynamicContent);
