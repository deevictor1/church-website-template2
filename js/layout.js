/**
 * Shared navigation and footer for all public pages.
 * @param {string} activePage - 'home' | 'sermons' | 'events' | 'ministries' | 'contact'
 */
function initLayout(activePage) {
    const isHome = activePage === 'home';
    const homePrefix = isHome ? '' : 'index.html';

    const navLink = (page, hash, label) => {
        const href = page === 'home' ? `${homePrefix}${hash}` : `${page}.html`;
        const active = activePage === page ? ' class="active"' : '';
        return `<li><a href="${href}"${active}>${label}</a></li>`;
    };

    const headerHtml = [
        '<div id="announcement-banner">',
        '<span id="announcement-text"></span>',
        '<button class="banner-close" type="button" onclick="document.getElementById(\'announcement-banner\').style.display=\'none\'" aria-label="Close announcement">&times;</button>',
        '</div>',
        '<nav id="main-nav">',
        '<div class="nav-inner">',
        '<a href="index.html" class="nav-logo">',
        '<img src="logo 2.png" alt="Church Logo">',
        '<span id="cfg-nav-name">Your Church Name</span>',
        '</a>',
        '<ul class="nav-links">',
        navLink('home', '#about', 'About'),
        navLink('home', '#services', 'Services'),
        navLink('sermons', '', 'Sermons'),
        navLink('events', '', 'Events'),
        navLink('ministries', '', 'Ministries'),
        navLink('contact', '', 'Contact'),
        `<li><a href="${homePrefix}#give" class="nav-give-btn">Give</a></li>`,
        '</ul>',
        '<button class="nav-hamburger" id="hamburger" type="button" aria-label="Open menu" onclick="toggleMobileMenu()">',
        '<span></span><span></span><span></span>',
        '</button>',
        '</div>',
        '</nav>',
        '<div class="mobile-menu" id="mobile-menu">',
        `<a href="${homePrefix}#about" onclick="closeMobileMenu()">About</a>`,
        `<a href="${homePrefix}#services" onclick="closeMobileMenu()">Services</a>`,
        '<a href="sermons.html" onclick="closeMobileMenu()">Sermons</a>',
        '<a href="events.html" onclick="closeMobileMenu()">Events</a>',
        '<a href="ministries.html" onclick="closeMobileMenu()">Ministries</a>',
        '<a href="contact.html" onclick="closeMobileMenu()">Contact</a>',
        `<a href="${homePrefix}#give" onclick="closeMobileMenu()" style="color:var(--gold);font-weight:700;">Give Online</a>`,
        '</div>'
    ].join('');

    const footerHtml = [
        '<footer class="site-footer">',
        '<div class="footer-grid">',
        '<div class="footer-brand">',
        '<img src="logo 2.png" alt="Church Logo">',
        '<p id="cfg-footer-brand">A Spirit-filled community. Everyone is welcome at the table.</p>',
        '<div class="footer-social">',
        '<a id="cfg-fb" href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><i class="fa-brands fa-facebook-f"></i></a>',
        '<a id="cfg-ig" href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><i class="fa-brands fa-instagram"></i></a>',
        '<a id="cfg-yt" href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube"><i class="fa-brands fa-youtube"></i></a>',
        '</div>',
        '</div>',
        '<div class="footer-col">',
        '<h4>Quick Links</h4>',
        '<ul>',
        `<li><a href="${homePrefix}#about">About Us</a></li>`,
        `<li><a href="${homePrefix}#services">Service Times</a></li>`,
        `<li><a href="${homePrefix}#plan-visit">Plan a Visit</a></li>`,
        '<li><a href="ministries.html">Ministries</a></li>',
        '<li><a href="events.html">Events</a></li>',
        '<li><a href="sermons.html">Sermons</a></li>',
        '</ul>',
        '</div>',
        '<div class="footer-col">',
        '<h4>Get Involved</h4>',
        '<ul>',
        '<li><a href="ministries.html">Small Groups</a></li>',
        '<li><a href="ministries.html">Worship Team</a></li>',
        '<li><a href="ministries.html">Youth Ministry</a></li>',
        '<li><a href="ministries.html">Outreach</a></li>',
        `<li><a href="${homePrefix}#give">Give Online</a></li>`,
        '</ul>',
        '</div>',
        '<div class="footer-col">',
        '<h4>Contact</h4>',
        '<div class="footer-contact-item"><i class="fa-solid fa-location-dot"></i><span id="cfg-footer-addr">123 Main St<br>Your City, MO 00000</span></div>',
        '<div class="footer-contact-item"><i class="fa-regular fa-clock"></i><span id="cfg-footer-times">Sun 10:30 AM &bull; Wed 7:00 PM</span></div>',
        '<div class="footer-contact-item"><i class="fa-solid fa-envelope"></i><span id="cfg-footer-email">info@youremail.com</span></div>',
        '</div>',
        '</div>',
        '<div class="footer-bottom">',
        '<p>&copy; <span id="cfg-copy-year">2026</span> <span id="cfg-copy-name">Your Church Name</span>. All rights reserved.</p>',
        '<a href="admin.html">Staff Login</a>',
        '</div>',
        '</footer>'
    ].join('');

    const headerEl = document.getElementById('site-header');
    const footerEl = document.getElementById('site-footer');
    if (headerEl) {
        headerEl.innerHTML = headerHtml
            .replace(/<div /g, '<div ')
            .replace(/<\/div>/g, '</div>')
            .replace(/<\/div>/g, '</div>');
    }
    if (footerEl) {
        footerEl.innerHTML = footerHtml
            .replace(/<div /g, '<div ')
            .replace(/<\/div>/g, '</div>');
    }
}
