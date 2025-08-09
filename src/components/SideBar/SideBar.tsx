
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Compass, 
  BookOpen, 
  FolderOpen, 
  History, 
  MessageSquare,

  ChevronRight,
  X,
  LucideIcon
} from 'lucide-react';
interface MenuItem {
  icon: LucideIcon;
  label: string;
  active?: boolean;
}

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}
const Sidebar: React.FC<SidebarProps> = ({ isOpen, onToggle }) => {
  const menuItems: MenuItem[] = [
    { icon: Compass, label: 'Explore', active: true },
    { icon: BookOpen, label: 'Library' },
    { icon: FolderOpen, label: 'Files' },
    { icon: History, label: 'History' }
  ];

  const recentChats: string[] = [
    'Brainstorming small busine...',
    'The history of roman empire',
    'Crypto investment suggestion...'
  ];

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          initial={{ x: -300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -300, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 lg:static lg:inset-0"
        >
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-[#b264f0] to-[#ecd0f0] rounded-lg flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-white" />
                </div>
                <span className="text-lg font-medium text-gray-900">LinkGpt.ai</span>
              </div>
              <button
                onClick={onToggle}
                className="lg:hidden p-1 rounded-lg hover:bg-gray-100 transition-colors"
                aria-label="Close sidebar"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Version Selector */}
            <div className="px-4 py-2">
              <select className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
                <option>LinkGpt V 1.2</option>
              </select>
            </div>

            {/* Search */}
            <div className="px-4 py-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search chat"
                  className="w-full pl-10 pr-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>

            {/* Menu Items */}
            <div className="px-4 py-4 space-y-1">
              {menuItems.map((item: MenuItem, index: number) => (
                <motion.button
                  key={item.label}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full flex items-center space-x-3 px-3 py-2 text-sm rounded-lg transition-colors ${
                    item.active 
                      ? 'bg-gray-900 text-white' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </motion.button>
              ))}
            </div>

            {/* Recent Chats */}
            <div className="px-4 py-4 flex-1">
              <h3 className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-3">
                RECENT CHATS
              </h3>
              <div className="space-y-1">
                {recentChats.map((chat: string, index: number) => (
                  <motion.button
                    key={index}
                    whileHover={{ x: 4 }}
                    className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-gray-600 rounded-lg hover:bg-gray-100 transition-colors text-left"
                  >
                    <MessageSquare className="w-4 h-4 flex-shrink-0" />
                    <span className="truncate">{chat}</span>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Upgrade Section */}
            <motion.div 
              className="m-4 p-4 bg-gradient-to-r from-[#b264f0] to-[#ecd0f0] rounded-xl"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-white">Upgrade to</span>
                <span className="px-2 py-1 text-xs font-bold text-purple-900 bg-white rounded">PRO</span>
              </div>
              <p className="text-xs text-purple-100 mb-3">
                Upgrade for image uploads, smarter AI, and more Pro Search.
              </p>
              <button className="flex items-center justify-between w-full text-sm text-white hover:text-purple-100 transition-colors">
                Learn More
                <ChevronRight className="w-4 h-4" />
              </button>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Sidebar;