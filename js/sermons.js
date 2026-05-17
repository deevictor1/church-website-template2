/**
 * Parse a YouTube video ID or full URL (watch, live, youtu.be).
 * @returns {{ id: string, start: number }}
 */
function parseYouTubeInput(input) {
    if (!input || typeof input !== 'string') return { id: '', start: 0 };
    const trimmed = input.trim();
    if (/^[\w-]{11}$/.test(trimmed)) return { id: trimmed, start: 0 };

    try {
        const url = new URL(trimmed);
        let id = url.searchParams.get('v');
        if (!id && url.hostname.includes('youtu.be')) {
            id = url.pathname.replace(/^\//, '').split('/')[0];
        }
        if (!id && url.pathname.includes('/live/')) {
            id = url.pathname.split('/live/')[1].split(/[?&#]/)[0];
        }
        if (!id && url.pathname.includes('/embed/')) {
            id = url.pathname.split('/embed/')[1].split(/[?&#]/)[0];
        }

        let start = 0;
        const t = url.searchParams.get('t') || url.searchParams.get('start');
        if (t) {
            if (/^\d+$/.test(t)) {
                start = parseInt(t, 10);
            } else {
                const match = t.match(/(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s)?/);
                if (match) {
                    start = (parseInt(match[1] || 0, 10) * 3600)
                        + (parseInt(match[2] || 0, 10) * 60)
                        + parseInt(match[3] || 0, 10);
                }
            }
        }
        return { id: id || '', start };
    } catch {
        return { id: trimmed, start: 0 };
    }
}

function buildYouTubeEmbedSrc(id, start) {
    const params = new URLSearchParams({
        rel: '0',
        modestbranding: '1'
    });
    if (start > 0) params.set('start', String(start));
    return `https://www.youtube.com/embed/${id}?${params.toString()}`;
}

function loadSermons() {
    fetch('./sermons.json?v=' + Date.now())
        .then(r => r.json())
        .then(data => {
            if (!data || !data.length) return;
            const s = data[0];
            const parsed = parseYouTubeInput(s.youtubeId || '');
            const videoId = parsed.id;
            const start = s.youtubeStart > 0 ? s.youtubeStart : parsed.start;
            const embed = document.getElementById('sermon-embed-container');

            if (videoId && embed) {
                const title = (s.title || 'Sermon').replace(/"/g, '&quot;');
                embed.innerHTML = `<iframe src="${buildYouTubeEmbedSrc(videoId, start)}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen title="${title}"></iframe>`;
            }

            if (s.series) {
                const el = document.getElementById('sermon-series');
                if (el) el.textContent = s.series;
            }
            if (s.title) {
                const el = document.getElementById('sermon-title');
                if (el) el.textContent = s.title;
            }
            if (s.speaker) {
                const el = document.getElementById('sermon-speaker');
                if (el) el.textContent = s.speaker;
            }
            if (s.date && s.date.trim()) {
                const el = document.getElementById('sermon-date');
                if (el) {
                    el.textContent = new Date(s.date + 'T00:00:00').toLocaleDateString('en-US', {
                        month: 'long', day: 'numeric', year: 'numeric'
                    });
                }
            }
            if (s.description) {
                const el = document.getElementById('sermon-desc');
                if (el) el.textContent = s.description;
            }
        })
        .catch(() => {});
}
