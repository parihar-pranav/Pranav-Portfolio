/**
* Template Name: iPortfolio
* Template URL: https://bootstrapmade.com/iportfolio-bootstrap-portfolio-websites-template/
* Updated: Jun 29 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Header toggle
   */
  const headerToggleBtn = document.querySelector('.header-toggle');

  function headerToggle() {
    document.querySelector('#header').classList.toggle('header-show');
    headerToggleBtn.classList.toggle('bi-list');
    headerToggleBtn.classList.toggle('bi-x');
  }
  headerToggleBtn.addEventListener('click', headerToggle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.header-show')) {
        headerToggle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Init typed.js
   */
  const selectTyped = document.querySelector('.typed');
  if (selectTyped) {
    let typed_strings = selectTyped.getAttribute('data-typed-items');
    typed_strings = typed_strings.split(',');
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Animate the skills items on reveal
   */
  let skillsAnimation = document.querySelectorAll('.skills-animation');
  skillsAnimation.forEach((item) => {
    new Waypoint({
      element: item,
      offset: '80%',
      handler: function(direction) {
        let progress = item.querySelectorAll('.progress .progress-bar');
        progress.forEach(el => {
          el.style.width = el.getAttribute('aria-valuenow') + '%';
        });
      }
    });
  });

  /**
   * Show the selected skill category and animate its bars
   */
  function animateSkillBars(container) {
    container.querySelectorAll('.progress .progress-bar').forEach(el => {
      el.style.width = el.getAttribute('aria-valuenow') + '%';
    });
  }

  function showSkillCategory(category) {
    const categories = document.querySelectorAll('.skills-category');
    categories.forEach(cat => {
      const isActive = cat.dataset.category === category;
      cat.classList.toggle('d-none', !isActive);
      if (isActive) {
        animateSkillBars(cat);
      }
    });
  }

  const skillFilterButtons = document.querySelectorAll('.skills-filters .filter-btn');
  if (skillFilterButtons.length) {
    skillFilterButtons.forEach(button => {
      button.addEventListener('click', () => {
        const filter = button.getAttribute('data-filter');
        skillFilterButtons.forEach(btn => {
          const isSelected = btn === button;
          btn.classList.toggle('btn-primary', isSelected);
          btn.classList.toggle('btn-outline-primary', !isSelected);
          btn.classList.toggle('active', isSelected);
          btn.setAttribute('aria-pressed', isSelected ? 'true' : 'false');
        });
        showSkillCategory(filter);
      });
    });

    // Ensure the initial active category is displayed and animated.
    const initialButton = document.querySelector('.skills-filters .filter-btn.active');
    if (initialButton) {
      showSkillCategory(initialButton.getAttribute('data-filter'));
    }
  }

  /**
   * Initiate glightbox
   */
  let glightbox = null;
  function initGlightbox() {
    if (glightbox && typeof glightbox.reload === 'function') {
      glightbox.reload();
    } else {
      glightbox = GLightbox({
        selector: '.glightbox'
      });
    }
  }
  initGlightbox();

  /**
   * Project detail configuration
   */
  const portfolioProjects = {
    'hotel-mukut-regency': {
      title: 'Hotel Mukut Regency',
      subtitle: 'Hotel Website',
      description: 'A responsive hotel website with room listings, amenities, and reservation details for modern travelers. The design emphasizes user-friendly navigation and visual appeal.',
      category: 'Frontend',
      client: 'Hotel Mukut Regency',
      date: 'May 2025',
      // url: 'https://example.com/hotel-mukut-regency',
      images: [
        'assets/img/portfolio/Hotel Regency.png'
      ]
    },
    'netflix-clone': {
      title: 'Netflix Clone',
      subtitle: 'Streaming Service UI',
      description: 'A clean and interactive media streaming interface inspired by Netflix, featuring movie previews and category browsing. The design focuses on user engagement and responsive layout for various devices.',
      category: 'Frontend',
      client: 'Streaming App Demo',
      date: 'June 2025',
      // url: 'https://example.com/netflix-clone',
      images: [
        'assets/img/portfolio/clone.jpg.png'
      ]
    },
    'mankamneshwar-temple': {
      title: 'Mankamneshwar Temple',
      subtitle: 'Temple Website',
      description: 'A spiritual website experience for temple visitors, showcasing events, rituals, and priest contact information. The user can make donations and get certificates through email.',
      category: 'Frontend',
      client: 'Mankamneshwar Temple',
      date: 'April 2025',
      // url: 'https://example.com/mankamneshwar-temple',
      images: [
        'assets/img/portfolio/Mankamneshwar.png'
      ]
    },
    'tic-tac-toe': {
      title: 'Tic Tac Toe',
      subtitle: 'Game App',
      description: 'A responsive browser-based Tic Tac Toe game with intuitive controls and animated UI interactions. The game allows two players to compete in a classic match, with clear win/loss feedback and score tracking.',
      category: 'Mobile App',
      client: 'Game Demo',
      date: 'March 2025',
      // url: 'https://example.com/tic-tac-toe',
      images: [
        'assets/img/portfolio/Tic-Tac-Toe.png'
      ]
    },
    'snake-game': {
      title: 'Snake Game',
      subtitle: 'Classic Arcade Game',
      description: 'A modern take on the classic Snake game, built for fast-paced gameplay and responsive mobile controls. Players can enjoy smooth animations and increasing difficulty levels as they navigate the snake to collect items and grow longer.',
      category: 'Mobile App',
      client: 'Game Demo',
      date: 'March 2025',
      // url: 'https://example.com/snake-game',
      images: [
        'assets/img/portfolio/Snake Game.png',
      ]
    },
    'rock-paper-scissors': {
      title: 'Rock Paper Scissors',
      subtitle: 'Game App',
      description: 'A polished Rock Paper Scissors game with clear result feedback, score tracking, and responsive gameplay. The design emphasizes user engagement and quick decision-making, making it a fun and interactive experience for players.',
      category: 'Frontend',
      client: 'Game Demo',
      date: 'February 2025',
      // url: 'https://example.com/rock-paper-scissors',
      images: [
        'assets/img/portfolio/Rock Paper Scissors.png'
      ]
    },
    'todo-list': {
      title: 'To-Do List',
      subtitle: 'Task Manager',
      description: 'A productivity-oriented To-Do List app with task management, responsive styling, and intuitive project organization. Users can add, edit, and delete tasks, as well as mark them as complete, helping them stay organized and efficient in their daily routines.',
      category: 'Frontend',
      client: 'Productivity Demo',
      date: 'January 2025',
      // url: 'https://example.com/todo-list',
      images: [
        'assets/img/portfolio/To-Do List.png'
      ]
    },
    'notes-app': {
      title: 'Notes App',
      subtitle: 'Note Taking App',
      description: 'A clean note taking application for quick memos, reminders, and organized lists across devices. The app features a user-friendly interface, allowing users to create, edit, and categorize notes efficiently, enhancing productivity and information management.',
      category: 'Frontend',
      client: 'Productivity Demo',
      date: 'January 2025',
      // url: 'https://example.com/notes-app',
      images: [
        'assets/img/portfolio/Note App.png'
      ]
    },
    'password-generator': {
      title: 'Password Generator',
      subtitle: 'Security Utility',
      description: 'A secure password generator that creates strong passwords using customizable length and character settings. The tool emphasizes security best practices, allowing users to generate complex passwords for enhanced online safety and account protection.',
      category: 'Backend',
      client: 'Security Tool',
      date: 'February 2025',
      // url: 'https://example.com/password-generator',
      images: [
        'assets/img/portfolio/Password Generator.png'
      ]
    },
    'code-quiz': {
      title: 'Code Quiz',
      subtitle: 'Quiz Application',
      description: 'An interactive code quiz challenge with multiple-choice questions and instant score feedback. The application is designed to test coding knowledge and provide a fun, engaging way for users to learn and assess their programming skills.',
      category: 'Frontend',
      client: 'Learning Demo',
      date: 'March 2025',
      // url: 'https://example.com/code-quiz',
      images: [
        'assets/img/portfolio/Code Quiz.png'
      ]
    },
    'weather-website': {
      title: 'Weather Website',
      subtitle: 'Weather Dashboard',
      description: 'A weather dashboard presenting local forecasts, temperature details, and clean responsive UI design. The website provides users with up-to-date weather information, including current conditions, hourly forecasts, and extended outlooks, all presented in an intuitive and visually appealing format.',
      category: 'Frontend',
      client: 'Weather Project',
      date: 'April 2025',
      // url: 'https://example.com/weather-website',
      images: [
        'assets/img/portfolio/Weather App.png'
      ]
    },
    'social-media-selector': {
      title: 'Social Media Selector',
      subtitle: 'UI Component',
      description: 'A social media selector interface that helps users choose services quickly using modern button styling. The component is designed for seamless integration into web applications, providing an intuitive and visually appealing way for users to select their preferred social media platforms.',
      category: 'Frontend',
      client: 'UI Demo',
      date: 'April 2025',
      // url: 'https://example.com/social-media-selector',
      images: [
        'assets/img/portfolio/Social Media Selector Menu.png'
      ]
    },
    'calculator': {
      title: 'Calculator',
      subtitle: 'Calculator App',
      description: 'A responsive calculator interface with clean styling and easy arithmetic operations. The application is designed to provide a simple and efficient way for users to perform basic mathematical calculations.',
      category: 'Backend',
      client: 'Utility Demo',
      date: 'May 2025',
      // url: 'https://example.com/calculator',
      images: [
        'assets/img/portfolio/calculator.jpg.png'
      ]
    },
    'saranda-forest': {
      title: 'Saranda Forest',
      subtitle: 'Travel Website',
      description: 'A travel website showcasing the Saranda Forest, with information on attractions, accommodations, and local culture. The design emphasizes immersive visuals and user-friendly navigation, providing travelers with a comprehensive guide to exploring the natural beauty and biodiversity of the Saranda Forest region. Admin panel for managing content and user interactions is also included.',
      category: 'Backend',
      client: 'Saranda Forest Government',
      date: 'June 2025',
      url: 'https://www.sarandaforest.in/',
      images: [
        'assets/img/portfolio/sarand1.png',
        'assets/img/portfolio/saranda.png'
      ]
    },
    'palamau-tiger-reserve': {
      title: 'Palamau Tiger Reserve',
      subtitle: 'Wildlife Website',
      description: 'A wildlife conservation website highlighting the Palamau Tiger Reserve, its biodiversity, and visitor information. The design focuses on engaging visuals and educational content, promoting awareness and responsible tourism in the reserve. Admin panel for managing content and user interactions is also included.',
      category: 'Backend',
      client: 'Palamau Tiger Reserve',
      date: 'June 2025',
      url: 'https://www.palamautigerreserve.in/',
      images: [
        'assets/img/portfolio/palamau1.png',
        'assets/img/portfolio/palamau.png'
      ]
    },
    'dalama-wildlife-sanctuary': {
      title: 'Dalama Wildlife Sanctuary',
      subtitle: 'Nature Website',
      description: 'A nature-focused website providing insights into the Dalama Wildlife Sanctuary, its flora and fauna, and conservation efforts. The design emphasizes immersive visuals and user-friendly navigation, providing visitors with a comprehensive guide to exploring the natural beauty and biodiversity of the Dalama Wildlife Sanctuary region. Admin panel for managing content and user interactions is also included.',
      category: 'Backend',
      client: 'Dalama Wildlife Sanctuary',
      date: 'June 2025',
      url: 'https://www.dalmawildlife.com/',
      images: [
        'assets/img/portfolio/dalama1.png',
        'assets/img/portfolio/dalama.png'
      ]
    },
    'nainital-zoo': {
      title: 'Nainital Zoo',
      subtitle: 'Zoo Website',
      description: 'A zoo information website for Nainital Zoo, featuring animal exhibits, visitor guidelines, and educational resources. The design emphasizes immersive visuals and user-friendly navigation, providing visitors with a comprehensive guide to exploring the natural beauty and biodiversity of the Nainital Zoo region. Admin panel for managing content and user interactions is also included.',
      category: 'Backend',
      client: 'Nainital Zoo, Uttarakhand',
      date: 'June 2025',
      url: 'https://www.nainitalzoo.org.in/',
      images: [
        'assets/img/portfolio/nanital1.png',
        'assets/img/portfolio/nanital.png'
      ]
    },
    'deco-n-deco': {
      title: 'Deco n Deco',
      subtitle: 'Interior Design Website',
      description: 'A modern interior design website showcasing Deco n Deco\'s portfolio, services, and client testimonials. The design emphasizes immersive visuals and user-friendly navigation, providing visitors with a comprehensive guide to exploring the natural beauty and biodiversity of the Deco n Deco region. Admin panel for managing content and user interactions is also included.',
      category: 'Backend',
      client: 'Deco n Deco, Canada',
      date: 'July 2025',
      url: 'https://dev.decondeco.kalpvaig.com/',
      images: [
        'assets/img/portfolio/decon1.png',
        'assets/img/portfolio/decon.png'
      ]
    },
    'sparkle': {
      title: 'Sparkle',
      subtitle: 'Jewelry E-commerce Website',
      description: 'An e-commerce platform for Sparkle, featuring product listings, shopping cart functionality, and secure checkout. The design emphasizes immersive visuals and user-friendly navigation, providing visitors with a comprehensive guide to exploring the natural beauty and biodiversity of the Sparkle region. Admin panel for managing content and user interactions is also included.',
      category: 'Backend',
      client: 'Sparkle E-commerce',
      date: 'July 2025',
      url: 'https://dev.sparklewidstyle.com/',
      images: [
        'assets/img/portfolio/sparkle1.png',
        'assets/img/portfolio/sparkle.png'
      ]
    },
    'deco-murti-kala': {
      title: 'Deco Murti Kala',
      subtitle: 'Spiritual Ecommerce Website',  
      description: 'A website for Deco Murti Kala, highlighting handcrafted sculptures, artist profiles, and online gallery exhibitions. The design emphasizes immersive visuals and user-friendly navigation, providing visitors with a comprehensive guide to exploring the natural beauty and biodiversity of the Deco Murti Kala region. Admin panel for managing content and user interactions is also included.',
      category: 'Backend',
      client: 'Deco Murti Kala, Delhi',
      date: 'July 2025',
      url: 'https://dev.ecom.kalpvaig.com/',
      images: [
        'assets/img/portfolio/deco1.png',
        'assets/img/portfolio/deco.png'
      ]
    },
    'insurance': {
      title: 'Insurance',
      subtitle: 'Insurance Website',
      description: 'A website for an insurance company, providing information about policies, coverage options, and claim procedures. The design emphasizes immersive visuals and user-friendly navigation, providing visitors with a comprehensive guide to exploring the natural beauty and biodiversity of the Insurance region. Admin panel for managing content and user interactions is also included.',
      category: 'Backend',
      client: 'Insurance Company, New Zealand',
      date: 'August 2025',
      url: 'https://einsurance.kalpvaig.com/',
      images: [
        'assets/img/portfolio/insurance1.png',
        'assets/img/portfolio/insurance.png'
      ]
    },
    'expense-tracker': {
      title: 'Expense Tracker',
      subtitle: 'Financial Management App',
      description: 'A simple expense tracking application to help users manage their daily expenses and view spending patterns. The design emphasizes immersive visuals and user-friendly navigation, providing visitors with a comprehensive guide to exploring the natural beauty and biodiversity of the Expense Tracker region.',
      category: 'Mobile App',
      client: 'Personal Project',
      date: 'September 2025',
      // url: 'https://example.com/expense-tracker',
      images: [
        'assets/img/portfolio/expen1.png',
        'assets/img/portfolio/expen2.png',
        'assets/img/portfolio/expen.png'
      ]
    },
    'kissan-bot': {
      title: 'Kissan Bot',
      subtitle: 'Chatbot for Farmers',
      description: 'A chatbot designed to provide farmers with information about crops, weather, and agricultural practices. The design emphasizes immersive visuals and user-friendly navigation, providing visitors with a comprehensive guide to exploring the natural beauty and biodiversity of the Kissan Bot region. ',
      category: 'Mobile App',
      client: 'Personal Project',
      date: 'October 2025',
      // url: 'https://example.com/kissan-bot',
      images: [
        'assests/img/portfolio/kissan-bot.png',
        'assets/img/portfolio/kissan-bot1.png'
      ]
    }
  };

  function getQueryParam(param) {
    const searchParams = new URLSearchParams(window.location.search);
    return searchParams.get(param);
  }

  function renderProjectDetails() {
    const projectSlug = getQueryParam('project');
    const project = projectSlug ? portfolioProjects[projectSlug] : null;
    const notFound = document.getElementById('project-not-found');
    const detailTitle = document.getElementById('detail-page-title');
    const breadcrumbCurrent = document.getElementById('breadcrumb-current');
    const projectSlider = document.getElementById('project-slider');
    const projectHeading = document.getElementById('project-heading');
    const projectDescription = document.getElementById('project-description');
    const projectCategory = document.getElementById('project-category');
    const projectClient = document.getElementById('project-client');
    const projectDate = document.getElementById('project-date');
    const projectUrl = document.getElementById('project-url');

    if (!project) {
      if (notFound) notFound.classList.remove('d-none');
      if (projectSlider) projectSlider.innerHTML = '';
      if (detailTitle) detailTitle.textContent = 'Portfolio Details';
      if (breadcrumbCurrent) breadcrumbCurrent.textContent = 'Portfolio Details';
      if (projectHeading) projectHeading.textContent = 'Project Not Found';
      if (projectDescription) projectDescription.textContent = 'The requested project could not be found. Please return to the portfolio and choose a valid project.';
      if (projectCategory) projectCategory.textContent = '-';
      if (projectClient) projectClient.textContent = '-';
      if (projectDate) projectDate.textContent = '-';
      if (projectUrl) {
        projectUrl.href = 'index.html';
        projectUrl.textContent = 'Return to portfolio';
      }
      return;
    }

    if (notFound) notFound.classList.add('d-none');
    if (detailTitle) detailTitle.textContent = project.title;
    if (breadcrumbCurrent) breadcrumbCurrent.textContent = project.title;
    if (projectHeading) projectHeading.textContent = project.subtitle;
    if (projectDescription) projectDescription.textContent = project.description;
    if (projectCategory) projectCategory.textContent = project.category;
    if (projectClient) projectClient.textContent = project.client;
    if (projectDate) projectDate.textContent = project.date;
    if (projectUrl) {
      projectUrl.href = project.url;
      projectUrl.textContent = project.url;
    }

    if (projectSlider) {
      projectSlider.innerHTML = project.images.map(image => {
        return `
          <div class="swiper-slide">
            <a href="${image}" class="glightbox preview-link" data-gallery="project-gallery">
              <img src="${image}" alt="${project.title}">
            </a>
          </div>
        `;
      }).join('');
      initGlightbox();
    }
  }

  function isPortfolioDetailsPage() {
    return document.body.classList.contains('portfolio-details-page');
  }

  window.addEventListener('load', function() {
    if (isPortfolioDetailsPage()) {
      renderProjectDetails();
    }
  });

  /**
   * Init isotope layout and filters + pagination
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let currentFilter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';
    let currentPage = 1;
    const itemsPerPage = 9;
    let initIsotope;
    const paginationContainer = isotopeItem.querySelector('.portfolio-pagination');

    function getFilteredItems() {
      const allItems = Array.from(isotopeItem.querySelectorAll('.portfolio-item'));
      if (currentFilter === '*' || !currentFilter) {
        return allItems;
      }
      return allItems.filter(item => item.matches(currentFilter));
    }

    function updatePageClasses() {
      const filteredItems = getFilteredItems();
      const totalPages = Math.max(1, Math.ceil(filteredItems.length / itemsPerPage));
      currentPage = Math.min(currentPage, totalPages);

      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = currentPage * itemsPerPage;

      filteredItems.forEach((item, index) => {
        item.classList.toggle('page-current', index >= startIndex && index < endIndex);
      });

      Array.from(isotopeItem.querySelectorAll('.portfolio-item'))
        .filter(item => !filteredItems.includes(item))
        .forEach(item => item.classList.remove('page-current'));
    }

    function updatePagination() {
      if (!paginationContainer) return;
      const filteredItems = getFilteredItems();
      const totalPages = Math.max(1, Math.ceil(filteredItems.length / itemsPerPage));
      paginationContainer.innerHTML = '';

      for (let page = 1; page <= totalPages; page++) {
        const pageButton = document.createElement('button');
        pageButton.type = 'button';
        pageButton.className = 'btn btn-sm btn-outline-primary portfolio-page-btn';
        pageButton.textContent = page;

        if (page === currentPage) {
          pageButton.classList.remove('btn-outline-primary');
          pageButton.classList.add('btn-primary');
        }

        pageButton.addEventListener('click', function() {
          if (page === currentPage) return;
          currentPage = page;
          updatePageClasses();
          arrangeIsotope();
          updatePagination();
        });

        paginationContainer.appendChild(pageButton);
      }
    }

    function arrangeIsotope() {
      if (!initIsotope) return;
      const filterSelector = currentFilter === '*' ? '.page-current' : currentFilter + '.page-current';
      initIsotope.arrange({ filter: filterSelector });
    }

    function refreshPortfolioView() {
      updatePageClasses();
      arrangeIsotope();
      updatePagination();
      if (typeof aosInit === 'function') {
        aosInit();
      }
    }

    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: '.page-current',
        sortBy: sort
      });

      refreshPortfolioView();
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active')?.classList.remove('filter-active');
        this.classList.add('filter-active');
        currentFilter = this.getAttribute('data-filter') || '*';
        currentPage = 1;
        refreshPortfolioView();
      }, false);
    });

  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

  /**
   * Certificate Pagination
   */
  const certificates = [
    {
      id: 1,
      title: 'Certificate 1',
      description: 'NYAS Research',
      link: './assets/certificates/Nyas Internship Certificate (Pranav).pdf'
    },
    {
      id: 2,
      title: 'Certificate 2',
      description: 'Kalpvaig | Parardham Information Technology LLP',
      link: './assets/certificates/InternshipLetter_frontend_aug.pdf'
    },
    {
      id: 3,
      title: 'Certificate 3',
      description: 'Artificial Intelligence',
      link: './assets/certificates/Aritifical Intelligence.pdf'
    },
    {
      id: 4,
      title: 'Certificate 4',
      description: 'Cybersecurity',
      link: './assets/certificates/Cybersecurity.pdf'
    },
    {
      id: 5,
      title: 'Certificate 5',
      description: 'Generative AI',
      link: './assets/certificates/Generative AI Certificate 2.pdf'
    },
    {
      id: 6,
      title: 'Certificate 6',
      description: 'Ethical AI',
      link: './assets/certificates/Ethic AI Certificate.pdf'
    },
    {
      id: 7,
      title: 'Certificate 7',
      description: 'Copilot',
      link: './assets/certificates/Copilot.pdf'
    },
    {
      id: 8,
      title: 'Certificate 8',
      description: 'Copilot 1',
      link: './assets/certificates/Copilot 1.pdf'
    },
    {
      id: 9,
      title: 'Certificate 9',
      description: 'Jaipuriya Quiz',
      link: './assets/certificates/Jaipuriya.pdf'
    },
    {
      id: 10,
      title: 'Certificate 10',
      description: 'Optifyx Technology',
      link: './assets/certificates/Optifyx.pdf'
    },
    {
      id: 11,
      title: 'Certificate 11',
      description: 'Optifyx Technology Foundation',
      link: './assets/certificates/Optifyx 1.pdf'
    },
    {
      id: 12,
      title: 'Certificate 12',
      description: 'Kalpvaig',
      link: './assets/certificates/Kalpvaig.pdf'
    },
    {
      id: 13,
      title: 'Certificate 13',
      description: 'Softflew',
      link: './assets/certificates/Softflew.pdf'
    },
    {
      id: 14,
      title: 'Certificate 14',
      description: 'Talent Park',
      link: './assets/certificates/Talent Park.pdf'
    },
    {
      id: 15,
      title: 'Certificate 15',
      description: 'Unstop',
      link: './assets/certificates/Unstop.pdf'
    },
    {
      id: 16,
      title: 'Certificate 16',
      description: 'Unstop 1',
      link: './assets/certificates/Unstop 1.pdf'
    },
    {
      id: 17,
      title: 'Certificate 17',
      description: 'Power Bi',
      link: './assets/certificates/CertificateBi.pdf'
    },
    {
      id: 18,
      title: 'Certificate 18',
      description: 'HP',
      link: './assets/certificates/Hp certificate.pdf'
    },
    {
      id: 19,
      title: 'Certificate 19',
      description: 'Shark Tank Raebareli',
      link: './assets/certificates/SharkTank(Pranav).pdf'
    },
  ];

  const itemsPerPage = 9;
  let currentPage = 1;

  function renderCertificates(page) {
    const container = document.getElementById('certificatesContainer');
    if (!container) return;

    const startIdx = (page - 1) * itemsPerPage;
    const endIdx = startIdx + itemsPerPage;
    const paginatedCerts = certificates.slice(startIdx, endIdx);

    container.innerHTML = '';

    paginatedCerts.forEach((cert, index) => {
      const colDiv = document.createElement('div');
      colDiv.className = 'col-lg-4 col-md-6 service-item d-flex';
      colDiv.setAttribute('data-aos', 'fade-up');
      colDiv.setAttribute('data-aos-delay', String((index % 3) * 100 + 100));

      colDiv.innerHTML = `
        <div class="icon flex-shrink-0"><i class="bi bi-briefcase"></i></div>
        <div>
          <h4 class="title"><a href="${cert.link}" class="stretched-link">${cert.title}</a></h4>
          <p class="description">${cert.description}</p>
        </div>
      `;

      container.appendChild(colDiv);
    });

    // Reinitialize AOS for new elements
    if (typeof AOS !== 'undefined') {
      AOS.refresh();
    }
  }

  function renderPagination() {
    const paginationContainer = document.getElementById('paginationControls');
    if (!paginationContainer) return;

    paginationContainer.innerHTML = '';

    const totalPages = Math.ceil(certificates.length / itemsPerPage);

    // Page numbers only
    for (let i = 1; i <= totalPages; i++) {
      const pageBtn = document.createElement('button');
      pageBtn.className = 'btn btn-sm pagination-btn';
      pageBtn.textContent = i;
      pageBtn.classList.add(i === currentPage ? 'btn-primary' : 'btn-outline-primary');
      pageBtn.addEventListener('click', () => {
        currentPage = i;
        renderCertificates(currentPage);
        renderPagination();
        window.scrollTo({ top: document.getElementById('services').offsetTop - 100, behavior: 'smooth' });
      });
      paginationContainer.appendChild(pageBtn);
    }
  }

  // Initialize certificate pagination on page load
  window.addEventListener('load', () => {
    renderCertificates(currentPage);
    renderPagination();
  });

})();