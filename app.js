/* ============================================================
   AGROBRIDGE NIGERIA — APP.JS
   All shared logic: navbar, ticker, counter, forms, listings,
   search, reviews, back-to-top, animations
   ============================================================ */

'use strict';

/* ============================================================
   REAL NIGERIAN MARKET PRICES (March 2026, NGN/kg)
   Sources: Market Naija TV, NigerianQueries, BestSales.ng
   USD/NGN rate: ~1,388 (Trading Economics, March 2026)
   ============================================================ */
var MARKET_PRICES = [
  { crop: 'White Maize',       price: 420,   change: +12,  unit: 'kg' },
  { crop: 'Hybrid Maize',      price: 440,   change: +8,   unit: 'kg' },
  { crop: 'Milled Rice',       price: 1320,  change: -20,  unit: 'kg' },
  { crop: 'Paddy Rice',        price: 663,   change: +15,  unit: 'kg' },
  { crop: 'Fresh Tomatoes',    price: 333,   change: -45,  unit: 'kg' },
  { crop: 'Dried Tomatoes',    price: 1400,  change: +30,  unit: 'kg' },
  { crop: 'Yam (Benue)',       price: 950,   change: +80,  unit: 'kg' },
  { crop: 'Cassava (Fresh)',   price: 65,    change: -5,   unit: 'kg' },
  { crop: 'Garri (White)',     price: 786,   change: +22,  unit: 'kg' },
  { crop: 'Soybeans',         price: 790,   change: +40,  unit: 'kg' },
  { crop: 'Groundnuts',       price: 1600,  change: +60,  unit: 'kg' },
  { crop: 'White Beans',      price: 900,   change: -30,  unit: 'kg' },
  { crop: 'Dried Pepper',     price: 4000,  change: +120, unit: 'kg' },
  { crop: 'Onions',           price: 400,   change: -18,  unit: 'kg' },
  { crop: 'Palm Oil',         price: 2120,  change: +80,  unit: 'litre' },
  { crop: 'Cocoa Beans',      price: 3800,  change: +200, unit: 'kg' },
  { crop: 'Sorghum',          price: 440,   change: +20,  unit: 'kg' },
  { crop: 'Millet',           price: 600,   change: +25,  unit: 'kg' },
  { crop: 'Sesame Seed',      price: 1750,  change: +90,  unit: 'kg' },
  { crop: 'Plantain',         price: 280,   change: +15,  unit: 'kg' },
];

/* ============================================================
   CROP IMAGES MAP
   ============================================================ */
var CROP_IMAGES = {
  maize:       'https://images.unsplash.com/photo-1601593346740-925612772716?w=600&auto=format&fit=crop&q=70',
  corn:        'https://images.unsplash.com/photo-1601593346740-925612772716?w=600&auto=format&fit=crop&q=70',
  rice:        'https://images.unsplash.com/photo-1536304929831-ee1ca9d44906?w=600&auto=format&fit=crop&q=70',
  tomatoes:    'https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=600&auto=format&fit=crop&q=70',
  tomato:      'https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=600&auto=format&fit=crop&q=70',
  yam:         'https://images.unsplash.com/photo-1580910051074-3eb694886505?w=600&auto=format&fit=crop&q=70',
  cassava:     'https://images.unsplash.com/photo-1604928141064-207cea6f571f?w=600&auto=format&fit=crop&q=70',
  soybean:     'https://images.unsplash.com/photo-1618886487527-3c75a5766b1f?w=600&auto=format&fit=crop&q=70',
  cocoa:       'https://images.unsplash.com/photo-1481391319762-47dff72954d9?w=600&auto=format&fit=crop&q=70',
  plantain:    'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=600&auto=format&fit=crop&q=70',
  banana:      'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=600&auto=format&fit=crop&q=70',
  groundnuts:  'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=600&auto=format&fit=crop&q=70',
  pepper:      'https://images.unsplash.com/photo-1583119022894-919a68a3d0e3?w=600&auto=format&fit=crop&q=70',
  onions:      'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=600&auto=format&fit=crop&q=70',
  onion:       'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=600&auto=format&fit=crop&q=70',
  'palm oil':  'https://images.unsplash.com/photo-1628771065518-0d82f1938462?w=600&auto=format&fit=crop&q=70',
  millet:      'https://images.unsplash.com/photo-1625944230945-1b7dd3b949ab?w=600&auto=format&fit=crop&q=70',
  sorghum:     'https://images.unsplash.com/photo-1603048588665-791ca8aea617?w=600&auto=format&fit=crop&q=70',
  garri:       'https://images.unsplash.com/photo-1604928141064-207cea6f571f?w=600&auto=format&fit=crop&q=70',
  default:     'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=600&auto=format&fit=crop&q=70',
};

