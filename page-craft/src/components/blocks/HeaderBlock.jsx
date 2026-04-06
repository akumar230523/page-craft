export default function HeaderBlock({ content }) {
    const { text = 'Heading', level = 1, align = 'left', color = '#1A1614' } = content;
    const Tag = `h${level}`;
    const sizes = { 1: 'text-4xl font-bold', 2: 'text-2xl font-semibold', 3: 'text-xl font-semibold' };
    const aligns = { left: 'text-left', center: 'text-center', right: 'text-right' };

    return (
        <Tag className={`font-display ${sizes[level]} ${aligns[align]} w-full break-words`} style={{ color }}>
            {text || <span className="text-ink-300 italic">Empty heading...</span>}
        </Tag>
    );
}