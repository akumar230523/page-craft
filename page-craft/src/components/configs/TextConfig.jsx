export default function TextConfig({ content, onChange }) {
    const { text, fontSize, bold, italic, align, color } = content;

    return (
        <div className="space-y-4">
            <div>
                <label className="block text-xs font-medium text-ink-500 mb-1">Text</label>
                <textarea
                    value={text}
                    onChange={(e) => onChange({ text: e.target.value })}
                    rows={4}
                    className="w-full px-3 py-2 rounded-lg border border-ink-100 focus:border-brand focus:outline-none resize-y"
                    placeholder="Write your text..."
                />
            </div>
            <div>
                <label className="block text-xs font-medium text-ink-500 mb-1">Font Size</label>
                <select
                    value={fontSize}
                    onChange={(e) => onChange({ fontSize: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-ink-100 focus:border-brand focus:outline-none"
                >
                    <option value="sm">Small</option>
                    <option value="base">Base</option>
                    <option value="lg">Large</option>
                    <option value="xl">Extra Large</option>
                </select>
            </div>
            <div className="flex gap-4">
                <label className="flex items-center gap-2 text-sm">
                    <input type="checkbox" checked={bold} onChange={(e) => onChange({ bold: e.target.checked })} />
                    Bold
                </label>
                <label className="flex items-center gap-2 text-sm">
                    <input type="checkbox" checked={italic} onChange={(e) => onChange({ italic: e.target.checked })} />
                    Italic
                </label>
            </div>
            <div>
                <label className="block text-xs font-medium text-ink-500 mb-1">Alignment</label>
                <div className="flex gap-2">
                    {['left', 'center', 'right'].map(a => (
                        <button
                            key={a}
                            onClick={() => onChange({ align: a })}
                            className={`flex-1 py-1.5 rounded border text-sm ${align === a ? 'bg-brand text-white border-brand' : 'bg-white border-ink-200 text-ink-600'}`}
                        >
                            {a === 'left' ? '←' : a === 'center' ? '↔' : '→'}
                        </button>
                    ))}
                </div>
            </div>
            <div>
                <label className="block text-xs font-medium text-ink-500 mb-1">Color</label>
                <input type="color" value={color} onChange={(e) => onChange({ color: e.target.value })} className="w-full h-10 rounded border border-ink-100" />
            </div>
        </div>
    );
}