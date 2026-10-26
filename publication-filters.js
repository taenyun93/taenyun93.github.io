(() => {
  const section = document.getElementById('publications');
  if (!section) return;
  const rows = [...section.querySelectorAll('.publication-list > li')];
  const controls = section.querySelector('.publication-filters');
  const count = section.querySelector('#publication-count');
  const empty = section.querySelector('#publication-empty');
  const selected = new Set();
  const topics = [...new Set(rows.flatMap(row => JSON.parse(row.dataset.topics)))].sort();
  controls.replaceChildren();
  const fieldset = document.createElement('fieldset');
  fieldset.className = 'topic-picker';
  const legend = document.createElement('legend');
  legend.textContent = 'Research topics';
  fieldset.append(legend);
  const hint = document.createElement('p');
  hint.className = 'topic-hint';
  hint.textContent = 'Select one or more topics. Papers matching any selected topic are shown.';
  fieldset.append(hint);
  const bubbles = document.createElement('div');
  bubbles.className = 'topic-bubbles';
  const buttons = [];
  function bubble(label, value) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'topic-bubble';
    button.textContent = label;
    button.setAttribute('aria-pressed', String(value === null));
    button.addEventListener('click', () => {
      if (value === null) selected.clear();
      else if (selected.has(value)) selected.delete(value);
      else selected.add(value);
      filter();
    });
    bubbles.append(button);
    buttons.push({button, value});
  }
  bubble('All topics', null);
  topics.forEach(topic => bubble(topic, topic));
  fieldset.append(bubbles);
  controls.append(fieldset);
  const originalList = section.querySelector('.publication-list');
  const groups = [];
  const years = [...new Set(rows.map(row => row.dataset.year))].sort((a,b) => Number(b)-Number(a));
  for (const year of years) {
    const details = document.createElement('details');
    details.className = 'publication-year-group';
    details.open = true;
    const summary = document.createElement('summary');
    const heading = document.createElement('h3');
    heading.textContent = year;
    const badge = document.createElement('span');
    badge.className = 'year-count';
    summary.append(heading, badge);
    const list = document.createElement('ol');
    list.className = 'publication-list';
    const members = rows.filter(row => row.dataset.year === year);
    members.forEach(row => list.append(row));
    details.append(summary, list);
    originalList.before(details);
    groups.push({details, badge, members});
  }
  originalList.remove();
  function filter() {
    let visible = 0;
    rows.forEach(row => {
      const matches = !selected.size || JSON.parse(row.dataset.topics).some(topic => selected.has(topic));
      row.hidden = !matches;
      if (matches) visible++;
    });
    groups.forEach(({details, badge, members}) => {
      const n = members.filter(row => !row.hidden).length;
      details.hidden = n === 0;
      badge.textContent = n + (n === 1 ? ' publication' : ' publications');
    });
    buttons.forEach(({button,value}) => button.setAttribute('aria-pressed', String(value === null ? selected.size === 0 : selected.has(value))));
    count.textContent = 'Showing ' + visible + ' of ' + rows.length + ' publications';
    empty.hidden = visible !== 0;
  }
  controls.hidden = false;
  filter();
})();
