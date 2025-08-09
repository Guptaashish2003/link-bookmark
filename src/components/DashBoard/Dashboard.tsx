import React, {useState } from "react";
import { motion } from "framer-motion";
import { Menu, Send, Lock } from "lucide-react";
import Auth from "../Auth"; // Your login card component
import { useSession } from "next-auth/react";
import { Dialog, DialogContent } from "@/components/ui/dialog"; // shadcn dialog
import { Button } from "../ui/button";
import { FeatureCardData } from "@/data";
import FeatureCard from "./FeatureCard";
import BookmarkBlock, { BookmarkBlockProps } from "./HeroCard";
import axios from "axios";
import { toast } from "sonner";
import { AnimatePresence } from "framer-motion";

interface DashboardProps {
  onToggleSidebar: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onToggleSidebar }) => {
  const session = useSession();
  const [inputValue, setInputValue] = useState<string>("");
  const [isLoginOpen, setIsLoginOpen] = useState(false); // Modal state
  const [bookmarks, setBookmarks] = useState<BookmarkBlockProps[]>([]);
  const [isBookmark, setIsBookmark] = useState(false);

  if (session.status === "loading") {
    return <div>Loading...</div>;
  }
  const userName = session?.data?.user?.name || "Guest";
  const userEmail = session?.data?.user?.email || "";
  const userInitial = userName.charAt(0).toUpperCase();
  const userFirstName = userName.split(" ")[0];

  const isAuthenticated: boolean = session.status === "authenticated";
  console.log("data....", session);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInputValue(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/bookmark", {
        url: inputValue,
        userId: session?.data?.user?.id,
      });
      if (res.data.success) {
        setInputValue(""); // Clear input after successful submission
        console.log("Bookmark added successfully:", res.data);
        setBookmarks((prev) => [...prev, res.data.bookmark]);
        setIsBookmark(true);
        toast.success("Bookmark added successfully.");
      }
    } catch (error) {
      console.error("Error adding bookmark:", error);
      toast.error("Failed to add bookmark.");
    }
  };
  // update layout after isAuthenticated is change

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-white border-b border-gray-200 lg:hidden">
        <button
          onClick={onToggleSidebar}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          aria-label="Open sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div className="flex max-md:hidden items-center space-x-2">
          <span className="text-lg font-medium text-gray-900">Valerio.ai</span>
        </div>
        {isAuthenticated ? (
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">{userName}</span>
            <div className="w-8 h-8 bg-gradient-to-r from-[#b264f0] to-[#ecd0f0] rounded-full flex items-center justify-center text-white text-sm font-medium">
              {userInitial}
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-end p-6">
            <Lock className="w-4 h-4 text-gray-500 mr-2" />
            <span
              onClick={() => setIsLoginOpen(true)}
              className="border border-gray-50 hover:text-[#b264f0] cursor-pointer text-gray-900"
            >
              Login
            </span>
          </div>
        )}
      </div>

      {/* User Info - Desktop */}
      {isAuthenticated ? (
        <div className="hidden lg:flex items-center justify-end p-6">
          <div className="flex items-center space-x-3">
            <div className="text-right">
              <div className="text-sm font-medium text-gray-900">
                {userName}
              </div>
              <div className="text-xs text-gray-500">{userEmail}</div>
            </div>
            <div className="w-10 h-10 bg-gradient-to-r from-[#b264f0] to-[#ecd0f0] rounded-full flex items-center justify-center text-white font-medium">
              {userInitial}
            </div>
          </div>
        </div>
      ) : (
        <div className="hidden lg:flex items-center justify-end p-6">
          <Lock className="w-4 h-4 text-gray-500 mr-2" />
          <span
            onClick={() => setIsLoginOpen(true)}
            className="border border-gray-50 hover:text-[#b264f0] cursor-pointer text-gray-900"
          >
            Login
          </span>
        </div>
      )}

      {/* Main Content */}
      {isBookmark ? (
        <div className="flex-1 overflow-y-auto gap-4 p-4">
          <AnimatePresence>
            {bookmarks.map((bookmark) => (
              <motion.div
                key={bookmark.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <BookmarkBlock {...bookmark} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center px-6 pb-20">
          {isAuthenticated ? (
            <motion.div
              className="text-center max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.h1
                className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-[#b264f0] to-[#ecd0f0] bg-clip-text text-transparent mb-4"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Hello {userFirstName}
              </motion.h1>
              <motion.p
                className="text-3xl lg:text-4xl text-gray-400 mb-16"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                How can I help you today?
              </motion.p>

              {/* Feature Cards */}

              <div className="grid grid-cols-1 md:grid-cols-3 text-start gap-6 mb-16">
                {FeatureCardData.map((feature, index) => (
                  <FeatureCard
                    key={feature.id}
                    icon={feature.icon}
                    title={feature.title}
                    description={feature.description}
                    delay={index * 0.1}
                  />
                ))}
              </div>
            </motion.div>
          ) : (
            <>
              <motion.h1
                className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-[#b264f0] to-[#ecd0f0] bg-clip-text text-transparent mb-4"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Hi there!👋
              </motion.h1>
              <motion.p
                className="text-3xl lg:text-4xl text-gray-400 mb-16"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                Please login to your account
              </motion.p>

              <p className="text-center text-sm text-gray-500 -mt-8">
                Join the valerius community for more insights{" "}
                <button
                  type="button"
                  className="text-purple-600 hover:text-purple-700 underline"
                  onClick={() => console.log("Join Discord clicked")}
                >
                  Join Discord
                </button>
              </p>
            </>
          )}
        </div>
      )}

      {/* Input Section */}
      <motion.div
        className="fixed bottom-0 left-0 right-0 p-6 bg-white border-t border-gray-200 lg:static lg:border-t-0 lg:bg-transparent lg:p-6"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSubmit} className="relative">
            <input
              type="text"
              placeholder="Share link..."
              value={inputValue}
              onChange={handleInputChange}
              className="w-full px-6 py-4 pr-14 text-lg bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-lg"
            />
            <Button
              type="submit"
              onClick={() => {
                !isAuthenticated && setIsLoginOpen(true);
              }}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2 bg-gradient-to-r from-[#b264f0] to-[#ecd0f0] rounded-xl text-white hover:shadow-lg transition-shadow"
              aria-label="Send message"
            >
              <Send className="w-5 h-5" />
            </Button>
          </form>
          <p className="text-center text-sm text-gray-500 mt-4">
            Join the valerius community for more insights{" "}
            <button
              type="button"
              className="text-purple-600 hover:text-purple-700 underline"
              onClick={() => console.log("Join Discord clicked")}
            >
              Join Discord
            </button>
          </p>
        </div>
      </motion.div>

      {/* ShadCN Login Modal */}
      <Dialog open={isLoginOpen} onOpenChange={setIsLoginOpen}>
        <DialogContent className="sm:max-w-md">
          <Auth setIsLoginOpen={setIsLoginOpen} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Dashboard;