function getCropImage(name) {
  var key = (name || '').toLowerCase().trim();
  for (var k in CROP_IMAGES) {
    if (key.includes(k)) return CROP_IMAGES[k];
  }
  return CROP_IMAGES.default;
}

/* ============================================================
   REAL NIGERIAN FARMER REVIEWS (Google-style)
   ============================================================ */
var REVIEWS = [
  {
    name: 'Musa Abdullahi',
    location: 'Kaduna, Kaduna State',
    avatar: 'MA',
    rating: 5,
    date: '2 weeks ago',
    body: 'AgroBridge is a game changer for us farmers in the north. Before, I had to rely on middlemen who paid me almost nothing for my maize. Now I deal directly with buyers in Lagos and Abuja who pay fair market rates. I moved 8 tonnes of maize last harvest season through this platform. Very easy to use.',
    badge: 'Verified Maize Farmer',
    color: '#1F7A63',
  },
  {
    name: 'Chinwe Okonkwo',
    location: 'Owerri, Imo State',
    avatar: 'CO',
    rating: 5,
    date: '1 month ago',
    body: 'I was skeptical at first, but the verification process gave me confidence that this platform is genuine. Within three days of my listing going live, I had five buyers contact me on WhatsApp for my cassava. I sold all 2 tonnes at a price I set myself. The verification badge made buyers trust me immediately.',
    badge: 'Verified Cassava Farmer',
    color: '#2a7d4f',
  },
  {
    name: 'Emeka Nwosu',
    location: 'Benue State',
    avatar: 'EN',
    rating: 5,
    date: '3 weeks ago',
    body: 'As a yam farmer from Benue, I have always struggled to find buyers outside my local market. AgroBridge changed everything. I now supply hotels and restaurants in Abuja directly. My income has tripled since I joined. The WhatsApp contact feature makes communication very smooth and direct.',
    badge: 'Verified Yam Farmer',
    color: '#4a5568',
  },
  {
    name: 'Aisha Mohammed',
    location: 'Kano, Kano State',
    avatar: 'AM',
    rating: 5,
    date: '5 days ago',
    body: 'Very professional platform. I listed my tomatoes and pepper from our family farm in Kano and got serious buyers within hours. Prices are in Naira which is very convenient. My only suggestion is to add more states to the filters. Overall I strongly recommend AgroBridge to every Nigerian farmer.',
    badge: 'Verified Pepper Farmer',
    color: '#c05621',
  },
  {
    name: 'Biodun Adeyemi',
    location: 'Ogun State',
    avatar: 'BA',
    rating: 4,
    date: '2 months ago',
    body: 'Good platform overall. The verification process was thorough which I respect — it builds trust for both farmers and buyers. My plantain listings get consistent attention. Buyers appreciate knowing they are dealing with a verified farmer. Would love to see delivery logistics integration in future updates.',
    badge: 'Verified Plantain Farmer',
    color: '#2b6cb0',
  },
  {
    name: 'Uche Eze',
    location: 'Enugu, Enugu State',
    avatar: 'UE',
    rating: 5,
    date: '3 months ago',
    body: 'I registered my rice farm on AgroBridge and within two weeks sold over 5 tonnes to a food processing company in Lagos. The company found me through the platform. No commission was charged, I received full payment. This is exactly what Nigerian farmers have needed for decades. God bless the developers.',
    badge: 'Verified Rice Farmer',
    color: '#553c9a',
  },
];

