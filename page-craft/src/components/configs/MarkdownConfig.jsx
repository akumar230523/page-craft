import { useState } from 'react';
import { parseMarkdown } from '../../utils/markdownParser';

export default function MarkdownConfig({ content, onChange }) {
    const { content: markdown } = content;
    const [activeTab, setActiveTab] = useState('write');

    return (
        <div className="space-y-4">
            <div className="flex rounded-lg border border-ink-100 overflow-hidden">
                <button
                    onClick={() => setActiveTab('write')}
                    className={`flex-1 py-1.5 text-sm ${activeTab === 'write' ? 'bg-brand text-white' : 'bg-white text-ink-600'}`}
                >
                    Write
                </button>
                <button
                    onClick={() => setActiveTab('preview')}
                    className={`flex-1 py-1.5 text-sm ${activeTab === 'preview' ? 'bg-brand text-white' : 'bg-white text-ink-600'}`}
                >
                    Preview
                </button>
            </div>

            {activeTab === 'write' && (
                <div>
                    <label className="block text-xs font-medium text-ink-500 mb-1">Markdown</label>
                    <textarea
                        value={markdown}
                        onChange={(e) => onChange({ content: e.target.value })}
                        rows={12}
                        className="w-full px-3 py-2 rounded-lg border border-ink-100 focus:border-brand focus:outline-none font-mono text-sm resize-y"
                        placeholder="# Heading&#10;&#10;**Bold** and *italic*"
                    />
                    <div className="mt-2 text-xs text-ink-400">
                        Supports: # ## ###, **bold**, *italic*, `code`, [links](url)
                    </div>
                </div>
            )}

            {activeTab === 'preview' && (
                <div className="border border-ink-100 rounded-lg p-3 bg-canvas min-h-[300px]">
                    <div className="markdown-content" dangerouslySetInnerHTML={{ __html: parseMarkdown(markdown) }} />
                </div>
            )}
        </div>
    );
}