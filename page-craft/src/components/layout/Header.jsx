import { Link } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

export default function Header() {
    return (
        <header className="bg-white border-b border-ink-100 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-brand flex items-center justify-center">
                            <span className="text-white font-display font-bold">P</span>
                        </div>
                        <span className="font-display font-semibold text-ink-900 text-lg">PageCraft</span>
                    </Link>

                    {/* Navigation with MUI icons */}
                    <nav className="flex items-center gap-6">
                        <Link to="/" className="flex items-center gap-1 text-ink-600 hover:text-brand transition">
                            <DashboardIcon fontSize="small" />
                            <span>Dashboard</span>
                        </Link>
                        <Link to="/how-to-use" className="flex items-center gap-1 text-ink-600 hover:text-brand transition">
                            <HelpOutlineIcon fontSize="small" />
                            <span>How to Use</span>
                        </Link>
                    </nav>
                </div>
            </div>
        </header>
    );
}