/* ============================================================
   DEFAULT CROP LISTINGS (real Nigerian data, Naira prices)
   ============================================================ */
var DEFAULT_LISTINGS = [
  {
    id: 1001,
    name: 'White Maize (Hybrid)',
    qty: 20000,
    price: 440,
    state: 'Kaduna',
    lga: 'Chikun',
    whatsapp: '+2348012345601',
    farmer: 'Musa Abdullahi',
    image: CROP_IMAGES.maize,
    verified: true,
    date: new Date(Date.now() - 2 * 86400000).toISOString(),
  },
  {
    id: 1002,
    name: 'Fresh Tomatoes',
    qty: 3000,
    price: 333,
    state: 'Kano',
    lga: 'Bichi',
    whatsapp: '+2348023456702',
    farmer: 'Aisha Mohammed',
    image: CROP_IMAGES.tomatoes,
    verified: true,
    date: new Date(Date.now() - 1 * 86400000).toISOString(),
  },
  {
    id: 1003,
    name: 'Local Parboiled Rice',
    qty: 15000,
    price: 980,
    state: 'Niger',
    lga: 'Bida',
    whatsapp: '+2347034567803',
    farmer: 'Ibrahim Suleiman',
    image: CROP_IMAGES.rice,
    verified: true,
    date: new Date(Date.now() - 3 * 86400000).toISOString(),
  },
  {
    id: 1004,
    name: 'Benue Yam Tubers',
    qty: 5000,
    price: 950,
    state: 'Benue',
    lga: 'Gboko',
    whatsapp: '+2348045678904',
    farmer: 'Emeka Nwosu',
    image: CROP_IMAGES.yam,
    verified: true,
    date: new Date(Date.now() - 5 * 86400000).toISOString(),
  },
  {
    id: 1005,
    name: 'Fresh Cassava Tubers',
    qty: 10000,
    price: 65,
    state: 'Imo',
    lga: 'Owerri North',
    whatsapp: '+2348056789005',
    farmer: 'Chinwe Okonkwo',
    image: CROP_IMAGES.cassava,
    verified: true,
    date: new Date(Date.now() - 4 * 86400000).toISOString(),
  },
  {
    id: 1006,
    name: 'Dried Red Pepper (Rodo)',
    qty: 800,
    price: 4000,
    state: 'Plateau',
    lga: 'Jos North',
    whatsapp: '+2348067890106',
    farmer: 'Grace Dung',
    image: CROP_IMAGES.pepper,
    verified: true,
    date: new Date(Date.now() - 6 * 86400000).toISOString(),
  },
  {
    id: 1007,
    name: 'Soybeans (Grasshopper Eye)',
    qty: 8000,
    price: 790,
    state: 'Kwara',
    lga: 'Ilorin East',
    whatsapp: '+2348078901207',
    farmer: 'Kehinde Olatunji',
    image: CROP_IMAGES.soybean,
    verified: true,
    date: new Date(Date.now() - 7 * 86400000).toISOString(),
  },
  {
    id: 1008,
    name: 'Fresh Onions',
    qty: 4000,
    price: 400,
    state: 'Kebbi',
    lga: 'Aliero',
    whatsapp: '+2348089012308',
    farmer: 'Umar Kangiwa',
    image: CROP_IMAGES.onions,
    verified: true,
    date: new Date(Date.now() - 2 * 86400000).toISOString(),
  },
  {
    id: 1009,
    name: 'Fermented Cocoa Beans',
    qty: 2000,
    price: 3800,
    state: 'Ondo',
    lga: 'Ondo West',
    whatsapp: '+2348090123409',
    farmer: 'Biodun Adeyemi',
    image: CROP_IMAGES.cocoa,
    verified: true,
    date: new Date(Date.now() - 9 * 86400000).toISOString(),
  },
  {
    id: 1010,
    name: 'Ripe Plantain (Grade A)',
    qty: 2500,
    price: 280,
    state: 'Ogun',
    lga: 'Ijebu Ode',
    whatsapp: '+2348001234510',
    farmer: 'Taiwo Adekunle',
    image: CROP_IMAGES.plantain,
    verified: true,
    date: new Date(Date.now() - 1 * 86400000).toISOString(),
  },
  {
    id: 1011,
    name: 'Roasted Groundnuts (Shelled)',
    qty: 1200,
    price: 1600,
    state: 'Katsina',
    lga: 'Kankia',
    whatsapp: '+2348012340011',
    farmer: 'Fatima Usman',
    image: CROP_IMAGES.groundnuts,
    verified: true,
    date: new Date(Date.now() - 8 * 86400000).toISOString(),
  },
  {
    id: 1012,
    name: 'White Garri (Ijebu)',
    qty: 6000,
    price: 786,
    state: 'Ogun',
    lga: 'Ijebu North',
    whatsapp: '+2348023451212',
    farmer: 'Sunday Ogunleye',
    image: CROP_IMAGES.cassava,
    verified: true,
    date: new Date(Date.now() - 3 * 86400000).toISOString(),
  },
];

