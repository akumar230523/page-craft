import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';

import HeaderConfig from './configs/HeaderConfig';
import TextConfig from './configs/TextConfig';
import ImageConfig from './configs/ImageConfig';
import MarkdownConfig from './configs/MarkdownConfig';
import { getBlockDefinition } from '../constants/blockTypes';

const CONFIG_MAP = {
    header: HeaderConfig,
    text: TextConfig,
    image: ImageConfig,
    markdown: MarkdownConfig,
};

export default function ConfigPanel({ block, onContentChange, onClose, onDelete }) {
    const definition = getBlockDefinition(block.type);
    const ConfigComponent = CONFIG_MAP[block.type];
    const Icon = definition?.icon;

    const handleChange = (changes) => onContentChange(block.id, changes);

    return (
        <aside className="w-80 flex-shrink-0 bg-white border-l border-ink-100 flex flex-col overflow-hidden shadow-lg">
            <div className="flex items-center justify-between p-4 border-b border-ink-100">
                <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-brand-light flex items-center justify-center text-brand-dark">
                        {Icon && <Icon fontSize="small" />}
                    </div>
                    <h2 className="font-semibold text-ink-900">{definition?.label} Settings</h2>
                </div>
                <button onClick={onClose} className="text-ink-400 hover:text-ink-700">
                    <CloseIcon fontSize="small" />
                </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
                {ConfigComponent ? (
                    <ConfigComponent content={block.content} onChange={handleChange} />
                ) : (
                    <p className="text-ink-500">No settings available</p>
                )}
            </div>

            <div className="p-4 border-t border-ink-100">
                <button
                    onClick={() => onDelete(block.id)}
                    className="w-full py-2 rounded-lg border border-red-200 text-red-500 hover:bg-red-50 transition flex items-center justify-center gap-2"
                >
                    <DeleteIcon fontSize="small" />
                    Delete Block
                </button>
            </div>
        </aside>
    );
}