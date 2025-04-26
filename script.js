
// hamburger button
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    
    mobileMenuBtn.addEventListener('click', function() {
        // Create mobile menu
        const mobileMenu = document.createElement('div');
        mobileMenu.className = 'mobile-menu';
        
        // Add appropriate class based on screen width
        if (window.innerWidth <= 995) {
            mobileMenu.classList.add('mobile-view');
        } else {
            mobileMenu.classList.add('desktop-view');
        }
        
        // Function to generate menu content based on screen size
        const generateMenuContent = () => {
            const isMobileView = window.innerWidth <= 992;
            return `
                <div class="mobile-menu-header">
                    <span class="close-menu">&times;</span>
                </div>
                <nav class="mobile-menu-links">
                    <a href="#">Watches</a>
                    <a href="#">Electronic Musical Instruments</a>
                    <a href="#">Calculators</a>
                    <a href="#">Label Printers & Tapes</a>
                    ${isMobileView ? `
                    <a href="#">Support</a>
                    <a href="#">Corporate</a>
                    ` : ''}
                </nav>
            `;
        };
        
        // Set initial content
        mobileMenu.innerHTML = generateMenuContent();
        
        // Style mobile menu links (moved to a function to reuse)
        const styleMenuLinks = () => {
            const mobileLinks = mobileMenu.querySelectorAll('.mobile-menu-links a');
            mobileLinks.forEach(link => {
                link.style.display = 'block';
                link.style.padding = '15px 0';
                link.style.borderBottom = '1px solid #eee';
                link.style.textDecoration = 'none';
                link.style.color = '#333';
            });
            
            // Style close button
            const closeBtn = mobileMenu.querySelector('.close-menu');
            closeBtn.style.fontSize = '24px';
            closeBtn.style.cursor = 'pointer';
            closeBtn.style.float = 'right';
            
            // Add close functionality
            closeBtn.addEventListener('click', function() {
                document.body.removeChild(mobileMenu);
                window.removeEventListener('resize', handleResize);
            });
        };
        
        styleMenuLinks();
        
        document.body.appendChild(mobileMenu);
        
        // Handle window resize while menu is open
        const handleResize = function() {
            // Update width classes
            if (window.innerWidth <= 995) {
                mobileMenu.classList.remove('desktop-view');
                mobileMenu.classList.add('mobile-view');
            } else {
                mobileMenu.classList.remove('mobile-view');
                mobileMenu.classList.add('desktop-view');
            }
            
            // Update menu content based on new screen size
            mobileMenu.innerHTML = generateMenuContent();
            styleMenuLinks(); // Reapply styles to new content
        };
        
        window.addEventListener('resize', handleResize);
    });
});

// -------carousel-------


document.addEventListener('DOMContentLoaded', function() {

    const carouselContainers = document.querySelectorAll('.carousel-container');

    carouselContainers.forEach(function(container) {
    const carousel = container.querySelector('.carousel');
    const slides = container.querySelectorAll('.carousel-slide');
    const prevButton = container.querySelector('.prev');
    const nextButton = container.querySelector('.next');
    const autoSlideDelay = 3000; // 3-second interval
    
    let currentIndex = 1;
    let slideWidth = 100; // Width in percentage
    let autoSlideInterval;
    let isTransitioning = false;
    
    // Set up infinite carousel
    function setupInfiniteCarousel() {
        // Clone first and last slides
        const firstSlideClone = slides[0].cloneNode(true);
        const lastSlideClone = slides[slides.length - 1].cloneNode(true);
        
        // Add clones to carousel
        carousel.appendChild(firstSlideClone);
        carousel.insertBefore(lastSlideClone, slides[0]);
        
        // Set initial position to the first real slide (not the clone)
        updateCarouselPosition(false);
        
        // Set up event listeners
        prevButton.addEventListener('click', prevSlide);
        nextButton.addEventListener('click', nextSlide);
        carousel.addEventListener('transitionend', handleTransitionEnd);
        
        // Start auto-sliding
        startAutoSlide();
        
        // Handle touch events for mobile
        let touchStartX = 0;
        let touchEndX = 0;
        
        carousel.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });
        
        carousel.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });
        
        function handleSwipe() {
            const swipeThreshold = 50;
            if (touchEndX < touchStartX - swipeThreshold) {
                nextSlide(); // Swipe left
            } else if (touchEndX > touchStartX + swipeThreshold) {
                prevSlide(); // Swipe right
            }
        }
    }
    
    // Go to the previous slide
    function prevSlide() {
        if (isTransitioning) return;
        
        clearInterval(autoSlideInterval);
        currentIndex--;
        updateCarouselPosition(true);
        startAutoSlide();
    }
    
    // Go to the next slide
    function nextSlide() {
        if (isTransitioning) return;
        
        clearInterval(autoSlideInterval);
        currentIndex++;
        updateCarouselPosition(true);
        startAutoSlide();
    }
    
    // Handle transition end for infinite scrolling effect
    function handleTransitionEnd() {
        isTransitioning = false;
        
        // If we've reached the clone of the first slide (at the end)
        if (currentIndex === carousel.children.length - 1) {
            currentIndex = 1;
            updateCarouselPosition(false);
        }
        
        // If we've reached the clone of the last slide (at the beginning)
        if (currentIndex === 0) {
            currentIndex = carousel.children.length - 2;
            updateCarouselPosition(false);
        }
    }
    
    // Update the carousel position
    function updateCarouselPosition(withTransition) {
        if (withTransition) {
            isTransitioning = true;
            carousel.style.transition = 'transform 0.8s ease-in-out';
        } else {
            carousel.style.transition = 'none';
        }
        
        carousel.style.transform = `translateX(-${currentIndex * slideWidth}%)`;
    }
    
    // Start automatic sliding
    function startAutoSlide() {
        if (autoSlideInterval) clearInterval(autoSlideInterval);
        autoSlideInterval = setInterval(nextSlide, autoSlideDelay);
    }
    
    // Initialize the carousel
    setupInfiniteCarousel();
});
});

// Alternating Banner images
document.addEventListener('DOMContentLoaded', function() {
    const bannerImages = document.querySelectorAll('.banner-image');
    let currentImageIndex = 0;
    
    function alternateImages() {
        // Remove active class from all images
        bannerImages.forEach(img => img.classList.remove('active'));
        
        // Move to next image
        currentImageIndex = (currentImageIndex + 1) % bannerImages.length;
        
        // Add active class to current image
        bannerImages[currentImageIndex].classList.add('active');
    }
    
    // Start alternating images every 3 seconds
    setInterval(alternateImages, 4000);
});