import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router';
import Navbar from '../shared/Navbar';
import Footer from '../shared/Footer';
import { 
  LayoutDashboard, 
  ClipboardList, 
  Heart, 
  ShoppingCart, 
  Settings, 
  LogOut,
  Menu,
  X
} from 'lucide-react';

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const menuItems = [
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/dashboard/order-history', label: 'Order History', icon: ClipboardList },
    { path: '/dashboard/wishlist', label: 'Wishlist', icon: Heart },
    { path: '/dashboard/shopping-cart', label: 'Shopping Cart', icon: ShoppingCart },
    { path: '/dashboard/settings', label: 'Settings', icon: Settings },
  ];

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className="overflow-x-hidden">
      <Navbar />
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden flex items-center gap-2 text-gray-700 font-medium mb-4"
            >
              {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
              <span>Navigation</span>
            </button>

            {/* Sidebar */}
            <aside className={`
              ${sidebarOpen ? 'block' : 'hidden'} 
              lg:block 
              w-full lg:w-56 
              bg-white 
              rounded-lg 
              h-fit
              shrink-0
              shadow-sm
            `}>
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Navigation</h2>
              </div>
              <nav className="p-4 space-y-1">
                {menuItems.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    end={item.path === '/dashboard'}
                    onClick={() => setSidebarOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                        isActive
                          ? 'bg-[#00B250] text-white shadow-sm'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`
                    }
                  >
                    <item.icon size={20} />
                    <span>{item.label}</span>
                  </NavLink>
                ))}
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  <LogOut size={20} />
                  <span>Log-out</span>
                </button>
              </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 min-w-0">
              <Outlet />
            </main>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DashboardLayout;