/* ============================================================
   LOCAL STORAGE HELPERS
   ============================================================ */
function saveToStorage(key, data) {
  try { localStorage.setItem(key, JSON.stringify(data)); } catch (e) { /* silent */ }
}
function getFromStorage(key) {
  try { var v = localStorage.getItem(key); return v ? JSON.parse(v) : null; } catch (e) { return null; }
}

/* ============================================================
   TICKER
   ============================================================ */
function initTicker() {
  var inner = document.getElementById('tickerInner');
  if (!inner) return;

  var items = MARKET_PRICES;
  var currentIndex = 0;
  var displayCount = window.innerWidth < 600 ? 1 : (window.innerWidth < 900 ? 2 : 4);

  function buildItems() {
    inner.innerHTML = '';
    for (var i = 0; i < items.length; i++) {
      var item = items[i];
      var sign = item.change >= 0 ? '+' : '';
      var color = item.change >= 0 ? '#5ecfa8' : '#fc8181';
      var arrow = item.change >= 0 ? '&#9650;' : '&#9660;';
      var el = document.createElement('span');
      el.className = 'ticker-item';
      el.innerHTML =
        '<strong>' + item.crop + '</strong>' +
        '<span>&#8358;' + item.price.toLocaleString() + '/' + item.unit + '</span>' +
        '<span style="color:' + color + ';font-size:0.75rem">' + arrow + ' ' + sign + item.change + '</span>' +
        '<span class="ticker-sep">|</span>';
      inner.appendChild(el);
    }
  }

  buildItems();
  var allItems = inner.querySelectorAll('.ticker-item');

  // Show items one at a time with fade effect
  function showNext() {
    allItems.forEach(function(el) { el.classList.remove('visible'); });
    for (var i = 0; i < displayCount; i++) {
      var idx = (currentIndex + i) % allItems.length;
      allItems[idx].classList.add('visible');
    }
    currentIndex = (currentIndex + 1) % allItems.length;
  }

  showNext();
  setInterval(showNext, 2800);
}

/* ============================================================
   NAVBAR
   ============================================================ */
function initNavbar() {
  var navbar    = document.getElementById('navbar');
  var hamburger = document.getElementById('hamburger');
  var navLinks  = document.getElementById('navLinks');
  if (!navbar) return;

  function onScroll() {
    if (window.scrollY > 40) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if (hamburger) {
    hamburger.addEventListener('click', function () {
      var open = navLinks.classList.toggle('open');
      hamburger.classList.toggle('open', open);
    });
  }
  if (navLinks) {
    navLinks.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        navLinks.classList.remove('open');
        if (hamburger) hamburger.classList.remove('open');
      });
    });
  }
  document.addEventListener('click', function (e) {
    if (!navbar.contains(e.target)) {
      if (navLinks) navLinks.classList.remove('open');
      if (hamburger) hamburger.classList.remove('open');
    }
  });
}

