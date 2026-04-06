import PaletteItem from './PaletteItem';
import { BLOCK_DEFINITIONS } from '../constants/blockTypes';

export default function Palette({ onDragStart }) {
    return (
        <aside className="w-64 flex-shrink-0 bg-ink-900 flex flex-col overflow-y-auto">
            <div className="p-4 border-b border-ink-700">
                <h2 className="font-semibold text-cream-50 text-sm uppercase tracking-wide">Blocks</h2>
                <p className="text-ink-300 text-xs mt-1">Drag onto canvas</p>
            </div>
            <div className="flex-1 p-3 space-y-2">
                {BLOCK_DEFINITIONS.map(def => (
                    <PaletteItem key={def.type} definition={def} onDragStart={onDragStart} />
                ))}
            </div>
        </aside>
    );
}