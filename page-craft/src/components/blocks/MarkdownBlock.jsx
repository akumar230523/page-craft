import { useMemo } from 'react';
import { parseMarkdown } from '../../utils/markdownParser';

export default function MarkdownBlock({ content }) {
    const { content: markdown = '' } = content;
    const html = useMemo(() => parseMarkdown(markdown), [markdown]);

    if (!markdown.trim()) {
        return <div className="text-ink-400 italic text-sm p-2">Empty markdown block...</div>;
    }

    return <div className="markdown-content" dangerouslySetInnerHTML={{ __html: html }} />;
}