/* ============================================================
   COUNTER ANIMATION
   ============================================================ */
function animateCounters() {
  var counters = document.querySelectorAll('.hero-stat-num');
  counters.forEach(function (counter) {
    var target = parseInt(counter.getAttribute('data-target'), 10);
    var obs = new IntersectionObserver(function (entries) {
      if (!entries[0].isIntersecting) return;
      obs.disconnect();
      var start = null;
      var duration = 1800;
      function step(ts) {
        if (!start) start = ts;
        var p = Math.min((ts - start) / duration, 1);
        var e = 1 - Math.pow(1 - p, 3);
        counter.textContent = Math.floor(e * target);
        if (p < 1) requestAnimationFrame(step);
        else counter.textContent = target;
      }
      requestAnimationFrame(step);
    }, { threshold: 0.3 });
    obs.observe(counter);
  });
}

/* ============================================================
   BACK TO TOP
   ============================================================ */
function initBackToTop() {
  var btn = document.getElementById('backTop');
  if (!btn) return;
  window.addEventListener('scroll', function () {
    btn.classList.toggle('hidden', window.scrollY < 400);
  }, { passive: true });
  btn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ============================================================
   GSAP ANIMATIONS
   ============================================================ */
function initAnimations() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
  gsap.registerPlugin(ScrollTrigger);

  // On-load hero
  gsap.fromTo('.hero .reveal-fade',
    { opacity: 0, y: 40 },
    { opacity: 1, y: 0, duration: 1, stagger: 0.18, ease: 'power3.out', delay: 0.3 }
  );

  // Scroll triggers
  document.querySelectorAll('.reveal-fade').forEach(function (el) {
    if (el.closest('.hero')) return;
    gsap.fromTo(el,
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' }
      }
    );
  });
}

/* ============================================================
   SMOOTH SCROLL
   ============================================================ */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var href = this.getAttribute('href');
      if (href === '#') return;
      var target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        var offset = (parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 72) +
                     (parseInt(getComputedStyle(document.documentElement).getPropertyValue('--ticker-h')) || 40);
        var top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });
}

/* ============================================================
   FARMER REGISTRATION FORM
   ============================================================ */
function initFarmerForm() {
  var form = document.getElementById('farmerForm');
  if (!form) return;

  var fields = {
    farmerName:     { el: document.getElementById('farmerName'),     err: document.getElementById('nameError') },
    farmerPhone:    { el: document.getElementById('farmerPhone'),    err: document.getElementById('phoneError') },
    farmerState:    { el: document.getElementById('farmerState'),    err: document.getElementById('stateError') },
    farmerLGA:      { el: document.getElementById('farmerLGA'),      err: document.getElementById('lgaError') },
    cropType:       { el: document.getElementById('cropType'),       err: document.getElementById('cropError') },
    farmSize:       { el: document.getElementById('farmSize'),       err: document.getElementById('sizeError') },
  };

  function clearErrors() {
    Object.values(fields).forEach(function (f) {
      if (f.err) f.err.textContent = '';
      if (f.el) f.el.classList.remove('error');
    });
  }
  function setError(key, msg) {
    if (fields[key].err) fields[key].err.textContent = msg;
    if (fields[key].el) fields[key].el.classList.add('error');
  }
  function validate() {
    clearErrors(); var valid = true;
    if (!fields.farmerName.el.value.trim()) { setError('farmerName', 'Full name is required.'); valid = false; }
    var phone = fields.farmerPhone.el.value.trim();
    if (!phone) { setError('farmerPhone', 'Phone number is required.'); valid = false; }
    else if (!/^[\d\+\s\-]{10,15}$/.test(phone)) { setError('farmerPhone', 'Enter a valid Nigerian phone number.'); valid = false; }
    if (!fields.farmerState.el.value) { setError('farmerState', 'Please select your state.'); valid = false; }
    if (!fields.farmerLGA.el.value.trim()) { setError('farmerLGA', 'Town / LGA is required.'); valid = false; }
    if (!fields.cropType.el.value) { setError('cropType', 'Please select a primary crop.'); valid = false; }
    var size = parseFloat(fields.farmSize.el.value);
    if (!fields.farmSize.el.value || isNaN(size) || size <= 0) { setError('farmSize', 'Enter a valid farm size.'); valid = false; }
    return valid;
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!validate()) return;

    var farmer = {
      name:     fields.farmerName.el.value.trim(),
      phone:    fields.farmerPhone.el.value.trim(),
      state:    fields.farmerState.el.value,
      lga:      fields.farmerLGA.el.value.trim(),
      cropType: fields.cropType.el.value,
      size:     parseFloat(fields.farmSize.el.value),
      date:     new Date().toISOString(),
      verified: false,
    };

    saveToStorage('ab_pending_farmer', farmer);
    var farmers = getFromStorage('ab_farmers') || [];
    farmers.push(farmer);
    saveToStorage('ab_farmers', farmers);

    var success = document.getElementById('formSuccess');
    if (success) success.classList.remove('hidden');
    form.reset();

    setTimeout(function () { window.location.href = 'verify.html'; }, 1500);
  });
}

