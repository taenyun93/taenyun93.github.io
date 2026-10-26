(() => {
  const section = document.getElementById('publications');
  if (!section) return;
  const year = section.querySelector('#publication-year');
  const topic = section.querySelector('#publication-topic');
  const reset = section.querySelector('#publication-reset');
  const rows = [...section.querySelectorAll('.publication-list > li')];
  const count = section.querySelector('#publication-count');
  const empty = section.querySelector('#publication-empty');
  function filter() {
    let visible = 0;
    for (const row of rows) {
      const matches = (!year.value || row.dataset.year === year.value) &&
        (!topic.value || JSON.parse(row.dataset.topics).includes(topic.value));
      row.hidden = !matches;
      if (matches) visible++;
    }
    count.textContent = `Showing ${visible} of ${rows.length} publications`;
    empty.hidden = visible !== 0;
    reset.disabled = !year.value && !topic.value;
  }
  year.addEventListener('change', filter);
  topic.addEventListener('change', filter);
  reset.addEventListener('click', () => {year.value = ''; topic.value = ''; filter();});
  section.querySelector('.publication-filters').hidden = false;
  filter();
})();
