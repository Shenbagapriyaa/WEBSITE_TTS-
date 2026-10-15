// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
const navAbout = document.getElementById('navAbout');
const aboutToggle = document.getElementById('aboutToggle');
const navProducts = document.getElementById('navProducts');
const productsToggle = document.getElementById('productsToggle');
const navSectionItems = document.querySelectorAll('[data-nav-section]');
const setActiveNavSection = (section) => {
  navSectionItems.forEach(item => {
    item.classList.toggle('is-current', item.dataset.navSection === section);
  });
};

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
  navLinks.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => {
      const sectionItem = a.closest('[data-nav-section]');
      if (sectionItem) setActiveNavSection(sectionItem.dataset.navSection);
      navLinks.classList.remove('open');
      navAbout?.classList.remove('is-open');
      aboutToggle?.setAttribute('aria-expanded', 'false');
      navProducts?.classList.remove('is-open');
      productsToggle?.setAttribute('aria-expanded', 'false');
    })
  );
}

if (navAbout && aboutToggle) {
  aboutToggle.addEventListener('click', () => {
    const isOpen = navAbout.classList.toggle('is-open');
    aboutToggle.setAttribute('aria-expanded', String(isOpen));
    setActiveNavSection('about');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  document.addEventListener('click', (event) => {
    if (!navAbout.contains(event.target)) {
      navAbout.classList.remove('is-open');
      aboutToggle.setAttribute('aria-expanded', 'false');
    }
  });
}

if (navProducts && productsToggle) {
  productsToggle.addEventListener('click', () => {
    const isOpen = navProducts.classList.toggle('is-open');
    productsToggle.setAttribute('aria-expanded', String(isOpen));
    setActiveNavSection('products');
  });
  document.addEventListener('click', (event) => {
    if (!navProducts.contains(event.target)) {
      navProducts.classList.remove('is-open');
      productsToggle.setAttribute('aria-expanded', 'false');
    }
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      const aboutWasOpen = navAbout?.classList.contains('is-open');
      navAbout?.classList.remove('is-open');
      aboutToggle?.setAttribute('aria-expanded', 'false');
      navProducts.classList.remove('is-open');
      productsToggle.setAttribute('aria-expanded', 'false');
      (aboutWasOpen ? aboutToggle : productsToggle).focus();
    }
  });
}

const navTargetSections = document.querySelectorAll('[data-nav-target]');
if ('IntersectionObserver' in window && navTargetSections.length) {
  const navSectionObserver = new IntersectionObserver((entries) => {
    const activeEntry = entries.find(entry => entry.isIntersecting);
    if (activeEntry) setActiveNavSection(activeEntry.target.dataset.navTarget);
  }, { threshold: 0, rootMargin: '-40% 0px -50% 0px' });
  navTargetSections.forEach(section => navSectionObserver.observe(section));
}

const products = {
  quality: {
    number: '01', name: 'Quality Control',
    description: 'Record inspections on the line, spot recurring issues and deal with defects before they reach packing or the warehouse.',
    stages: ['Inspect', 'Flag', 'Resolve'], image: 'assets/img/quality-control.jpg',
    alt: 'Garment quality inspection on the factory floor', label: 'QUALITY CHECK', value: 'CHECKING'
  },
  tracking: {
    number: '02', name: 'Production Tracking',
    description: 'Follow every order as it moves through cutting, sewing and finishing. Give supervisors a live view of output, bottlenecks and what needs attention next.',
    stages: ['Cutting', 'Sewing', 'Finishing'], image: 'assets/img/machine-maintenance.jpg',
    alt: 'Production lines visible across a garment factory', label: 'ORDER 4821 / LINE 03', value: 'IN PROGRESS'
  },
  maintenance: {
    number: '03', name: 'Machine Maintenance',
    description: 'Keep machine health, service schedules and repair history in view. Catch warning signs early and spend less production time waiting on a fix.',
    stages: ['Monitor', 'Schedule', 'Prevent'], image: 'assets/img/production-tracking.jpg',
    alt: 'Sewing machine with an integrated monitoring sensor', label: 'MACHINE HEALTH', value: 'RUNNING WELL'
  },
  fabric: {
    number: '04', name: 'Fabric Optimization',
    description: 'Plan fabric use with accurate markers, roll visibility and material allocation. Reduce avoidable waste while keeping each order supplied.',
    stages: ['Measure', 'Optimize', 'Allocate'], image: 'assets/img/production-planning.jpg',
    alt: 'Fabric planning and material layout for garment production', label: 'MATERIAL PLAN', value: 'LAYOUT READY'
  },
  planning: {
    number: '05', name: 'Production Planning',
    description: 'Balance orders, lines and capacity in one practical plan. When priorities or resources change, update the floor plan before delays spread.',
    stages: ['Prioritize', 'Schedule', 'Balance'], image: 'assets/img/dashboard-impact.jpg',
    alt: 'Factory production dashboard displaying planning information', label: 'LINE 03 CAPACITY', value: 'PLAN BALANCED'
  },
  warehouse: {
    number: '06', name: 'Warehouse Management',
    description: 'Know what material is in stock, where it is stored and what has been issued. Keep receiving, inventory and production replenishment in sync.',
    stages: ['Receive', 'Locate', 'Dispatch'], image: 'assets/img/factory-aerial.jpg',
    alt: 'Factory warehouses and loading areas for inventory movement', label: 'STOCK LOCATION', value: 'BIN A-03 READY'
  },
  trakwel: {
    number: '07', name: 'TrakWel',
    description: 'Manufacturing Execution System (MES) for real-time visibility and control across the shop floor, improving efficiency, quality and performance.',
    stages: ['Track', 'Monitor', 'Improve'], image: 'assets/img/production-tracking.jpg',
    alt: 'Live production tracking across garment factory lines', label: 'SHOP FLOOR', value: 'LIVE VISIBILITY', visual: 'trakwel'
  },
  planwel: {
    number: '08', name: 'PlanWel',
    description: 'Advanced planning and scheduling to balance capacity, manage orders and keep delivery commitments on track with dynamic schedules.',
    stages: ['Plan', 'Schedule', 'Deliver'], image: 'assets/img/production-planning.jpg',
    alt: 'Production plan and schedule for garment manufacturing', label: 'CAPACITY PLAN', value: 'SCHEDULED', visual: 'planning'
  },
  mtrak: {
    number: '09', name: 'mTrak',
    description: 'Machine maintenance management that maximizes machine uptime, reduces downtime and extends equipment life with preventive maintenance.',
    stages: ['Monitor', 'Maintain', 'Optimize'], image: 'assets/img/quality-control.jpg',
    alt: 'Connected sewing machines monitored across the factory floor', label: 'MACHINE HEALTH', value: 'RUNNING WELL', visual: 'maintenance'
  },
  sewlot: {
    number: '10', name: 'SewloT',
    description: 'IoT for sewing lines. Connect the sewing floor with technology to monitor, analyze and improve productivity.',
    stages: ['Connect', 'Analyze', 'Improve'], image: 'assets/img/dashboard-impact.jpg',
    alt: 'Sewing line productivity dashboard with live factory metrics', label: 'SEWING LINE', value: 'CONNECTED', visual: 'sewlot'
  }
};

const productChoices = document.querySelectorAll('[data-product-choice]');
const productDetail = document.getElementById('product-detail');
const productKicker = document.getElementById('productKicker');
const productTitle = document.getElementById('productTitle');
const productDescription = document.getElementById('productDescription');
const productImage = document.getElementById('productImage');
const productVisual = document.getElementById('productVisual');

const selectProduct = (productId) => {
  const product = products[productId];
  if (!product || !productDetail) return;

  productKicker.textContent = `PRODUCT ${product.number} / ${product.name.toUpperCase()}`;
  productTitle.textContent = product.name;
  productDescription.textContent = product.description;
  productImage.src = product.image;
  productImage.alt = product.alt;
  productVisual.dataset.product = product.visual || productId;
  document.getElementById('productStageOne').textContent = product.stages[0];
  document.getElementById('productStageTwo').textContent = product.stages[1];
  document.getElementById('productStageThree').textContent = product.stages[2];
  document.getElementById('productVisualLabel').textContent = product.label;
  document.getElementById('productVisualValue').textContent = product.value;

  productChoices.forEach(choice => {
    choice.classList.toggle('is-selected', choice.dataset.productChoice === productId);
  });

  productDetail.classList.remove('is-switching');
  void productDetail.offsetWidth;
  productDetail.classList.add('is-switching');
  window.setTimeout(() => productDetail.classList.remove('is-switching'), 450);
};

productChoices.forEach(choice => {
  choice.addEventListener('click', () => {
    selectProduct(choice.dataset.productChoice);
    setActiveNavSection('products');
    navProducts?.classList.remove('is-open');
    productsToggle?.setAttribute('aria-expanded', 'false');
  });
});

// Cursor glow follows pointer (desktop only, handled in CSS media query)
const glow = document.getElementById('cursorGlow');
if (glow) {
  window.addEventListener('pointermove', (e) => {
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
  });
}

// Pause background videos when off-screen to save resources
const backgroundVideos = document.querySelectorAll('.hero-bg-video, .section-video');
if (backgroundVideos.length && 'IntersectionObserver' in window) {
  const vidObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.play().catch(() => {});
      else entry.target.pause();
    });
  }, { threshold: 0.1 });
  backgroundVideos.forEach(video => vidObserver.observe(video));
}

// Quiet scroll-reveal for whole sections (not per-card, per design guidance)
if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
}

