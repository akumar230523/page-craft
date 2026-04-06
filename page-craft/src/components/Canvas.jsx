import CanvasBlock from './CanvasBlock';

export default function Canvas({ blocks, selectedId, dropIndicator, onSelectBlock, onDelete, onCanvasDragStart, onDragOver, onDragLeave, onDrop, onDropOnEmpty }) {
    const showIndicator = (blockIndex, position) =>
        dropIndicator?.index === blockIndex && dropIndicator?.position === position;

    if (blocks.length === 0) {
        return (
            <main className="flex-1 overflow-y-auto" onDragOver={(e) => e.preventDefault()} onDragLeave={onDragLeave}>
                <div
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={onDropOnEmpty}
                    className="flex-1 flex items-center justify-center min-h-full"
                >
                    <div className="text-center p-8 max-w-md">
                        <div className="w-16 h-16 rounded-2xl bg-brand-light border border-brand/30 flex items-center justify-center mx-auto mb-4">
                            <span className="text-2xl text-brand">+</span>
                        </div>
                        <h3 className="font-display text-xl font-semibold text-ink-900 mb-2">Empty Canvas</h3>
                        <p className="text-ink-500 text-sm mb-4">Drag a block from the left panel to start building your page.</p>
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main
            className="flex-1 overflow-y-auto"
            onDragOver={(e) => e.preventDefault()}
            onDragLeave={onDragLeave}
        >
            <div className="max-w-2xl mx-auto px-6 py-6">
                {blocks.map((block, index) => (
                    <div key={block.id} className="relative">
                        {/* Drop zone before block */}
                        <div
                            onDragOver={(e) => onDragOver(e, index, 'before')}
                            onDrop={(e) => onDrop(e, index, 'before')}
                            className="h-2"
                        >
                            {showIndicator(index, 'before') && (
                                <div className="drop-indicator h-0.5 bg-brand rounded-full" />
                            )}
                        </div>

                        <CanvasBlock
                            block={block}
                            index={index}
                            isSelected={selectedId === block.id}
                            onSelect={() => onSelectBlock(block.id)}
                            onDelete={() => onDelete(block.id)}
                            onDragStart={() => onCanvasDragStart(block.id, index)}
                        />

                        {/* Drop zone after last block */}
                        {index === blocks.length - 1 && (
                            <div
                                onDragOver={(e) => onDragOver(e, index, 'after')}
                                onDrop={(e) => onDrop(e, index, 'after')}
                                className="h-2"
                            >
                                {showIndicator(index, 'after') && (
                                    <div className="drop-indicator h-0.5 bg-brand rounded-full" />
                                )}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </main>
    );
}