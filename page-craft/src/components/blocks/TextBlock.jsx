export default function TextBlock({ content }) {
    const { text = '', fontSize = 'base', bold = false, italic = false, align = 'left', color = '#3D332E' } = content;
    const sizes = { sm: 'text-sm', base: 'text-base', lg: 'text-lg', xl: 'text-xl' };
    const aligns = { left: 'text-left', center: 'text-center', right: 'text-right' };

    return (
        <p
            className={`font-body leading-relaxed ${sizes[fontSize]} ${aligns[align]} ${bold ? 'font-semibold' : 'font-normal'
                } ${italic ? 'italic' : ''}`}
            style={{ color }}
        >
            {text || <span className="text-ink-300 italic">Empty text block...</span>}
        </p>
    );
}