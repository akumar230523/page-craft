import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';

import HeaderBlock from './blocks/HeaderBlock';
import TextBlock from './blocks/TextBlock';
import ImageBlock from './blocks/ImageBlock';
import MarkdownBlock from './blocks/MarkdownBlock';
import { getBlockDefinition } from '../constants/blockTypes';

const BLOCK_COMPONENTS = {
    header: HeaderBlock,
    text: TextBlock,
    image: ImageBlock,
    markdown: MarkdownBlock,
};

export default function CanvasBlock({ block, isSelected, onSelect, onDelete, onDragStart }) {
    const [isDragging, setIsDragging] = useState(false);
    const definition = getBlockDefinition(block.type);
    const BlockComponent = BLOCK_COMPONENTS[block.type];
    const Icon = definition?.icon;

    const handleDragStart = (e) => {
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/plain', block.id);
        setIsDragging(true);
        onDragStart();
    };

    const handleDragEnd = () => setIsDragging(false);

    return (
        <div
            className={`group relative bg-white rounded-xl shadow-sm transition-all 
                ${isSelected ? 'ring-2 ring-brand shadow-md' : 'hover:shadow-md'} ${isDragging ? 'opacity-40' : ''}`}
                onClick={(e) => {
                    if (e.target.closest('button')) return;
                    onSelect();
                }
            }
        >
            {/* Drag Handle */}
            <div
                draggable
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                className={`absolute left-0 top-0 bottom-0 w-7 flex items-center justify-center cursor-grab active:cursor-grabbing transition-opacity 
                    ${isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`
                }
            >
                <DragIndicatorIcon fontSize="small" className="text-ink-400" />
            </div>

            {/* Top-right toolbar */}
            <div className={`absolute top-2 right-2 flex gap-1 transition-opacity ${isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                <span className="px-2 py-0.5 rounded-full bg-ink-900/80 text-cream-50 text-xs flex items-center gap-1">
                    {Icon && <Icon fontSize="inherit" style={{ fontSize: '12px' }} />}
                    {definition?.label}
                </span>
                <button
                    onClick={(e) => { e.stopPropagation(); onDelete(); }}
                    className="w-6 h-6 rounded-full bg-white border border-ink-100 flex items-center justify-center text-ink-400 hover:bg-red-50 hover:text-red-500 transition"
                >
                    <CloseIcon fontSize="small" />
                </button>
            </div>

            {/* Block Content */}
            <div className="pl-8 pr-3 py-3">
                {BlockComponent ? <BlockComponent content={block.content} /> : <div>Unknown block</div>}
            </div>
        </div>
    );
}