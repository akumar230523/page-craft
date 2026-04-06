import DragIndicatorIcon from '@mui/icons-material/DragIndicator';

export default function PaletteItem({ definition, onDragStart }) {
    const { type, label, description, icon: Icon } = definition;

    const handleDragStart = (e) => {
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/plain', type);
        onDragStart(type);
    };

    return (
        <div
            draggable
            onDragStart={handleDragStart}
            className="flex items-center gap-3 p-3 rounded-xl bg-ink-800/50 hover:bg-ink-700 border border-ink-700 cursor-grab active:cursor-grabbing transition group"
        >
            <div className="w-8 h-8 rounded-lg bg-ink-700 flex items-center justify-center text-cream-100">
                <Icon fontSize="small" />
            </div>
            <div className="flex-1">
                <p className="text-cream-50 font-medium text-sm">{label}</p>
                <i className="text-ink-300 text-xs">{description}</i>
            </div>
            <DragIndicatorIcon className="text-ink-500 opacity-0 group-hover:opacity-100 transition" fontSize="small" />
        </div>
    );
}