import { Link, useLocation } from 'react-router-dom';
import { Film, Home, Users, Search, Bookmark } from 'lucide-react';

const Navbar = () => {
    const location = useLocation();

    const navItems = [
        { path: '/', label: 'Home', icon: <Home size={20} /> },
        { path: '/movies', label: 'Browse', icon: <Search size={20} /> },
        { path: '/your-space', label: 'Your Space', icon: <Users size={20} /> },
        { path: '/watchlist', label: 'Watchlist', icon: <Bookmark size={20} /> },
    ];

    return (
        <nav className="fixed top-0 left-0 w-full bg-background/80 backdrop-blur-md z-50 border-b border-secondary">
            <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
                <Link to="/" className="flex items-center gap-2 text-primary font-bold text-2xl">
                    <Film size={28} />
                    <span>YourWatch</span>
                </Link>

                <div className="flex gap-8">
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`flex items-center gap-2 hover:text-primary transition-colors ${location.pathname === item.path ? 'text-primary' : 'text-gray-400'
                                }`}
                        >
                            {item.icon}
                            <span className="hidden sm:inline">{item.label}</span>
                        </Link>
                    ))}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
