export default function HeaderConfig({ content, onChange }) {
    const { text, level, align, color } = content;

    return (
        <div className="space-y-4">
            <div>
                <label className="block text-xs font-medium text-ink-500 mb-1">Heading Text</label>
                <input
                    type="text"
                    value={text}
                    onChange={(e) => onChange({ text: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-ink-100 focus:border-brand focus:outline-none"
                    placeholder="Enter heading..."
                />
            </div>
            <div>
                <label className="block text-xs font-medium text-ink-500 mb-1">Level</label>
                <select
                    value={level}
                    onChange={(e) => onChange({ level: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-lg border border-ink-100 focus:border-brand focus:outline-none"
                >
                    <option value={1}>H1 - Largest</option>
                    <option value={2}>H2 - Medium</option>
                    <option value={3}>H3 - Small</option>
                </select>
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
                <input
                    type="color"
                    value={color}
                    onChange={(e) => onChange({ color: e.target.value })}
                    className="w-full h-10 rounded border border-ink-100"
                />
            </div>
        </div>
    );
}