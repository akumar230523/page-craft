import { useState, useCallback, useRef, useMemo, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useLocalStorage from '../hooks/useLocalStorage';
import { createBlock, reorderBlocks, updateBlockContent, removeBlock } from '../utils/blockUtils';
import Palette from '../components/Palette';
import Canvas from '../components/Canvas';
import ConfigPanel from '../components/ConfigPanel';

export default function Editor() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [pages, setPages] = useLocalStorage('pagecraft-pages', []);
    const [selectedId, setSelectedId] = useState(null);
    const [dropIndicator, setDropIndicator] = useState(null);
    const dragSource = useRef(null);
    const [editingName, setEditingName] = useState(false);

    // Find current page (could be undefined initially)
    const currentPage = pages.find(p => p.id === id);

    // Initialize pageName from currentPage (will update when currentPage changes via key remount)
    const [pageName, setPageName] = useState(() => currentPage?.name || '');

    // Memoize blocks
    const blocks = useMemo(() => currentPage?.blocks || [], [currentPage]);

    // Effect for redirection if page not found (after pages loaded)
    useEffect(() => {
        if (id !== 'new' && !currentPage && pages.length > 0) {
            navigate('/');
        }
    }, [id, currentPage, pages, navigate]);

    // Effect for creating new page when id === 'new'
    useEffect(() => {
        if (id === 'new') {
            const newPage = {
                id: crypto.randomUUID(),
                name: 'Untitled Page',
                blocks: [],
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            };
            setPages(prev => [...prev, newPage]);
            navigate(`/editor/${newPage.id}`, { replace: true });
        }
    }, [id, navigate, setPages]);

    // Update page blocks
    const updatePageBlocks = useCallback((newBlocks) => {
        setPages(prevPages => prevPages.map(page =>
            page.id === id
                ? { ...page, blocks: newBlocks, updatedAt: new Date().toISOString() }
                : page
        ));
    }, [id, setPages]);

    const selectedBlock = blocks.find(b => b.id === selectedId) || null;

    // Drag handlers
    const handlePaletteDragStart = useCallback((blockType) => {
        dragSource.current = { type: 'palette', blockType };
    }, []);

    const handleCanvasDragStart = useCallback((blockId, fromIndex) => {
        dragSource.current = { type: 'canvas', blockId, fromIndex };
    }, []);

    const handleDragOver = useCallback((e, index, position) => {
        e.preventDefault();
        setDropIndicator({ index, position });
    }, []);

    const handleDragLeave = useCallback(() => {
        setDropIndicator(null);
    }, []);

    const handleDrop = useCallback((e, targetIndex, position) => {
        e.preventDefault();
        const source = dragSource.current;
        dragSource.current = null;
        setDropIndicator(null);

        if (!source) return;

        const insertAt = position === 'after' ? targetIndex + 1 : targetIndex;

        if (source.type === 'palette') {
            const newBlock = createBlock(source.blockType);
            const newBlocks = [...blocks];
            newBlocks.splice(insertAt, 0, newBlock);
            updatePageBlocks(newBlocks);
            setSelectedId(newBlock.id);
        }
        else if (source.type === 'canvas') {
            const { fromIndex } = source;
            if (fromIndex === targetIndex) return;
            const toIndex = insertAt > fromIndex ? insertAt - 1 : insertAt;
            updatePageBlocks(reorderBlocks(blocks, fromIndex, toIndex));
        }
    }, [blocks, updatePageBlocks]);

    const handleDropOnEmpty = useCallback((e) => {
        e.preventDefault();
        const source = dragSource.current;
        dragSource.current = null;
        if (source?.type === 'palette') {
            const newBlock = createBlock(source.blockType);
            updatePageBlocks([newBlock]);
            setSelectedId(newBlock.id);
        }
    }, [updatePageBlocks]);

    // Block operations
    const handleContentChange = useCallback((blockId, changes) => {
        updatePageBlocks(updateBlockContent(blocks, blockId, changes));
    }, [blocks, updatePageBlocks]);

    const handleDelete = useCallback((blockId) => {
        updatePageBlocks(removeBlock(blocks, blockId));
        setSelectedId(prev => prev === blockId ? null : prev);
    }, [blocks, updatePageBlocks]);

    const handleSelectBlock = useCallback((blockId) => {
        setSelectedId(prev => prev === blockId ? null : blockId);
    }, []);

    // Page name editor
    const savePageName = () => {
        if (pageName.trim()) {
            setPages(prev => prev.map(p =>
                p.id === id ? { ...p, name: pageName.trim() } : p
            ));
        } else {
            setPageName(currentPage?.name || 'Untitled Page');
        }
        setEditingName(false);
    };

    // If still no currentPage (loading or invalid), show nothing (will redirect via effect)
    if (!currentPage && id !== 'new') {
        return null;
    }

    return (
        <div className="flex flex-col h-screen overflow-hidden">
            {/* Editor Top Bar */}
            <header className="flex items-center justify-between px-4 py-2 bg-white border-b border-ink-100">
                <div className="flex items-center gap-3">
                    <button onClick={() => navigate('/')} className="text-ink-500 hover:text-brand" title="Back to Dashboard">
                        ← Dashboard
                    </button>
                    <div className="h-6 w-px bg-ink-200" />
                    {editingName ? (
                        <input
                            type="text"
                            value={pageName}
                            onChange={(e) => setPageName(e.target.value)}
                            onBlur={savePageName}
                            onKeyDown={(e) => e.key === 'Enter' && savePageName()}
                            className="font-display font-semibold text-lg px-2 py-1 border border-brand rounded focus:outline-none"
                            autoFocus
                        />
                    ) : (
                        <h1
                            className="font-display font-semibold text-ink-900 text-lg cursor-pointer hover:text-brand"
                            onClick={() => setEditingName(true)}
                        >
                            {currentPage?.name}
                        </h1>
                    )}
                </div>
                <div className="flex items-center gap-2 text-sm text-ink-400">
                    <span>{blocks.length} block{blocks.length !== 1 ? 's' : ''}</span>
                    <span className="w-1 h-1 rounded-full bg-ink-300" />
                    <span>Auto-saved</span>
                </div>
            </header>

            {/* Main Editor Layout */}
            <div className="flex flex-1 overflow-hidden">
                <Palette onDragStart={handlePaletteDragStart} />
                <Canvas
                    blocks={blocks}
                    selectedId={selectedId}
                    dropIndicator={dropIndicator}
                    onSelectBlock={handleSelectBlock}
                    onDelete={handleDelete}
                    onCanvasDragStart={handleCanvasDragStart}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onDropOnEmpty={handleDropOnEmpty}
                />
                {selectedBlock && (
                    <ConfigPanel
                        block={selectedBlock}
                        onContentChange={handleContentChange}
                        onClose={() => setSelectedId(null)}
                        onDelete={handleDelete}
                    />
                )}
            </div>
        </div>
    );
}