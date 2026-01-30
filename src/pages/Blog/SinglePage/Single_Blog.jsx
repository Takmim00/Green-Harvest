import React, { useState } from "react";
import MainContent from "./MainContent";
import Sidebar from "./Sidebar";

const Single_Blog = () => {
      const [searchTerm, setSearchTerm] = useState('');
  return (
    <div>
      <div className="flex-1 w-full max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col lg:flex-row gap-16">
          {/* Left Column: Feed */}
          <MainContent />

          {/* Right Column: Widgets */}
          <Sidebar onSearch={setSearchTerm}/>
        </div>
      </div>
    </div>
  );
};

export default Single_Blog;
