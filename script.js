// Mobile nav toggle
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    navToggle.classList.toggle('open');
  });
  navLinks.querySelectorAll('a:not(.dropdown-trigger)').forEach(a => {
    a.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.classList.remove('open');
    });
  });
}

// Dropdown menu (Resources)
document.querySelectorAll('.has-dropdown').forEach(item => {
  const trigger = item.querySelector('.dropdown-trigger');
  if (!trigger) return;
  trigger.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.has-dropdown.open').forEach(other => {
      if (other !== item) other.classList.remove('open');
    });
    item.classList.toggle('open', !isOpen);
  });
});

// Close dropdown when clicking outside
document.addEventListener('click', (e) => {
  document.querySelectorAll('.has-dropdown.open').forEach(item => {
    if (!item.contains(e.target)) item.classList.remove('open');
  });
});

// Mark active nav link (including dropdown items and the dropdown trigger itself)
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a:not(.dropdown-trigger)').forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentPage || (currentPage === '' && href === 'index.html')) {
    link.classList.add('active');
    const parentDropdown = link.closest('.has-dropdown');
    if (parentDropdown) {
      const trigger = parentDropdown.querySelector('.dropdown-trigger');
      if (trigger) trigger.classList.add('active');
    }
  }
});

// Scroll-reveal for elements marked .fade-up
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
} else {
  document.querySelectorAll('.fade-up').forEach(el => el.classList.add('in-view'));
}
