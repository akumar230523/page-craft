export default function ImageConfig({ content, onChange }) {
    const { url, alt, caption, size, rounded } = content;

    const samples = [
        { url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&auto=format', alt: 'Mountains' },
        { url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&auto=format', alt: 'Forest' },
        { url: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&auto=format', alt: 'City' },
    ];

    return (
        <div className="space-y-4">
            <div>
                <label className="block text-xs font-medium text-ink-500 mb-1">Image URL</label>
                <input
                    type="url"
                    value={url}
                    onChange={(e) => onChange({ url: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-ink-100 focus:border-brand focus:outline-none"
                    placeholder="https://example.com/image.jpg"
                />
            </div>
            <div>
                <label className="block text-xs font-medium text-ink-500 mb-1">Quick Samples</label>
                <div className="flex gap-2">
                    {samples.map((sample, i) => (
                        <button
                            key={i}
                            onClick={() => onChange({ url: sample.url, alt: sample.alt })}
                            className="w-16 h-16 rounded-lg overflow-hidden border-2 hover:border-brand transition"
                        >
                            <img src={sample.url} alt={sample.alt} className="w-full h-full object-cover" />
                        </button>
                    ))}
                </div>
            </div>
            <div>
                <label className="block text-xs font-medium text-ink-500 mb-1">Alt Text</label>
                <input
                    type="text"
                    value={alt}
                    onChange={(e) => onChange({ alt: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-ink-100 focus:border-brand focus:outline-none"
                />
            </div>
            <div>
                <label className="block text-xs font-medium text-ink-500 mb-1">Caption</label>
                <input
                    type="text"
                    value={caption}
                    onChange={(e) => onChange({ caption: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-ink-100 focus:border-brand focus:outline-none"
                />
            </div>
            <div>
                <label className="block text-xs font-medium text-ink-500 mb-1">Size</label>
                <select
                    value={size}
                    onChange={(e) => onChange({ size: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-ink-100 focus:border-brand focus:outline-none"
                >
                    <option value="small">Small</option>
                    <option value="medium">Medium</option>
                    <option value="full">Full Width</option>
                </select>
            </div>
            <div>
                <label className="block text-xs font-medium text-ink-500 mb-1">Border Radius</label>
                <select
                    value={rounded}
                    onChange={(e) => onChange({ rounded: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-ink-100 focus:border-brand focus:outline-none"
                >
                    <option value="none">None</option>
                    <option value="md">Medium</option>
                    <option value="xl">Large</option>
                    <option value="full">Full (Circle)</option>
                </select>
            </div>
        </div>
    );
}