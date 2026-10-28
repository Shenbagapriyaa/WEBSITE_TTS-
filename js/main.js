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
  trakwel: {
    number: '01', name: 'TrakWel',
    description: 'TrakWel brings key factory processes into a connected digital workflow, helping teams track material movement, monitor production, manage quality, and access operational information in real time.',
    stages: ['Track', 'Monitor', 'Improve'], image: 'assets/img/trakwel.png',
    alt: 'TrakWel smarter manufacturing execution system illustration', label: '', value: '', visual: 'trakwel', imageOnly: true
  },
  'fabric-inventory': {
    number: '02', name: 'Fabric Inventory Management',
    description: 'Digitise fabric inspection and inventory management with Inspection 4.0 and automatic grouping by shade, width and shrinkage. Gain real-time visibility into stock levels and material consumption, improve fabric traceability and ensure better inventory control.',
    stages: ['Receive', 'Locate', 'Issue'], image: 'assets/img/fabric-inventory-management.png',
    alt: 'Fabric inventory management illustration showing fabric rolls, stock scanning and inventory details', label: 'FABRIC STOCK', value: 'ROLLS IN VIEW', visual: 'fabric-inventory', imageOnly: true
  },
  'cutting-digitalization': {
    number: '03', name: 'Cutting Room Digitization',
    description: 'Digitise cut planning, optimize end-bit utilization and streamline fabric reconciliation. Improve cutting-room efficiency, reduce fabric wastage and gain better visibility and control over material usage and cutting operations',
    stages: ['Prepare', 'Cut', 'Handoff'], image: 'assets/img/cutting-room-digitalization.png',
    alt: 'Digital cutting room with marker planning, automated cutting and finished fabric bundles', label: 'CUTTING ROOM', value: 'WORK IN VIEW', visual: 'cutting-digitalization', imageOnly: true
  },
  tracking: {
    number: '04', name: 'Real-Time Production Tracking',
    description: 'Track real time production, monitor efficiency and performance in real time, and compare planned versus actual output. Gain actionable insights into production progress, identify bottlenecks early and improve operational control.',
    stages: ['Cutting', 'Sewing', 'Finishing'], image: 'assets/img/product-tracking.png',
    alt: 'Production tracking dashboard showing order progress across garment factory stages', label: 'ORDER 4821 / LINE 03', value: 'IN PROGRESS', visual: 'tracking', imageOnly: true
  },
  quality: {
    number: '05', name: 'Quality Management System',
    description: 'Monitor defect rates, track rework levels and identify recurring quality issues in real time. Gain actionable insights into defect trends, improve quality control and drive continuous improvement across production.',
    stages: ['Inspect', 'Flag', 'Resolve'], image: 'assets/img/quality-control.png',
    alt: 'Garment quality control inspection and defect tracking', label: 'QUALITY CHECK', value: 'CHECKING', visual: 'quality', imageOnly: true
  },
  planwel: {
    number: '06', name: 'PlanWel',
    description: 'Advanced planning and scheduling to balance capacity, manage orders and keep delivery commitments on track with dynamic schedules.',
    stages: ['Plan', 'Schedule', 'Deliver'], image: 'assets/img/planwel.png',
    alt: 'PlanWel production planning and scheduling interface', label: 'CAPACITY PLAN', value: 'SCHEDULED', visual: 'planwel', imageOnly: true
  },
  mtrak: {
    number: '07', name: 'mTrak',
    description: 'mTrak helps maintenance teams maintain a central record of factory assets, respond to breakdowns, schedule servicing, assign tasks, and review downtime and maintenance performance through dashboards and reports.',
    stages: ['Monitor', 'Maintain', 'Optimize'], image: 'assets/img/mTrak.png',
    alt: 'mTrak machine maintenance management interface', label: 'MACHINE HEALTH', value: 'RUNNING WELL', visual: 'mtrak', imageOnly: true
  },
  sewiot: {
    number: '08', name: 'Sewing IoT',
    description: 'Sewing IoT connects sewing machines to a real-time data layer, helping factory teams see production progress, understand operator performance, identify non-productive time, and respond to issues sooner.',
    stages: ['Connect', 'Analyze', 'Improve'], image: 'assets/img/sew-IoT.png',
    alt: 'Sewing IoT smart sewing line and connected factory real-time monitoring', label: 'SEWING LINE', value: 'CONNECTED', visual: 'sewiot', imageOnly: true
  },
  laundry: {
    number: '09', name: 'Laundry Management',
    description: 'Laundry Management digitally tracks garment washing lots, machine allocation, operators, shades, and process flow using QR codes. It improves traceability, reduces manual errors, and provides real-time WIP visibility for efficient production control.',
    stages: ['Receive', 'Process', 'Inspect'], image: 'assets/img/laundry-management.png',
    alt: 'Laundry management workflow for garment processing and finishing', label: 'LAUNDRY FLOW', value: 'LOT IN PROCESS', visual: 'laundry', imageOnly: true
  },
  jig: {
    number: '10', name: 'Jig Management',
    description: 'Jig Management digitally tracks denim pocket jigs, including design details, sizes, storage, allocation, and availability using QR codes. It reduces manual errors, prevents loss, and improves inventory control and production efficiency.',
    stages: ['Register', 'Assign', 'Verify'], image: 'assets/img/Jig-management.png',
    alt: 'Jig management illustration showing organized jig storage, tracking and maintenance', label: 'JIG READINESS', value: 'AVAILABLE', visual: 'jig', imageOnly: true
  },
  shrinkage: {
    number: '11', name: 'Shrinkage Testing App',
    description: 'Record fabric measurements before and after washing, calculate shrinkage and keep test results linked to the material lot for consistent quality decisions.',
    stages: ['Measure', 'Calculate', 'Review'], image: 'assets/img/shrinkage-testing-app.png',
    alt: 'Shrinkage testing app for recording fabric measurements and test results', label: 'SHRINKAGE TEST', value: 'RESULT RECORDED', visual: 'shrinkage', imageOnly: true
  }
};