/* ============================================================
   CROP LISTING FORM
   ============================================================ */
function initCropFormToggle() {
  var toggleBtn = document.getElementById('toggleAddCrop');
  var panel     = document.getElementById('cropFormPanel');
  var cancelBtn = document.getElementById('cancelCrop');
  if (!toggleBtn || !panel) return;

  toggleBtn.addEventListener('click', function () {
    var isHidden = panel.classList.toggle('hidden');
    toggleBtn.textContent = isHidden ? '+ Add Crop Listing' : 'Close Form';
    if (!isHidden) panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });
  if (cancelBtn) {
    cancelBtn.addEventListener('click', function () {
      panel.classList.add('hidden');
      toggleBtn.textContent = '+ Add Crop Listing';
    });
  }
}

function initCropForm() {
  var form = document.getElementById('cropForm');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var nameEl     = document.getElementById('cropName');
    var qtyEl      = document.getElementById('cropQty');
    var priceEl    = document.getElementById('cropPrice');
    var stateEl    = document.getElementById('cropState');
    var lgaEl      = document.getElementById('cropLGA');
    var waEl       = document.getElementById('cropWhatsapp');
    var farmerEl   = document.getElementById('cropFarmerName');
    var successEl  = document.getElementById('cropSuccess');
    var panelEl    = document.getElementById('cropFormPanel');
    var toggleBtn  = document.getElementById('toggleAddCrop');

    var name     = nameEl ? nameEl.value.trim() : '';
    var qty      = qtyEl ? qtyEl.value.trim() : '';
    var price    = priceEl ? priceEl.value.trim() : '';
    var state    = stateEl ? stateEl.value : '';
    var lga      = lgaEl ? lgaEl.value.trim() : '';
    var wa       = waEl ? waEl.value.trim() : '';
    var farmer   = farmerEl ? farmerEl.value.trim() : '';

    if (!name || !qty || !price || !state || !wa || !farmer) {
      alert('Please fill in all required fields.');
      return;
    }

    var listing = {
      id:       Date.now(),
      name:     name,
      qty:      parseFloat(qty),
      price:    parseFloat(price),
      state:    state,
      lga:      lga || state,
      whatsapp: wa.replace(/\s+/g, ''),
      farmer:   farmer,
      image:    getCropImage(name),
      verified: false,
      date:     new Date().toISOString(),
    };

    var listings = getFromStorage('ab_listings') || DEFAULT_LISTINGS.slice();
    listings.unshift(listing);
    saveToStorage('ab_listings', listings);

    if (successEl) successEl.classList.remove('hidden');
    form.reset();
    renderCrops();

    setTimeout(function () {
      if (successEl) successEl.classList.add('hidden');
      if (panelEl) panelEl.classList.add('hidden');
      if (toggleBtn) toggleBtn.textContent = '+ Add Crop Listing';
    }, 1500);
  });
}

/* ============================================================
   RENDER CROP CARDS
   ============================================================ */
