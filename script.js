document.addEventListener('DOMContentLoaded', () => {
    const openBtn = document.getElementById('open-btn');
    const coverSection = document.getElementById('cover');
    const inviteSection = document.getElementById('invite');
    const bgMusic = document.getElementById('bg-music');

    // Attempt automatic playback
    const playMusic = () => {
        bgMusic.play().then(() => {
            // If successful, we can remove the global click listener
            document.removeEventListener('click', playMusic);
        }).catch(e => {
            console.log('Autoplay blocked. Will attempt on interaction.', e);
        });
    };

    // Try immediately
    playMusic();

    // Also listen for any click on the document to start it
    document.addEventListener('click', playMusic);

    const petalsContainer = document.getElementById('petals-container');

    function createPetal() {
        const petal = document.createElement('div');
        petal.classList.add('petal');
        
        // Randomize petal properties
        const size = Math.random() * 20 + 10;
        petal.style.width = `${size}px`;
        petal.style.height = `${size}px`;
        petal.style.left = `${Math.random() * 100}vw`;
        
        // Use traditional Bengali wedding flower colors (yellow, orange, reddish-pink)
        const colors = ['#f44336', '#ff9800', '#ffeb3b', '#e91e63'];
        petal.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        
        // Randomize animation timing
        const duration = Math.random() * 3 + 2;
        petal.style.animationDuration = `${duration}s`;
        
        petalsContainer.appendChild(petal);
        
        // Clean up petal after animation
        setTimeout(() => {
            petal.remove();
        }, duration * 1000);
    }

    openBtn.addEventListener('click', () => {
        // Start background music
        bgMusic.play().catch(e => console.log('Audio playback prevented:', e));


        // Start Petals
        setInterval(createPetal, 300);

        // Slide up the entire cover
        coverSection.classList.add('slide-up');
        
        // Remove hidden class from invite for DOM layout
        inviteSection.classList.remove('hidden');
        
        // Fade in invitation content
        setTimeout(() => {
            inviteSection.classList.add('visible');
            window.scrollTo(0, 0);
            startSlideshow(); // Auto-start the slideshow
        }, 500); 
        
        // Remove cover from flow after animation completes
        setTimeout(() => {
            coverSection.style.display = 'none';
        }, 1200);
    });

    // Slideshow functionality
    const prevBtn = document.getElementById('prev-slide');
    const nextBtn = document.getElementById('next-slide');
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    
    let currentSlide = 0;
    let slideInterval;

    function startSlideshow() {
        if(slideInterval) clearInterval(slideInterval);
        slideInterval = setInterval(() => {
            showSlide(currentSlide + 1);
        }, 4500); // 4.5 seconds per slide
    }

    function showSlide(index) {
        if (index < 0) {
            currentSlide = 0;
        } else if (index >= slides.length) {
            currentSlide = slides.length - 1;
            if (slideInterval) clearInterval(slideInterval); // Stop when reaching the end
        } else {
            currentSlide = index;
        }

        slides.forEach((slide, i) => {
            slide.classList.remove('active', 'past', 'future');
            if (dots[i]) dots[i].classList.remove('active');
            
            if (i === currentSlide) {
                slide.classList.add('active');
                if (dots[i]) dots[i].classList.add('active');
            } else if (i < currentSlide) {
                slide.classList.add('past');
            } else {
                slide.classList.add('future');
            }
        });
    }

    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            showSlide(currentSlide - 1);
            startSlideshow(); // Reset timer on manual click
        });
        nextBtn.addEventListener('click', () => {
            showSlide(currentSlide + 1);
            startSlideshow(); // Reset timer on manual click
        });
        
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                showSlide(index);
                startSlideshow(); // Reset timer on manual click
            });
        });
    }
});
