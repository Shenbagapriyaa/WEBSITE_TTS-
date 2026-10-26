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
  trakwel: {
    number: '01', name: 'TrakWel',
    description: 'Manufacturing Execution System (MES) for real-time visibility and control across the shop floor, improving efficiency, quality and performance.',
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
    description: 'Machine maintenance management that maximizes machine uptime, reduces downtime and extends equipment life with preventive maintenance.',
    stages: ['Monitor', 'Maintain', 'Optimize'], image: 'assets/img/mTrak.png',
    alt: 'mTrak machine maintenance management interface', label: 'MACHINE HEALTH', value: 'RUNNING WELL', visual: 'mtrak', imageOnly: true
  },
  sewiot: {
    number: '08', name: 'SewIoT',
    description: 'IoT for sewing lines. Connect the sewing floor with technology to monitor, analyze and improve productivity.',
    stages: ['Connect', 'Analyze', 'Improve'], image: 'assets/img/sew-IoT.png',
    alt: 'SewIoT smart sewing line and connected factory real-time monitoring', label: 'SEWING LINE', value: 'CONNECTED', visual: 'sewiot', imageOnly: true
  },
  laundry: {
    number: '09', name: 'Laundry Management',
    description: 'Follow garment lots through washing, treatment and finishing. Track process status and quality checks to keep laundry work aligned with order requirements.',
    stages: ['Receive', 'Process', 'Inspect'], image: 'assets/img/laundry-management.png',
    alt: 'Laundry management workflow for garment processing and finishing', label: 'LAUNDRY FLOW', value: 'LOT IN PROCESS', visual: 'laundry', imageOnly: true
  },
  jig: {
    number: '10', name: 'Jig Management',
    description: 'Organize sewing aids and jigs by style, line and order. Make availability and readiness visible so teams can reduce setup delays and keep production moving.',
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

const selectProduct = (productId) => {
  const key = productId?.toLowerCase();
  const product = products[key];
  if (!product || !productDetail) return;

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
    choice.classList.toggle('is-selected', choice.dataset.productChoice === productId);
  });

  productDetail.classList.remove('is-switching');
  void productDetail.offsetWidth;
  productDetail.classList.add('is-switching');
  window.setTimeout(() => productDetail.classList.remove('is-switching'), 450);
};

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
    productDetail?.scrollIntoView({ behavior: 'smooth', block: 'center' });
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

// Dual-layer custom cursor: Outer blue ring + inner blue dot
const cursorRing = document.getElementById('cursorRing');
const cursorDot = document.getElementById('cursorDot');

if (cursorRing && cursorDot && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
  let mouseX = -100, mouseY = -100;
  let ringX = -100, ringY = -100;
  let isVisible = false;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    cursorDot.style.left = mouseX + 'px';
    cursorDot.style.top = mouseY + 'px';

    if (!isVisible) {
      cursorRing.style.opacity = '1';
      cursorDot.style.opacity = '1';
      ringX = mouseX;
      ringY = mouseY;
      isVisible = true;
    }
  });

  window.addEventListener('mouseleave', () => {
    cursorRing.style.opacity = '0';
    cursorDot.style.opacity = '0';
    isVisible = false;
  });

  window.addEventListener('mouseenter', () => {
    if (mouseX > 0) {
      cursorRing.style.opacity = '1';
      cursorDot.style.opacity = '1';
      isVisible = true;
    }
  });

  function animateCursor() {
    ringX += (mouseX - ringX) * 0.22;
    ringY += (mouseY - ringY) * 0.22;

    cursorRing.style.left = ringX + 'px';
    cursorRing.style.top = ringY + 'px';

    requestAnimationFrame(animateCursor);
  }
  requestAnimationFrame(animateCursor);
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