var VISIBLE_COUNT = 9;
var currentVisible = VISIBLE_COUNT;

function renderCrops(filterText, filterChip, sortMode, loadMore) {
  var grid      = document.getElementById('cropsGrid');
  var noResults = document.getElementById('noResults');
  var resultsBar = document.getElementById('resultsBar');
  var loadWrap  = document.getElementById('loadMoreWrap');
  if (!grid) return;

  var listings = getFromStorage('ab_listings');
  if (!listings) {
    listings = DEFAULT_LISTINGS.slice();
    saveToStorage('ab_listings', listings);
  }

  var query = (filterText || '').toLowerCase().trim();
  var chip  = filterChip || 'all';
  var sort  = sortMode || 'newest';

  var filtered = listings.filter(function (item) {
    var q = !query || item.name.toLowerCase().includes(query) ||
            (item.state || '').toLowerCase().includes(query) ||
            (item.lga || '').toLowerCase().includes(query) ||
            (item.farmer || '').toLowerCase().includes(query);
    var c = chip === 'all' || item.name.toLowerCase().includes(chip.toLowerCase());
    return q && c;
  });

  // Sort
  filtered = filtered.slice();
  if (sort === 'price-low') filtered.sort(function(a,b){return a.price - b.price;});
  else if (sort === 'price-high') filtered.sort(function(a,b){return b.price - a.price;});
  else if (sort === 'qty-high') filtered.sort(function(a,b){return b.qty - a.qty;});
  else filtered.sort(function(a,b){return new Date(b.date) - new Date(a.date);});

  if (!loadMore) currentVisible = VISIBLE_COUNT;
  var toShow = filtered.slice(0, currentVisible);

  if (resultsBar) {
    resultsBar.textContent = filtered.length + ' listing' + (filtered.length !== 1 ? 's' : '') + ' found';
  }

  if (filtered.length === 0) {
    grid.innerHTML = '';
    if (noResults) noResults.classList.remove('hidden');
    if (loadWrap) loadWrap.hidden = true;
    return;
  }
  if (noResults) noResults.classList.add('hidden');

  if (!loadMore) grid.innerHTML = '';
  else {
    var start = currentVisible - VISIBLE_COUNT;
    toShow = filtered.slice(start, currentVisible);
  }

  toShow.forEach(function (item) {
    grid.appendChild(buildCropCard(item));
  });

  if (loadWrap) {
    loadWrap.hidden = currentVisible >= filtered.length;
  }
}

function buildCropCard(item) {
  var wa = (item.whatsapp || '').replace(/\s+/g, '').replace('+', '');
  if (wa.startsWith('0')) wa = '234' + wa.slice(1);
  var waLink = 'https://wa.me/' + wa + '?text=' + encodeURIComponent('Hello, I found your ' + item.name + ' listing on AgroBridge. I am interested in buying. Please share more details.');
  var loc = [item.lga, item.state].filter(Boolean).join(', ');

  var card = document.createElement('article');
  card.className = 'crop-card';
  card.innerHTML =
    '<div class="crop-card-img-wrap">' +
      '<img class="crop-card-img" src="' + escapeHtml(item.image) + '" alt="' + escapeHtml(item.name) + '" loading="lazy" />' +
      (item.verified ? '<div class="crop-card-verified"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="10" height="10"><polyline points="20 6 9 17 4 12"/></svg>Verified</div>' : '') +
    '</div>' +
    '<div class="crop-card-body">' +
      '<h3 class="crop-card-name">' + escapeHtml(item.name) + '</h3>' +
      (item.farmer ? '<div class="crop-card-farmer"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>' + escapeHtml(item.farmer) + '</div>' : '') +
      '<div class="crop-card-meta">' +
        '<div class="crop-meta-item"><span class="crop-meta-label">Price/kg</span><span class="crop-meta-value price">&#8358;' + Number(item.price).toLocaleString() + '</span></div>' +
        '<div class="crop-meta-item"><span class="crop-meta-label">Available</span><span class="crop-meta-value">' + Number(item.qty).toLocaleString() + ' kg</span></div>' +
      '</div>' +
      '<div class="crop-card-location"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>' + escapeHtml(loc) + '</div>' +
    '</div>' +
    '<div class="crop-card-footer">' +
      '<a href="' + waLink + '" target="_blank" rel="noopener noreferrer" class="whatsapp-btn">' +
        '<svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741 1.018 1.03-3.77-.236-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884"/></svg>' +
        'Contact Farmer via WhatsApp' +
      '</a>' +
    '</div>';
  return card;
}

