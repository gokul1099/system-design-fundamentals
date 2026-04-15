
// script.js — search, filter, and navigation helpers

// ── INDEX PAGE ──────────────────────────────────────────────

function initIndex() {
  const searchInput = document.getElementById('search-input');
  const filterTabs  = document.querySelectorAll('.filter-tab');
  const cards       = document.querySelectorAll('.topic-card');
  const noResults   = document.getElementById('no-results');

  let activeGroup = 'all';
  let searchQuery = '';

  function applyFilters() {
    let visible = 0;

    cards.forEach(card => {
      const groupMatch  = activeGroup === 'all' || card.dataset.group === activeGroup;
      const searchMatch = searchQuery === '' ||
        card.dataset.title.includes(searchQuery) ||
        card.dataset.desc.includes(searchQuery) ||
        card.dataset.tags.includes(searchQuery);

      if (groupMatch && searchMatch) {
        card.classList.remove('hidden');
        visible++;
      } else {
        card.classList.add('hidden');
      }
    });

    // Hide section headers with no visible cards
    document.querySelectorAll('.section-group').forEach(grp => {
      const anyVisible = grp.querySelectorAll('.topic-card:not(.hidden)').length > 0;
      grp.classList.toggle('hidden', !anyVisible);
    });

    if (noResults) noResults.style.display = visible === 0 ? 'block' : 'none';
  }

  if (searchInput) {
    searchInput.addEventListener('input', e => {
      searchQuery = e.target.value.toLowerCase().trim();
      applyFilters();
    });
  }

  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      activeGroup = tab.dataset.group;
      applyFilters();
    });
  });
}


// ── TOPIC PAGE ──────────────────────────────────────────────

function initTopic() {
  // Nothing needed for now — nav buttons are plain anchor links
}


// ── INIT ────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('search-input'))   initIndex();
  if (document.querySelector('.topic-content'))  initTopic();
});
