// ===== NAV SCROLL BEHAVIOR =====
let nav, banner;

function updateNav() {
    if (!nav || !banner) return;
    const bannerH = banner.classList.contains('visible') ? banner.offsetHeight : 0;
    nav.style.top = bannerH + 'px';
    if (document.body.classList.contains('inner-page') || window.scrollY > 60) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
}

function toggleMobileMenu() {
    document.getElementById('mobile-menu').classList.toggle('open');
}

function closeMobileMenu() {
    document.getElementById('mobile-menu').classList.remove('open');
}

// ===== MAP EMBED =====
function isValidMapEmbedUrl(url) {
    if (!url || typeof url !== 'string') return false;
    if (/PASTE_YOUR|YOUR_|placeholder|example\.com/i.test(url)) return false;
    try {
        const host = new URL(url).hostname;
        return host.includes('google.') && url.includes('/maps');
    } catch {
        return false;
    }
}

function buildMapEmbedFromAddress(c) {
    const parts = [c.address, c.addressLine2, c.city, c.state].filter(Boolean);
    if (!parts.length) return null;
    const q = encodeURIComponent(parts.join(', '));
    return `https://maps.google.com/maps?q=${q}&hl=en&z=16&output=embed`;
}

function getMapEmbedUrl(c) {
    const custom = c.maps?.embedUrl;
    if (isValidMapEmbedUrl(custom)) return custom;
    return buildMapEmbedFromAddress(c);
}

// ===== CONFIG =====
function applyConfig(c) {
    const set = (id, val) => { const el = document.getElementById(id); if (el && val) el.textContent = val; };
    const setHref = (id, val) => { const el = document.getElementById(id); if (el && val) el.href = val; };
    const setHTML = (id, val) => { const el = document.getElementById(id); if (el && val) el.innerHTML = val; };

    const pageTitles = { sermons: 'Sermons', events: 'Events', ministries: 'Ministries', contact: 'Contact' };
    const page = document.body.dataset.page || 'home';
    const church = c.churchName || 'Church';
    if (page !== 'home' && pageTitles[page]) {
        document.title = pageTitles[page] + ' | ' + church;
    } else {
        document.title = church + (c.city ? ' | ' + c.city + ', ' + (c.state || '') : '');
    }

    set('cfg-nav-name', c.churchName);
    setHTML('cfg-hero-title', (c.churchName || 'Your Church').replace(' ', '<br>'));
    set('cfg-tagline', c.tagline);
    set('cfg-about-name', c.churchName);

    if (c.services && c.services[0]) {
        set('cfg-s1-day', c.services[0].day + ' Worship');
        set('cfg-s1-time', c.services[0].time);
    }
    if (c.services && c.services[1]) {
        set('cfg-s2-day', c.services[1].day + ' Night');
        set('cfg-s2-time', c.services[1].time);
    }

    set('cfg-addr-short', c.address);
    set('cfg-city-state', (c.city || '') + ', ' + (c.state || ''));

    if (c.address) {
        setHTML('cfg-addr-full', (c.address || '') + '<br>' + (c.addressLine2 || ''));
        setHTML('cfg-footer-addr', (c.address || '') + '<br>' + (c.city || '') + ', ' + (c.state || ''));
        setHTML('cfg-contact-addr', (c.address || '') + '<br>' + (c.addressLine2 || ''));
    }

    if (c.services) {
        const times = c.services.map(s => s.day + ': ' + s.time).join(' &bull; ');
        setHTML('cfg-service-times', times);
        setHTML('cfg-contact-times', c.services.map(s => s.day + ': ' + s.time).join('<br>'));
        const ftEl = document.getElementById('cfg-footer-times');
        if (ftEl) ftEl.innerHTML = c.services.map(s => s.day.slice(0, 3) + ' ' + s.time).join(' &bull; ');
    }

    const mapUrl = getMapEmbedUrl(c);
    if (mapUrl) {
        const map = document.getElementById('cfg-map');
        if (map) map.src = mapUrl;
    }

    if (c.giving && c.giving.url) {
        setHref('cfg-give-btn', c.giving.url);
        document.querySelectorAll('[data-give-link]').forEach(el => { el.href = c.giving.url; });
    }

    if (c.email) {
        ['cfg-email', 'cfg-footer-email'].forEach(id => {
            const el = document.getElementById(id);
            if (el) { el.href = 'mailto:' + c.email; el.textContent = c.email; }
        });
    }
    if (c.phone) {
        const phoneEl = document.getElementById('cfg-phone');
        if (phoneEl) {
            phoneEl.href = 'tel:' + c.phone.replace(/\D/g, '');
            phoneEl.textContent = c.phone;
        }
    }

    if (c.social) {
        ['cfg-fb', 'cfg-contact-fb'].forEach(id => setHref(id, c.social.facebook));
        ['cfg-ig', 'cfg-contact-ig'].forEach(id => setHref(id, c.social.instagram));
        ['cfg-yt', 'cfg-contact-yt', 'cfg-yt-link'].forEach(id => setHref(id, c.social.youtube));
    }

    set('cfg-copy-name', c.churchName);
    set('cfg-copy-year', new Date().getFullYear().toString());

    if (c.city) {
        const location = [c.city, c.state].filter(Boolean).join(', ');
        set('cfg-est-badge', location);
    }

    if (c.churchName && c.city) {
        const fbEl = document.getElementById('cfg-footer-brand');
        if (fbEl) {
            fbEl.textContent = 'A Spirit-filled community in the heart of ' + c.city + ', ' + (c.state || '') + '. Everyone is welcome at the table.';
        }
    }
}

function loadConfig() {
    fetch('./config.json?v=' + Date.now())
        .then(r => r.json())
        .then(c => applyConfig(c))
        .catch(() => console.warn('config.json not found - using default content'));
}

function loadAnnouncement() {
    fetch('./announcements.json?v=' + Date.now())
        .then(r => r.json())
        .then(data => {
            if (data && data.active && data.text) {
                document.getElementById('announcement-text').innerHTML = data.text;
                banner.classList.add('visible');
                updateNav();
            }
        })
        .catch(() => {});
}

function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });
    document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right').forEach(el => observer.observe(el));
}

function initSite() {
    nav = document.getElementById('main-nav');
    banner = document.getElementById('announcement-banner');
    window.addEventListener('scroll', updateNav);
    updateNav();
    loadConfig();
    loadAnnouncement();
    initScrollAnimations();
}

document.addEventListener('DOMContentLoaded', () => {
    const page = document.body.dataset.page || 'home';
    if (page !== 'home') document.body.classList.add('inner-page');
    initLayout(page);
    initSite();
    if (document.getElementById('events-grid')) loadEvents();
    if (document.getElementById('sermon-embed-container')) loadSermons();
});