const productChoices = document.querySelectorAll('[data-product-choice]');
const productDetail = document.getElementById('product-detail');
const productKicker = document.getElementById('productKicker');
const productTitle = document.getElementById('productTitle');
const productDescription = document.getElementById('productDescription');
const productImage = document.getElementById('productImage');
const productVisual = document.getElementById('productVisual');

const scrollTargetToCenter = (target) => {
  if (!target) return;
  const nav = document.querySelector('nav');
  const navHeight = nav ? nav.offsetHeight : 70;

  if (target.id === 'about' || target === document.body) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }

  // Target the section cleanly so previous section edge/line never peeks through
  const sectionTarget = target.closest('section') || target;
  const targetRect = sectionTarget.getBoundingClientRect();
  const targetTopPage = window.pageYOffset + targetRect.top;
  const targetScrollY = Math.max(0, Math.round(targetTopPage - navHeight));

  window.scrollTo({
    top: targetScrollY,
    behavior: 'smooth'
  });
};

const productOrder = [
  'trakwel',
  'fabric-inventory',
  'cutting-digitalization',
  'tracking',
  'quality',
  'planwel',
  'mtrak',
  'sewiot',
  'laundry',
  'jig',
  'shrinkage'
];

let currentProductIndex = 0;

const selectProduct = (productId) => {
  const key = productId?.toLowerCase();
  const product = products[key];
  if (!product || !productDetail) return;

  const idx = productOrder.indexOf(key);
  if (idx !== -1) {
    currentProductIndex = idx;
  }

  const kickerEl = document.getElementById('productKicker');
  if (kickerEl) {
    kickerEl.innerHTML = `PRODUCT ${product.number} <span>/</span> ${product.name.toUpperCase()}`;
  }
  const titleEl = document.getElementById('productTitle');
  if (titleEl) {
    titleEl.textContent = product.name;
  }
  const descEl = document.getElementById('productDescription');
  if (descEl) {
    descEl.textContent = product.description;
  }
  const imgEl = document.getElementById('productImage');
  if (imgEl && product.image) {
    imgEl.src = product.image;
    imgEl.alt = product.alt || product.name;
  }
  if (productVisual) {
    productVisual.dataset.product = product.visual || productId;
    const animStage = productVisual.querySelector('.product-animation-stage');
    if (animStage) {
      animStage.hidden = Boolean(product.imageOnly);
    }
  }
  productDetail.dataset.product = product.visual || productId;

  const s1 = document.getElementById('productStageOne');
  if (s1 && product.stages?.[0]) s1.textContent = product.stages[0];
  const s2 = document.getElementById('productStageTwo');
  if (s2 && product.stages?.[1]) s2.textContent = product.stages[1];
  const s3 = document.getElementById('productStageThree');
  if (s3 && product.stages?.[2]) s3.textContent = product.stages[2];

  const visualStatus = productVisual?.querySelector('.visual-status');
  if (visualStatus) {
    const hasStatus = Boolean(product.label || product.value);
    visualStatus.style.display = hasStatus ? '' : 'none';
    const vLabel = document.getElementById('productVisualLabel');
    if (vLabel) vLabel.textContent = product.label || '';
    const vValue = document.getElementById('productVisualValue');
    if (vValue) vValue.textContent = product.value || '';
  }

  productChoices.forEach(choice => {
    choice.classList.toggle('is-selected', choice.dataset.productChoice === key);
  });

  productDetail.classList.remove('is-switching');
  void productDetail.offsetWidth;
  productDetail.classList.add('is-switching');
  window.setTimeout(() => productDetail.classList.remove('is-switching'), 450);
};

