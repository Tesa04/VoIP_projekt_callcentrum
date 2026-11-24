document.addEventListener('DOMContentLoaded', () => {
  // 1. Generic tab switcher (supports multiple independent tab groups)
  document.querySelectorAll('[data-tab-group]').forEach(group => {
    const buttons = group.querySelectorAll('.tab-btn');
    const panels = group.querySelectorAll('.tab-panel');
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.dataset.tab;
        buttons.forEach(b => b.classList.toggle('active', b === btn));
        panels.forEach(p => p.classList.toggle('active', p.dataset.panel === target));
      });
    });
  });

  // 2. Copy code buttons
  document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const pre = btn.closest('.code-card').querySelector('pre');
      if (!pre) return;
      navigator.clipboard.writeText(pre.innerText).then(() => {
        const orig = btn.textContent;
        btn.textContent = 'Zkopírováno ✓';
        setTimeout(() => { btn.textContent = orig; }, 1600);
      });
    });
  });

  // 3. Interactive filter for detail calls table
  const filterBtns = document.querySelectorAll('.filter-btn');
  const rows = document.querySelectorAll('#detail-table tbody tr');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const cat = btn.dataset.filter;
      filterBtns.forEach(b => b.classList.toggle('active', b === btn));
      rows.forEach(tr => {
        if (cat === 'all' || tr.dataset.cat === cat) {
          tr.style.display = '';
        } else {
          tr.style.display = 'none';
        }
      });
    });
  });

  // 4. Lightbox zoom for charts
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  document.querySelectorAll('.chart-img-wrap img').forEach(img => {
    img.addEventListener('click', () => {
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      lightbox.classList.add('open');
    });
  });
  lightbox.addEventListener('click', () => lightbox.classList.remove('open'));
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') lightbox.classList.remove('open');
  });

  // 5. Highlight active nav link on scroll
  const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');
  const onScroll = () => {
    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 110) {
        current = sec.id;
      }
    });
    navLinks.forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === '#' + current);
    });
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
});
