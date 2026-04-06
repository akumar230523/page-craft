import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import SettingsIcon from '@mui/icons-material/Settings';
import SaveIcon from '@mui/icons-material/Save';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AddIcon from '@mui/icons-material/Add';
import ReorderIcon from '@mui/icons-material/Reorder';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import TitleIcon from '@mui/icons-material/Title';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import ImageIcon from '@mui/icons-material/Image';
import CodeIcon from '@mui/icons-material/Code';

export default function HowToUse() {
    return (
        <div className="min-h-screen bg-canvas">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <h1 className="font-display text-3xl font-bold text-ink-900 mb-6 flex items-center gap-2">
                    <AutoAwesomeIcon className="text-brand" /> How to Use PageCraft
                </h1>

                <div className="space-y-8">
                    {/* Section 1 */}
                    <section className="bg-white rounded-xl border border-ink-100 p-6">
                        <h2 className="font-display text-xl font-semibold text-ink-900 mb-3 flex items-center gap-2">
                            <span className="w-6 h-6 rounded-full bg-brand text-white flex items-center justify-center text-sm">1</span>
                            <AddIcon className="text-brand" /> Create a New Page
                        </h2>
                        <p className="text-ink-600 leading-relaxed">
                            On the Dashboard, click the <span className="bg-brand-light text-brand-dark px-2 py-0.5 rounded">New Page</span> button.
                            Give your page a name and you'll be taken to the editor.
                        </p>
                    </section>

                    {/* Section 2 */}
                    <section className="bg-white rounded-xl border border-ink-100 p-6">
                        <h2 className="font-display text-xl font-semibold text-ink-900 mb-3 flex items-center gap-2">
                            <span className="w-6 h-6 rounded-full bg-brand text-white flex items-center justify-center text-sm">2</span>
                            <DragIndicatorIcon className="text-brand" /> Add Blocks
                        </h2>
                        <p className="text-ink-600 leading-relaxed mb-2">
                            On the left sidebar, you'll see four block types:
                        </p>
                        <ul className="list-disc pl-6 space-y-1 text-ink-600">
                            <li><strong>Header</strong> – For titles and section headings (H1, H2, H3)</li>
                            <li><strong>Rich Text</strong> – Styled paragraphs with bold/italic options</li>
                            <li><strong>Image</strong> – Display images from any URL</li>
                            <li><strong>Markdown</strong> – Write Markdown and see live preview</li>
                        </ul>
                        <p className="text-ink-600 mt-2">Simply <strong>drag any block</strong> from the palette onto the canvas.</p>
                    </section>

                    {/* Section 3 */}
                    <section className="bg-white rounded-xl border border-ink-100 p-6">
                        <h2 className="font-display text-xl font-semibold text-ink-900 mb-3 flex items-center gap-2">
                            <span className="w-6 h-6 rounded-full bg-brand text-white flex items-center justify-center text-sm">3</span>
                            <SettingsIcon className="text-brand" /> Configure Blocks
                        </h2>
                        <p className="text-ink-600 leading-relaxed">
                            Click any block on the canvas to open the <strong>configuration panel</strong> on the right.
                            Here you can edit text, change colors, adjust alignment, upload images, and more.
                        </p>
                    </section>

                    {/* Section 4 */}
                    <section className="bg-white rounded-xl border border-ink-100 p-6">
                        <h2 className="font-display text-xl font-semibold text-ink-900 mb-3 flex items-center gap-2">
                            <span className="w-6 h-6 rounded-full bg-brand text-white flex items-center justify-center text-sm">4</span>
                            <ReorderIcon className="text-brand" /> Reorder Blocks
                        </h2>
                        <p className="text-ink-600 leading-relaxed">
                            Hover over any block to see the <strong>drag handle</strong> on the left edge.
                            Drag it up or down to rearrange blocks on your page.
                        </p>
                    </section>

                    {/* Section 5 */}
                    <section className="bg-white rounded-xl border border-ink-100 p-6">
                        <h2 className="font-display text-xl font-semibold text-ink-900 mb-3 flex items-center gap-2">
                            <span className="w-6 h-6 rounded-full bg-brand text-white flex items-center justify-center text-sm">5</span>
                            <SaveIcon className="text-brand" /> Auto-Save
                        </h2>
                        <p className="text-ink-600 leading-relaxed">
                            Your pages are automatically saved to your browser's local storage.
                            Close the browser, come back later – your work will still be there.
                        </p>
                    </section>

                    {/* Section 6 */}
                    <section className="bg-white rounded-xl border border-ink-100 p-6">
                        <h2 className="font-display text-xl font-semibold text-ink-900 mb-3 flex items-center gap-2">
                            <span className="w-6 h-6 rounded-full bg-brand text-white flex items-center justify-center text-sm">6</span>
                            <DashboardIcon className="text-brand" /> Manage Pages
                        </h2>
                        <p className="text-ink-600 leading-relaxed">
                            From the Dashboard, you can view all your pages, duplicate them, or delete them.
                            Click any page card to continue editing.
                        </p>
                    </section>
                </div>

                {/* Quick reference with MUI icons */}
                <div className="mt-10 bg-ink-900 rounded-xl p-6 text-cream-50">
                    <h3 className="font-display text-lg font-semibold mb-3">Quick Reference</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center gap-2"><TitleIcon fontSize="small" /> <strong>Header block</strong> – Titles, headings, colors</div>
                        <div className="flex items-center gap-2"><TextFieldsIcon fontSize="small" /> <strong>Text block</strong> – Paragraphs, bold, italic</div>
                        <div className="flex items-center gap-2"><ImageIcon fontSize="small" /> <strong>Image block</strong> – URLs, captions, sizes</div>
                        <div className="flex items-center gap-2"><CodeIcon fontSize="small" /> <strong>Markdown block</strong> – #, **bold**, `code`, [links]</div>
                        <div className="flex items-center gap-2"><DragIndicatorIcon fontSize="small" /> <strong>Drag & drop</strong> – From palette or on canvas</div>
                        <div className="flex items-center gap-2"><SaveIcon fontSize="small" /> <strong>Auto-save</strong> – No manual save needed</div>
                    </div>
                </div>
            </div>
        </div>
    );
}