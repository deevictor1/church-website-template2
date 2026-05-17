const CAT_ICONS = {
    'Worship': 'fa-music',
    'Bible Study': 'fa-book-open',
    'Outreach': 'fa-hands-helping',
    'Special': 'fa-star',
    'Youth': 'fa-fire',
    'Prayer': 'fa-praying-hands',
    'Children': 'fa-children',
    'default': 'fa-calendar'
};

function renderEvents(data) {
    const grid = document.getElementById('events-grid');
    if (!grid) return;

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    today.setDate(today.getDate() - 7);

    const events = data
        .filter(e => new Date(e.date + 'T00:00:00') >= today)
        .sort((a, b) => new Date(a.date) - new Date(b.date));

    if (!events.length) {
        grid.innerHTML = '<div class="no-events"><i class="fa-regular fa-calendar" style="font-size:2rem;display:block;margin-bottom:12px;color:var(--border)"></i><p>No upcoming events at this time. Check back soon!</p></div>';
        return;
    }

    grid.innerHTML = events.map(e => {
        const d = new Date(e.date + 'T00:00:00');
        const dateStr = d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
        const icon = CAT_ICONS[e.category] || CAT_ICONS.default;
        return `<div class="event-card" data-category="${e.category || ''}">
            <div class="event-card-accent"></div>
            <div class="event-card-body">
                <span class="event-category-badge"><i class="fa-solid ${icon}"></i> ${e.category || 'Event'}</span>
                <div class="event-title">${e.title}</div>
                <div class="event-meta">
                    <span class="event-meta-item"><i class="fa-regular fa-calendar"></i> ${dateStr}</span>
                    <span class="event-meta-item"><i class="fa-regular fa-clock"></i> ${e.time}</span>
                </div>
                <p class="event-desc">${e.description}</p>
            </div>
        </div>`;
    }).join('');
}

function loadEvents() {
    fetch('./events.json?v=' + Date.now())
        .then(r => r.json())
        .then(data => renderEvents(data))
        .catch(() => {
            const grid = document.getElementById('events-grid');
            if (grid) {
                grid.innerHTML = '<div class="no-events"><p>Unable to load events. Please check back soon.</p></div>';
            }
        });
}
