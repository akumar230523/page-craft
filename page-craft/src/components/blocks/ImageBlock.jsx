import { useState } from 'react';

export default function ImageBlock({ content }) {
    const { url = '', alt = 'Image', caption = '', size = 'full', rounded = 'md' } = content;
    const [error, setError] = useState(false);

    const sizeClasses = { small: 'max-w-xs', medium: 'max-w-md', full: 'w-full' };
    const roundedClasses = { none: 'rounded-none', md: 'rounded-lg', xl: 'rounded-xl', full: 'rounded-full' };

    if (!url) {
        return (
            <div className="flex items-center justify-center h-32 rounded-lg border-2 border-dashed border-ink-200 text-ink-400 text-sm">
                Add image URL in settings →
            </div>
        );
    }

    return (
        <figure className="w-full">
            <div className={`${sizeClasses[size]} mx-auto`}>
                {error ? (
                    <div className="w-full h-32 bg-red-50 rounded-lg flex items-center justify-center text-red-400 text-sm">
                        Failed to load image
                    </div>
                ) : (
                    <img
                        src={url}
                        alt={alt}
                        className={`w-full object-cover ${roundedClasses[rounded]}`}
                        style={{ maxHeight: '400px' }}
                        onError={() => setError(true)}
                    />
                )}
            </div>
            {caption && <figcaption className="mt-2 text-center text-xs text-ink-400">{caption}</figcaption>}
        </figure>
    );
}