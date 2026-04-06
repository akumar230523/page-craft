import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useLocalStorage from '../hooks/useLocalStorage';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';

export default function Dashboard() {
    const [pages, setPages] = useLocalStorage('pagecraft-pages', []);
    const [showNewModal, setShowNewModal] = useState(false);
    const [newPageName, setNewPageName] = useState('');
    const navigate = useNavigate();

    const createNewPage = () => {
        if (!newPageName.trim()) return;
        const newPage = {
            id: crypto.randomUUID(),
            name: newPageName.trim(),
            blocks: [],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };
        setPages([...pages, newPage]);
        setNewPageName('');
        setShowNewModal(false);
        navigate(`/editor/${newPage.id}`);
    };

    const deletePage = (id, e) => {
        e.stopPropagation();
        if (window.confirm('Delete this page? This cannot be undone.')) {
            setPages(pages.filter(p => p.id !== id));
        }
    };

    const duplicatePage = (page, e) => {
        e.stopPropagation();
        const newPage = {
            ...page,
            id: crypto.randomUUID(),
            name: `${page.name} (Copy)`,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            blocks: page.blocks.map(block => ({ ...block, id: crypto.randomUUID() }))
        };
        setPages([...pages, newPage]);
    };

    return (
        <div className="min-h-screen bg-canvas">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="font-display text-3xl font-bold text-ink-900">My Pages</h1>
                        <p className="text-ink-500 mt-1">Manage all your created pages</p>
                    </div>
                    <button
                        onClick={() => setShowNewModal(true)}
                        className="px-4 py-2 rounded-lg bg-brand text-white hover:bg-brand-dark transition flex items-center gap-2"
                    >
                        <AddIcon fontSize="small" />
                        New Page
                    </button>
                </div>

                {/* Pages Grid */}
                {pages.length === 0 ? (
                    <div className="text-center py-16 bg-white rounded-xl border border-ink-100">
                        <div className="w-16 h-16 rounded-full bg-brand-light flex items-center justify-center mx-auto mb-4">
                            <InsertDriveFileIcon sx={{ fontSize: 32, color: '#E8A020' }} />
                        </div>
                        <h3 className="font-display text-xl font-semibold text-ink-900 mb-2">No pages yet</h3>
                        <p className="text-ink-500 mb-4">Create your first page and start building</p>
                        <button
                            onClick={() => setShowNewModal(true)}
                            className="px-4 py-2 rounded-lg bg-brand text-white hover:bg-brand-dark transition"
                        >
                            Create New Page
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {pages.map(page => (
                            <div
                                key={page.id}
                                onClick={() => navigate(`/editor/${page.id}`)}
                                className="bg-white rounded-xl border border-ink-100 hover:shadow-md transition cursor-pointer overflow-hidden group"
                            >
                                <div className="p-5">
                                    <div className="flex justify-between items-start mb-3">
                                        <h3 className="font-display font-semibold text-lg text-ink-900 truncate">
                                            {page.name}
                                        </h3>
                                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition">
                                            <button
                                                onClick={(e) => duplicatePage(page, e)}
                                                className="p-1 text-ink-400 hover:text-brand"
                                                title="Duplicate"
                                            >
                                                <ContentCopyIcon fontSize="small" />
                                            </button>
                                            <button
                                                onClick={(e) => deletePage(page.id, e)}
                                                className="p-1 text-ink-400 hover:text-red-500"
                                                title="Delete"
                                            >
                                                <DeleteIcon fontSize="small" />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="text-sm text-ink-500 space-y-1">
                                        <p>Blocks: {page.blocks.length}</p>
                                        <p>Updated: {new Date(page.updatedAt).toLocaleDateString()}</p>
                                    </div>
                                    <div className="mt-4 flex items-center text-brand text-sm">
                                        Click to edit →
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* New Page Modal */}
            {showNewModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowNewModal(false)}>
                    <div className="bg-white rounded-xl p-6 w-96 max-w-md" onClick={e => e.stopPropagation()}>
                        <h2 className="font-display text-xl font-semibold text-ink-900 mb-4">Create New Page</h2>
                        <input
                            type="text"
                            value={newPageName}
                            onChange={(e) => setNewPageName(e.target.value)}
                            placeholder="Page name"
                            className="w-full px-3 py-2 rounded-lg border border-ink-200 focus:border-brand focus:outline-none mb-4"
                            autoFocus
                            onKeyDown={(e) => e.key === 'Enter' && createNewPage()}
                        />
                        <div className="flex justify-end gap-2">
                            <button onClick={() => setShowNewModal(false)} className="px-4 py-2 rounded-lg border border-ink-200 text-ink-600 hover:bg-ink-50">
                                Cancel
                            </button>
                            <button onClick={createNewPage} className="px-4 py-2 rounded-lg bg-brand text-white hover:bg-brand-dark">
                                Create
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}