const navigateProduct = (delta) => {
  currentProductIndex = (currentProductIndex + delta + productOrder.length) % productOrder.length;
  const nextKey = productOrder[currentProductIndex];
  selectProduct(nextKey);
};

const prevBtn = document.getElementById('productNavPrev');
const nextBtn = document.getElementById('productNavNext');
if (prevBtn) {
  prevBtn.addEventListener('click', (e) => {
    e.preventDefault();
    navigateProduct(-1);
  });
}
if (nextBtn) {
  nextBtn.addEventListener('click', (e) => {
    e.preventDefault();
    navigateProduct(1);
  });
}

// Touch swipe gestures on product showcase
const productExpEl = document.getElementById('product-experience');
if (productExpEl) {
  let touchStartX = 0;
  let touchStartY = 0;
  productExpEl.addEventListener('touchstart', (e) => {
    if (e.touches && e.touches.length === 1) {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    }
  }, { passive: true });

  productExpEl.addEventListener('touchend', (e) => {
    if (e.changedTouches && e.changedTouches.length === 1) {
      const deltaX = e.changedTouches[0].clientX - touchStartX;
      const deltaY = e.changedTouches[0].clientY - touchStartY;
      if (Math.abs(deltaX) > 40 && Math.abs(deltaX) > Math.abs(deltaY) * 1.3) {
        if (deltaX < 0) {
          navigateProduct(1); // Swipe left -> Next
        } else {
          navigateProduct(-1); // Swipe right -> Previous
        }
      }
    }
  }, { passive: true });
}

// Product menu choice click handler
productChoices.forEach(choice => {
  choice.addEventListener('click', (event) => {
    if (choice.tagName === 'A') {
      event.preventDefault();
      navProducts?.classList.remove('is-open');
      productsToggle?.setAttribute('aria-expanded', 'false');
      navLinks?.classList.remove('open');
      choice.blur();
      try {
        history.replaceState(null, '', '#product-experience');
      } catch (_) {}
    } else {
      choice.blur();
    }
    selectProduct(choice.dataset.productChoice);
    setActiveNavSection('products');
    const targetProduct = document.getElementById('product-experience') || productDetail;
    scrollTargetToCenter(targetProduct);
  });
});

// Universal smooth viewport-centering click handler for all section anchor links
document.querySelectorAll('a[href^="#"]').forEach(a => {
  if (a.hasAttribute('data-product-choice')) return;
  a.addEventListener('click', (event) => {
    const href = a.getAttribute('href');
    if (!href || href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      event.preventDefault();
      navLinks?.classList.remove('open');
      navAbout?.classList.remove('is-open');
      aboutToggle?.setAttribute('aria-expanded', 'false');
      navProducts?.classList.remove('is-open');
      productsToggle?.setAttribute('aria-expanded', 'false');

      const targetNavSection = target.getAttribute('data-nav-target') || target.id;
      setActiveNavSection(targetNavSection);
      scrollTargetToCenter(target);
      try {
        history.replaceState(null, '', href);
      } catch (_) {}
    }
  });
});

const toggleProductGroup = (control) => {
  const group = control.closest('[data-product-group]');
  const items = group?.querySelector('.product-menu-items');
  const disclosure = group?.querySelector('.product-menu-disclosure');
  if (!group || !items || !disclosure) return;

  const isExpanded = group.classList.contains('is-open');
  group.classList.toggle('is-open', !isExpanded);
  items.hidden = isExpanded;
  disclosure.setAttribute('aria-expanded', String(!isExpanded));
  disclosure.setAttribute('aria-label', `${isExpanded ? 'Expand' : 'Collapse'} ${group.querySelector('.product-menu-parent').textContent.trim()}`);
};

document.querySelectorAll('.product-menu-parent, .product-menu-disclosure').forEach(control => {
  control.addEventListener('click', () => toggleProductGroup(control));
});



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

// Additional information textarea allows unlimited length


