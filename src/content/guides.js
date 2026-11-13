export const guides = [
    {
        slug: 'attention',
        number: '01',
        title: 'Attention',
        topic: 'From one dot product to the frontier',
        file: '01-attention.html',
    },
    {
        slug: 'tokens-per-second',
        number: '02',
        title: 'Tokens Per Second',
        topic: 'Inference speed',
        file: '02-tokens-per-second.html',
    },
    {
        slug: 'the-next-token',
        number: '03',
        title: 'The Next Token',
        topic: 'Tokenization and sampling',
        file: '03-the-next-token.html',
    },
    {
        slug: 'the-training-run',
        number: '04',
        title: 'The Training Run',
        topic: 'Pretrain, SFT, RLHF, and reasoning RL',
        file: '04-the-training-run.html',
    },
    {
        slug: 'downhill',
        number: '05',
        title: 'Downhill',
        topic: 'Gradient descent and backpropagation',
        file: '05-downhill.html',
    },
    {
        slug: 'weight-space',
        number: '06',
        title: 'Weight Space',
        topic: 'Reading, editing, and writing weights',
        file: '06-weight-space.html',
    },
    {
        slug: 'the-exam',
        number: '07',
        title: 'The Exam',
        topic: 'Evals, judges, contamination, arenas',
        file: '07-the-exam.html',
    },
]

const seriesSlugs = {
    attention: 'attention',
    'tokens per second': 'tokens-per-second',
    'the next token': 'the-next-token',
    'the training run': 'the-training-run',
    downhill: 'downhill',
    'weight space': 'weight-space',
    'the exam': 'the-exam',
}

const seriesBridge = `<script>
document.addEventListener('click', function (event) {
  var link = event.target && event.target.closest && event.target.closest('[data-learn-slug]');
  if (!link) return;
  event.preventDefault();
  parent.postMessage({ type: 'learn-guide', slug: link.getAttribute('data-learn-slug') }, '*');
});
</script>`

export function getGuide(slug) {
    return guides.find((guide) => guide.slug === slug)
}

function presentGuide(html) {
    const nested = html.indexOf('<!doctype', 2)
    if (nested > 0 && nested < 2000 && html.slice(0, nested) === html.slice(nested, nested * 2)) {
        html = html.slice(nested)
    }
    return html
        .replaceAll('color-scheme:light;', 'color-scheme:light dark;')
        .replaceAll(
            'body{margin:0;padding:0;font:14px -apple-system,BlinkMacSystemFont,sans-serif;background:#fff;color:#000}',
            'html{background:var(--bg,#F4F5F7);min-height:100%}body{margin:0;padding:0;font:14px -apple-system,BlinkMacSystemFont,sans-serif;background:var(--bg,#F4F5F7);color:var(--fg,#121521);min-height:100%}'
        )
}

export function prepareGuide(html) {
    const linked = presentGuide(html).replace(
        /<a href="https:\/\/claude\.ai\/artifact\/[^"]+" target="_blank" rel="noopener">(<span>[^<]*<\/span>)([^<]+)<\/a>/g,
        (match, label, title) => {
            const slug = seriesSlugs[title.trim().toLowerCase()]
            if (!slug) return match
            return `<a href="#" data-learn-slug="${slug}">${label}${title}</a>`
        }
    )
    return linked + seriesBridge
}
