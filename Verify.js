/* ============================================================
   AGROBRIDGE — VERIFY.JS
   Handles all verification page logic and dashboard
   ============================================================ */

'use strict';

var currentStep = 1;
var verifyData  = {};

/* ============================================================
   STEP NAVIGATION
   ============================================================ */
function showStep(n) {
  currentStep = n;
  for (var i = 1; i <= 4; i++) {
    var panel = document.getElementById('step' + i);
    if (panel) panel.classList.toggle('hidden', i !== n);
    var vstep = document.querySelector('[data-step="' + i + '"]');
    if (vstep) {
      vstep.classList.remove('vstep-active', 'vstep-done');
      if (i === n) vstep.classList.add('vstep-active');
      if (i < n)  vstep.classList.add('vstep-done');
    }
  }
  // Update done steps with checkmark
  document.querySelectorAll('.vstep-done .vstep-num').forEach(function (el) {
    el.textContent = '';
    el.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" width="14" height="14"><polyline points="20 6 9 17 4 12"/></svg>';
  });
  document.querySelectorAll('.vstep:not(.vstep-done) .vstep-num').forEach(function (el, idx) {
    el.textContent = idx + 1 <= currentStep ? idx + 1 : el.getAttribute('data-orig') || (idx + 1);
  });
}

/* ============================================================
   PRE-FILL from localStorage
   ============================================================ */
function prefillFromStorage() {
  var farmer = null;
  try { farmer = JSON.parse(localStorage.getItem('ab_pending_farmer')); } catch(e) {}
  if (!farmer) return;

  var nameEl = document.getElementById('ninFullName');
  if (nameEl && farmer.name) nameEl.value = farmer.name.toUpperCase();

  var sidebarName = document.getElementById('sidebarName');
  if (sidebarName && farmer.name) sidebarName.textContent = 'Welcome, ' + farmer.name.split(' ')[0];

  var successName = document.getElementById('successName');
  if (successName && farmer.name) successName.textContent = farmer.name.split(' ')[0];

  var farmStateV = document.getElementById('farmStateV');
  if (farmStateV && farmer.state) farmStateV.value = farmer.state;

  var farmLGA = document.getElementById('farmLGA');
  if (farmLGA && farmer.lga) farmLGA.value = farmer.lga;
}

/* ============================================================
   FILE UPLOAD PREVIEW
   ============================================================ */
function initFilePreview(inputId, previewId, zoneId) {
  var input   = document.getElementById(inputId);
  var preview = document.getElementById(previewId);
  var zone    = document.getElementById(zoneId);
  if (!input || !preview) return;

  input.addEventListener('change', function () {
    var file = this.files[0];
    if (!file) return;
    var reader = new FileReader();
    reader.onload = function (e) {
      preview.innerHTML = '<img src="' + e.target.result + '" alt="Preview" style="width:100%;height:100%;object-fit:cover;border-radius:6px;" />';
      preview.classList.remove('hidden');
      if (zone) zone.style.border = '2px solid var(--green)';
    };
    reader.readAsDataURL(file);
  });
}

/* ============================================================
   STEP 1 — NIN
   ============================================================ */