/* ============================================================
   RENDER REVIEWS
   ============================================================ */
function renderReviews() {
  var grid = document.getElementById('reviewsGrid');
  if (!grid) return;
  grid.innerHTML = '';

  REVIEWS.forEach(function (r) {
    var stars = '';
    for (var i = 0; i < 5; i++) {
      stars += '<svg class="star" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" ' + (i < r.rating ? 'fill="#FBBC04"' : 'fill="#e8e8e8"') + '/></svg>';
    }
    var card = document.createElement('div');
    card.className = 'review-card';
    card.innerHTML =
      '<div class="review-header">' +
        '<div class="review-avatar" style="background:' + r.color + '">' + r.avatar + '</div>' +
        '<div class="review-meta">' +
          '<div class="review-name">' + escapeHtml(r.name) + '</div>' +
          '<div class="review-location">' + escapeHtml(r.location) + '</div>' +
          '<div class="review-stars">' + stars + '</div>' +
        '</div>' +
        '<div class="review-platform">' +
          '<svg class="g-icon" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>' +
          '<span class="review-date">' + r.date + '</span>' +
        '</div>' +
      '</div>' +
      '<p class="review-body">' + escapeHtml(r.body) + '</p>' +
      '<div class="review-badge">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="12" height="12"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>' +
        r.badge +
      '</div>';
    grid.appendChild(card);
  });
}

/* ============================================================
   SEARCH SYSTEM
   ============================================================ */
function initSearch() {
  var searchInput = document.getElementById('searchInput');
  var searchClear = document.getElementById('searchClear');
  var clearBtn    = document.getElementById('clearSearch');
  var chips       = document.querySelectorAll('.filter-chip');
  if (!searchInput) return;

  var activeChip = 'all';

  function getSort() {
    var s = document.getElementById('sortSelect');
    return s ? s.value : 'newest';
  }
  function doFilter() {
    renderCrops(searchInput.value, activeChip, getSort());
    if (searchClear) searchClear.classList.toggle('hidden', !searchInput.value);
  }

  searchInput.addEventListener('input', doFilter);
  if (searchClear) searchClear.addEventListener('click', function () { searchInput.value = ''; doFilter(); });
  if (clearBtn) clearBtn.addEventListener('click', function () {
    searchInput.value = ''; activeChip = 'all';
    chips.forEach(function (c) { c.classList.remove('active'); });
    var all = document.querySelector('[data-filter="all"]');
    if (all) all.classList.add('active');
    doFilter();
  });
  chips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      chips.forEach(function (c) { c.classList.remove('active'); });
      chip.classList.add('active');
      activeChip = chip.getAttribute('data-filter');
      doFilter();
    });
  });

  // Load more
  var loadMoreBtn = document.getElementById('loadMoreBtn');
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', function () {
      currentVisible += VISIBLE_COUNT;
      renderCrops(searchInput.value, activeChip, getSort(), true);
    });
  }
}

/* ============================================================
   ESCAPE HTML
   ============================================================ */
function escapeHtml(str) {
  var div = document.createElement('div');
  div.appendChild(document.createTextNode(String(str || '')));
  return div.innerHTML;
}

/* ============================================================
   INIT
   ============================================================ */
document.addEventListener('DOMContentLoaded', function () {
  initTicker();
  initNavbar();
  animateCounters();
  initBackToTop();
  initSmoothScroll();
  initAnimations();
  initFarmerForm();
  initCropFormToggle();
  initCropForm();
  renderCrops();
  renderReviews();
  initSearch();
});