export const guides = [
    {
        slug: 'attention',
        number: '01',
        title: 'Attention',
        topic: 'From one dot product to the frontier',
        load: () => import('./guides/01-attention.html?raw'),
    },
    {
        slug: 'tokens-per-second',
        number: '02',
        title: 'Tokens Per Second',
        topic: 'Inference speed',
        load: () => import('./guides/02-tokens-per-second.html?raw'),
    },
    {
        slug: 'the-next-token',
        number: '03',
        title: 'The Next Token',
        topic: 'Tokenization and sampling',
        load: () => import('./guides/03-the-next-token.html?raw'),
    },
    {
        slug: 'the-training-run',
        number: '04',
        title: 'The Training Run',
        topic: 'Pretrain, SFT, RLHF, and reasoning RL',
        load: () => import('./guides/04-the-training-run.html?raw'),
    },
    {
        slug: 'downhill',
        number: '05',
        title: 'Downhill',
        topic: 'Gradient descent and backpropagation',
        load: () => import('./guides/05-downhill.html?raw'),
    },
    {
        slug: 'weight-space',
        number: '06',
        title: 'Weight Space',
        topic: 'Reading, editing, and writing weights',
        load: () => import('./guides/06-weight-space.html?raw'),
    },
    {
        slug: 'the-exam',
        number: '07',
        title: 'The Exam',
        topic: 'Evals, judges, contamination, arenas',
        load: () => import('./guides/07-the-exam.html?raw'),
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

export function prepareGuide(html) {
    const linked = html.replace(
        /<a href="https:\/\/claude\.ai\/artifact\/[^"]+" target="_blank" rel="noopener">(<span>[^<]*<\/span>)([^<]+)<\/a>/g,
        (match, label, title) => {
            const slug = seriesSlugs[title.trim().toLowerCase()]
            if (!slug) return match
            return `<a href="#" data-learn-slug="${slug}">${label}${title}</a>`
        }
    )
    return linked + seriesBridge
}
