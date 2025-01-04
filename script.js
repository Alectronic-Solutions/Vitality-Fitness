// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth'
      });
    }
  });
});

// Scroll to top when navigation logo is clicked
const navLogo = document.querySelector('.logo');
if (navLogo) {
  navLogo.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// Scroll to top when footer logo is clicked
const footerLogo = document.querySelector('.footer-bottom .logo');
if (footerLogo) {
  footerLogo.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// Modal functionality
const modalBtns = document.querySelectorAll('.learn-more-btn, .read-more-btn, .add-to-cart-btn');
const modals = document.querySelectorAll('.modal');
const closeSpans = document.querySelectorAll('.close');
const contactBtns = document.querySelectorAll('.contact-btn');

if (modalBtns.length > 0) {
  modalBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const modalId = btn.getAttribute('data-modal');
      const modal = document.getElementById(modalId);
      if (modal) {
        modal.style.display = 'flex'; // Use flex to center the modal
      }
    });
  });
}

if (closeSpans.length > 0) {
  closeSpans.forEach(close => {
    close.addEventListener('click', function() {
      this.parentElement.parentElement.style.display = 'none';
    });
  });
}

// Close modal when clicking outside
window.addEventListener('click', function(event) {
  if (event.target.classList.contains('modal')) {
    event.target.style.display = 'none';
  }
});

// Contact button to close modal and scroll to footer
if (contactBtns.length > 0) {
  contactBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      // Close the modal
      const modal = this.closest('.modal');
      if (modal) {
        modal.style.display = 'none';
      }

      // Scroll to the footer
      const footer = document.getElementById('footer');
      if (footer) {
        footer.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

// Order Form Functionality
const addToCartBtns = document.querySelectorAll('.add-to-cart-btn');
const orderFormModal = document.getElementById('order-form-modal');
const orderForm = document.getElementById('order-form');
const productIdInput = document.getElementById('product-id');

if (addToCartBtns.length > 0 && orderFormModal && orderForm && productIdInput) {
  // Open order form modal when "Add to Cart" is clicked
  addToCartBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const productId = btn.getAttribute('data-product');
      productIdInput.value = productId;
      orderFormModal.style.display = 'flex'; // Use flex to center the modal
    });
  });

  // Quantity Selector Functionality
  const quantityInput = document.getElementById('quantity');
  const quantityBtns = document.querySelectorAll('.quantity-btn');

  if (quantityInput && quantityBtns.length > 0) {
    quantityBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        const action = this.getAttribute('data-action');
        if (action === 'increase') {
          quantityInput.value = parseInt(quantityInput.value) + 1;
        } else if (action === 'decrease' && quantityInput.value > 1) {
          quantityInput.value = parseInt(quantityInput.value) - 1;
        }
      });
    });
  }

  // Handle order form submission
  orderForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const formData = new FormData(orderForm);
    const orderDetails = {
      productId: formData.get('product-id'),
      name: formData.get('name'),
      email: formData.get('email'),
      quantity: formData.get('quantity'),
      address: formData.get('address')
    };

    // Here you can send the orderDetails to your backend or handle it as needed
    console.log('Order Details:', orderDetails);

    // Show a success message
    alert(`Thank you, ${orderDetails.name}! Your order for ${orderDetails.quantity} x ${orderDetails.productId} has been placed.`);

    // Close the modal
    orderFormModal.style.display = 'none';

    // Reset the form
    orderForm.reset();
  });
}

// Reviews Carousel
const reviews = document.querySelectorAll('.review-card');
if (reviews.length > 0) {
  let currentReview = 0;

  function showReview(index) {
    reviews.forEach((review, i) => {
      review.classList.remove('active');
      if (i === index) {
        review.classList.add('active');
      }
    });
  }

  function nextReview() {
    currentReview = (currentReview + 1) % reviews.length;
    showReview(currentReview);
  }

  // Automatically cycle reviews every 7 seconds
  setInterval(nextReview, 7000);

  // Show the first review initially
  showReview(currentReview);
}

// Hero Section Video Rotation
const videos = document.querySelectorAll('.hero-video');

if (videos.length > 0) { // Only run if videos exist on the page
  let currentVideoIndex = 0;

  function rotateVideos() {
    // Fade out the current video
    videos[currentVideoIndex].classList.remove('active');

    // Move to the next video
    currentVideoIndex = (currentVideoIndex + 1) % videos.length;

    // Fade in the next video
    videos[currentVideoIndex].classList.add('active');
  }

  // Rotate videos every 7 seconds
  setInterval(rotateVideos, 7000);
}

// Hamburger Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
  });
}

// Close mobile menu when a link is clicked
const navLinksList = document.querySelectorAll('.nav-links a');

if (navLinksList.length > 0) {
  navLinksList.forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      hamburger.classList.remove('active');
    });
  });
}

// Back to Top Button
const backToTopButton = document.getElementById('back-to-top');

if (backToTopButton) {
  // Show or hide the button based on scroll position
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backToTopButton.style.display = 'block';
    } else {
      backToTopButton.style.display = 'none';
    }
  });

  // Scroll to top when the button is clicked
  backToTopButton.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// Dark Mode Toggle
const darkModeToggle = document.getElementById('dark-mode-toggle');
const body = document.body;

if (darkModeToggle) {
  // Check for saved dark mode preference in localStorage
  const isDarkMode = localStorage.getItem('darkMode') === 'enabled';

  // Apply dark mode if previously enabled
  if (isDarkMode) {
    body.classList.add('dark-mode');
    darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>'; // Moon icon for dark mode
  }

  // Toggle dark mode on button click
  darkModeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');

    // Save dark mode preference to localStorage
    if (body.classList.contains('dark-mode')) {
      localStorage.setItem('darkMode', 'enabled');
      darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>'; // Moon icon for dark mode
    } else {
      localStorage.setItem('darkMode', 'disabled');
      darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>'; // Sun icon for light mode
    }
  });
}