function initStep1() {
  var form = document.getElementById('ninForm');
  if (!form) return;

  initFilePreview('ninSelfie', 'selfiePreview', 'selfieZone');

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var nin     = document.getElementById('ninNumber').value.trim();
    var name    = document.getElementById('ninFullName').value.trim();
    var dob     = document.getElementById('ninDOB').value;
    var gender  = document.getElementById('ninGender').value;
    var ninErr  = document.getElementById('ninError');
    var nameErr = document.getElementById('ninNameError');
    var dobErr  = document.getElementById('ninDOBError');
    var gendErr = document.getElementById('ninGenderError');

    var valid = true;
    if (ninErr)  ninErr.textContent = '';
    if (nameErr) nameErr.textContent = '';
    if (dobErr)  dobErr.textContent = '';
    if (gendErr) gendErr.textContent = '';

    if (!nin || nin.length !== 11 || !/^\d{11}$/.test(nin)) {
      if (ninErr) ninErr.textContent = 'NIN must be exactly 11 digits.';
      document.getElementById('ninNumber').classList.add('error');
      valid = false;
    } else {
      document.getElementById('ninNumber').classList.remove('error');
    }
    if (!name) {
      if (nameErr) nameErr.textContent = 'Full name as on NIN is required.';
      document.getElementById('ninFullName').classList.add('error');
      valid = false;
    }
    if (!dob) {
      if (dobErr) dobErr.textContent = 'Date of birth is required.';
      valid = false;
    }
    if (!gender) {
      if (gendErr) gendErr.textContent = 'Please select your gender.';
      valid = false;
    }
    if (!valid) return;

    verifyData.nin    = nin;
    verifyData.name   = name;
    verifyData.dob    = dob;
    verifyData.gender = gender;

    showStep(2);
    document.querySelector('.verify-main').scrollTop = 0;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ============================================================
   STEP 2 — Farm Location
   ============================================================ */
function initStep2() {
  var form = document.getElementById('locationForm');
  var back = document.getElementById('backToStep1');
  if (!form) return;
  if (back) back.addEventListener('click', function () { showStep(1); });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var address = document.getElementById('farmAddress').value.trim();
    var state   = document.getElementById('farmStateV').value;
    var lga     = document.getElementById('farmLGA').value.trim();
    var addErr  = document.getElementById('farmAddressError');
    var stErr   = document.getElementById('farmStateVError');
    var lgaErr  = document.getElementById('farmLGAError');

    var valid = true;
    if (addErr) addErr.textContent = '';
    if (stErr)  stErr.textContent = '';
    if (lgaErr) lgaErr.textContent = '';

    if (!address) {
      if (addErr) addErr.textContent = 'Farm address is required.';
      valid = false;
    }
    if (!state) {
      if (stErr) stErr.textContent = 'Please select your state.';
      valid = false;
    }
    if (!lga) {
      if (lgaErr) lgaErr.textContent = 'LGA is required.';
      valid = false;
    }
    if (!valid) return;

    verifyData.farmAddress = address;
    verifyData.farmState   = state;
    verifyData.farmLGA     = lga;
    verifyData.farmSize    = document.getElementById('farmSizeV').value;
    verifyData.farmType    = document.getElementById('farmType').value;

    showStep(3);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ============================================================
   STEP 3 — Photos
   ============================================================ */
function initStep3() {
  var form = document.getElementById('photosForm');
  var back = document.getElementById('backToStep2');
  if (!form) return;
  if (back) back.addEventListener('click', function () { showStep(2); });

  initFilePreview('farmPhoto1', 'preview1', 'farmPhoto1Zone');
  initFilePreview('farmPhoto2', 'preview2', 'farmPhoto2Zone');
  initFilePreview('farmPhoto3', 'preview3', 'farmPhoto3Zone');
  initFilePreview('farmPhoto4', 'preview4', 'farmPhoto4Zone');

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    verifyData.cropDescription = document.getElementById('cropDescription').value.trim();
    showStep(4);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ============================================================
   STEP 4 — Bank + Submit
   ============================================================ */
function initStep4() {
  var form = document.getElementById('bankForm');
  var back = document.getElementById('backToStep3');
  if (!form) return;
  if (back) back.addEventListener('click', function () { showStep(3); });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var bank    = document.getElementById('bankName').value;
    var accNum  = document.getElementById('accountNumber').value.trim();
    var accName = document.getElementById('accountName').value.trim();
    var consent = document.getElementById('consentCheck').checked;
    var bErr    = document.getElementById('bankNameError');
    var aErr    = document.getElementById('accountNumberError');
    var anErr   = document.getElementById('accountNameError');
    var cErr    = document.getElementById('consentError');

    var valid = true;
    if (bErr)  bErr.textContent = '';
    if (aErr)  aErr.textContent = '';
    if (anErr) anErr.textContent = '';
    if (cErr)  cErr.textContent = '';

    if (!bank) { if (bErr) bErr.textContent = 'Please select your bank.'; valid = false; }
    if (!accNum || accNum.length !== 10 || !/^\d{10}$/.test(accNum)) {
      if (aErr) aErr.textContent = 'Account number must be 10 digits.';
      document.getElementById('accountNumber').classList.add('error');
      valid = false;
    }
    if (!accName) { if (anErr) anErr.textContent = 'Account name is required.'; valid = false; }
    if (!consent) { if (cErr) cErr.textContent = 'You must confirm the accuracy of your information.'; valid = false; }
    if (!valid) return;

    verifyData.bank        = bank;
    verifyData.accountNum  = accNum;
    verifyData.accountName = accName;
    verifyData.submitTime  = new Date().toISOString();

    // Save full verification data
    try { localStorage.setItem('ab_verify_data', JSON.stringify(verifyData)); } catch (err) {}

    // Update farmer status in storage
    updateFarmerStatus();

    // Show success
    showSuccess();
  });
}

/* ============================================================
   UPDATE FARMER STATUS
   ============================================================ */
function updateFarmerStatus() {
  var farmers = [];
  try { farmers = JSON.parse(localStorage.getItem('ab_farmers')) || []; } catch (e) {}
  if (farmers.length > 0) {
    farmers[farmers.length - 1].verificationSubmitted = true;
    farmers[farmers.length - 1].status = 'pending';
    try { localStorage.setItem('ab_farmers', JSON.stringify(farmers)); } catch (e) {}
  }
}

/* ============================================================
   SHOW SUCCESS STATE
   ============================================================ */
function showSuccess() {
  for (var i = 1; i <= 4; i++) {
    var p = document.getElementById('step' + i);
    if (p) p.classList.add('hidden');
  }
  var successEl = document.getElementById('verifySuccess');
  if (successEl) successEl.classList.remove('hidden');

  var banner = document.getElementById('pendingBanner');
  if (banner) banner.classList.remove('hidden');

  var nameEl = document.getElementById('successName');
  if (nameEl) {
    var n = (verifyData.name || '').split(' ')[0];
    if (n) nameEl.textContent = n;
  }

  var timeEl = document.getElementById('submitTime');
  if (timeEl) {
    var now = new Date();
    timeEl.textContent = now.toLocaleDateString('en-NG', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) +
                         ' at ' + now.toLocaleTimeString('en-NG', { hour: '2-digit', minute: '2-digit' });
  }

  // Update step nav
  document.querySelectorAll('.vstep').forEach(function (el) {
    el.classList.remove('vstep-active');
    el.classList.add('vstep-done');
  });

  // Show dashboard
  showDashboard();

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ============================================================
   FARMER DASHBOARD
   ============================================================ */
function showDashboard() {
  var dash = document.getElementById('farmerDashboard');
  if (!dash) return;
  dash.classList.remove('hidden');

  var farmer = null;
  try { farmer = JSON.parse(localStorage.getItem('ab_pending_farmer')); } catch (e) {}
  if (!farmer) return;

  function set(id, val) {
    var el = document.getElementById(id);
    if (el) el.textContent = val || '—';
  }

  set('dashName', farmer.name);
  set('dashPhone', farmer.phone);
  set('dashLocation', [farmer.lga, farmer.state].filter(Boolean).join(', '));
  set('dashCrop', farmer.cropType);
  set('dashSize', farmer.size + ' acres');

  var statusEl = document.getElementById('dashStatus');
  var statusBar = document.getElementById('dashboardStatus');
  if (statusEl) { statusEl.textContent = 'Verification Pending — Under Review'; statusEl.style.color = '#d69e2e'; }
  if (statusBar) { statusBar.textContent = 'Pending Verification'; statusBar.className = 'dashboard-status status-pending'; }
}

/* ============================================================
   INIT
   ============================================================ */
document.addEventListener('DOMContentLoaded', function () {
  prefillFromStorage();
  showStep(1);
  initStep1();
  initStep2();
  initStep3();
  initStep4();

  // Store original step numbers
  document.querySelectorAll('.vstep-num').forEach(function (el, idx) {
    el.setAttribute('data-orig', idx + 1);
  });
});