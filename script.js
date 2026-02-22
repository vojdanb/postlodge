// ===== PAGE NAVIGATION =====
function showPage(page) {
  document.querySelectorAll('.page').forEach(function(p) { p.classList.remove('active'); });
  var el = document.getElementById('page-' + page);
  if (el) el.classList.add('active');
  document.querySelectorAll('.nav-links a').forEach(function(a) { a.classList.remove('active'); });
  var navEl = document.getElementById('nav-' + page);
  if (navEl) navEl.classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
  var titles = {
    home: 'PostLodge — Stop Buying Attention. Start Earning It.',
    about: 'About — PostLodge',
    services: 'Services — PostLodge',
    pricing: 'Pricing — PostLodge'
  };
  document.title = titles[page] || titles.home;
}

// ===== MOBILE MENU =====
function toggleMobile() {
  document.getElementById('mobileMenu').classList.toggle('open');
}

// ===== FAQ ACCORDION =====
function toggleFaq(id) {
  var item = document.getElementById(id);
  var answer = document.getElementById(id + '-answer');
  var isOpen = item.classList.contains('open');
  item.closest('.faq-list').querySelectorAll('.faq-item').forEach(function(i) {
    i.classList.remove('open');
    var a = i.querySelector('.faq-answer');
    if (a) a.style.maxHeight = '0';
  });
  if (!isOpen) {
    item.classList.add('open');
    answer.style.maxHeight = answer.scrollHeight + 'px';
  }
}

// ===== BILLING TOGGLE =====
var isAnnual = false;
function toggleBilling() {
  isAnnual = !isAnnual;
  var toggle = document.getElementById('billingToggle');
  var mLabel = document.getElementById('toggle-monthly');
  var aLabel = document.getElementById('toggle-annual');
  toggle.classList.toggle('on', isAnnual);
  mLabel.classList.toggle('active', !isAnnual);
  aLabel.classList.toggle('active', isAnnual);
  document.getElementById('connector-price').textContent = isAnnual ? '$41' : '$49';
  document.getElementById('connector-annual').innerHTML = isAnnual
    ? '<s>$588/yr</s> <strong>$490/yr — save $98</strong>'
    : '&nbsp;';
  document.getElementById('leader-price').textContent = isAnnual ? '$24' : '$29';
  document.getElementById('leader-annual').innerHTML = isAnnual
    ? '<s>$348/yr</s> <strong>$290/yr — save $58</strong>'
    : '&nbsp;';
}

// ===== FREE POST GENERATOR =====
function handleGenerate() {
  var btn = document.getElementById('generateBtn');
  var campaign = document.getElementById('campaignInput').value.trim();
  if (!campaign) {
    document.getElementById('campaignInput').focus();
    document.getElementById('campaignInput').style.borderColor = '#ef4444';
    setTimeout(function() {
      document.getElementById('campaignInput').style.borderColor = '#e5e7eb';
    }, 2000);
    return;
  }
  btn.classList.add('loading');
  setTimeout(function() {
    btn.classList.remove('loading');
    var voice = document.getElementById('voiceSelect').value;
    var voiceMap = {
      'Founder':           { name: 'Vojdan M.', title: 'Founder at PostLodge • 1st',          letter: 'V' },
      'Head of Marketing': { name: 'Sarah K.',  title: 'Head of Marketing • 1st',             letter: 'S' },
      'AE':                { name: 'James R.',  title: 'Account Executive • 1st',             letter: 'J' },
      'SDR':               { name: 'Priya T.',  title: 'Sales Development Rep • 1st',         letter: 'P' },
      'CSM':               { name: 'Alex M.',   title: 'Customer Success Manager • 1st',      letter: 'A' }
    };
    var v = voiceMap[voice] || voiceMap['Founder'];
    document.getElementById('postAvatar').textContent = v.letter;
    document.getElementById('postName').textContent = v.name;
    document.getElementById('postTitle').textContent = v.title;
    document.getElementById('postModal').classList.add('open');
    document.body.style.overflow = 'hidden';
  }, 1500);
}

function closeModal() {
  document.getElementById('postModal').classList.remove('open');
  document.body.style.overflow = '';
}

function handleModalClick(e) {
  if (e.target === document.getElementById('postModal')) closeModal();
}

// Close modal on Escape
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') closeModal();
});
