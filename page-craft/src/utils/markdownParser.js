/**
 * Simple Markdown to HTML parser
 * Supports: headings (# ## ###), bold (**), italic (*), inline code (`), links [text](url)
 */

export function parseMarkdown(markdown) {
    if (!markdown) return '';

    let html = markdown;

    // Code blocks (```)
    html = html.replace(/```([\s\S]*?)```/g, (_, code) => {
        return `<pre><code>${escapeHtml(code.trim())}</code></pre>`;
    });

    // Headings
    html = html.replace(/^### (.*$)/gm, '<h3>$1</h3>');
    html = html.replace(/^## (.*$)/gm, '<h2>$1</h2>');
    html = html.replace(/^# (.*$)/gm, '<h1>$1</h1>');

    // Bold
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    // Italic
    html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
    // Inline code
    html = html.replace(/`(.*?)`/g, '<code>$1</code>');
    // Links
    html = html.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');

    // Convert line breaks to paragraphs
    const paragraphs = html.split('\n\n');
    html = paragraphs.map(p => {
        if (p.trim().startsWith('<h') || p.trim().startsWith('<pre') || p.trim().startsWith('<ul') || p.trim().startsWith('<ol')) {
            return p;
        }
        return `<p>${p.replace(/\n/g, '<br/>')}</p>`;
    }).join('');

    return html;
}

function escapeHtml(str) {
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}