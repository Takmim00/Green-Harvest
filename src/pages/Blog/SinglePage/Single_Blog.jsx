import React, { useState } from "react";
import MainContent from "./MainContent";
import Sidebar from "./Sidebar";

const BLOG_POSTS = [
  {
    id: "1",
    title:
      "Curabitur porttitor orci eget neque accumsan venenatis. Nunc fermentum.",
    excerpt:
      "Curabitur porttitor orci eget neque accumsan venenatis. Nunc fermentum.",
    date: "18",
    month: "NOV",
    category: "Food",
    author: "Admin",
    comments: 65,
    image:
      "https://images.unsplash.com/photo-1557800636-894a64c1696f?w=600&h=450&fit=crop", // Citrus
  },
  {
    id: "2",
    title:
      "Curabitur porttitor orci eget neque accumsan venenatis. Nunc fermentum.",
    excerpt:
      "Curabitur porttitor orci eget neque accumsan venenatis. Nunc fermentum.",
    date: "18",
    month: "NOV",
    category: "Food",
    author: "Admin",
    comments: 65,
    image:
      "https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=600&h=450&fit=crop", // Lemon light bulb vibe
  },
  {
    id: "3",
    title:
      "Curabitur porttitor orci eget neque accumsan venenatis. Nunc fermentum.",
    excerpt:
      "Curabitur porttitor orci eget neque accumsan venenatis. Nunc fermentum.",
    date: "18",
    month: "NOV",
    category: "Food",
    author: "Admin",
    comments: 65,
    image:
      "https://images.unsplash.com/photo-1518843875459-f738682238a6?w=600&h=450&fit=crop", // Veggies
  },
  {
    id: "4",
    title:
      "Curabitur porttitor orci eget neque accumsan venenatis. Nunc fermentum.",
    excerpt:
      "Curabitur porttitor orci eget neque accumsan venenatis. Nunc fermentum.",
    date: "18",
    month: "NOV",
    category: "Food",
    author: "Admin",
    comments: 65,
    image: "https://www.youtube.com/watch?v=1IszT_guI08",
  },
  {
    id: "5",
    title:
      "Curabitur porttitor orci eget neque accumsan venenatis. Nunc fermentum.",
    excerpt:
      "Curabitur porttitor orci eget neque accumsan venenatis. Nunc fermentum.",
    date: "18",
    month: "NOV",
    category: "Food",
    author: "Admin",
    comments: 65,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/5/53/Bowl_Of_Fresh_%2815445955%29.jpeg", // Peppers
  },
  {
    id: "6",
    title:
      "Curabitur porttitor orci eget neque accumsan venenatis. Nunc fermentum.",
    excerpt:
      "Curabitur porttitor orci eget neque accumsan venenatis. Nunc fermentum.",
    date: "18",
    month: "NOV",
    category: "Food",
    author: "Admin",
    comments: 65,
    image:
      "https://images.unsplash.com/photo-1557800636-894a64c1696f?w=600&h=450&fit=crop", // Oranges branch
  },
  {
    id: "7",
    title:
      "Curabitur porttitor orci eget neque accumsan venenatis. Nunc fermentum.",
    excerpt:
      "Curabitur porttitor orci eget neque accumsan venenatis. Nunc fermentum.",
    date: "18",
    month: "NOV",
    category: "Food",
    author: "Admin",
    comments: 65,
    image:
      "https://images.unsplash.com/photo-1582979512210-99b6a53386f9?w=600&h=450&fit=crop", // Orange fruit
  },
  {
    id: "8",
    title:
      "Curabitur porttitor orci eget neque accumsan venenatis. Nunc fermentum.",
    excerpt:
      "Curabitur porttitor orci eget neque accumsan venenatis. Nunc fermentum.",
    date: "18",
    month: "NOV",
    category: "Food",
    author: "Admin",
    comments: 65,
    image:
      "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=600&h=450&fit=crop", // Strawberry
  },
];

const Single_Blog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <div>
      <div className="flex-1 w-full max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col lg:flex-row gap-16">
          {/* Left Column: Feed */}
          <MainContent post={BLOG_POSTS[0]}/>

          {/* Right Column: Widgets */}
          <Sidebar onSearch={setSearchTerm} post={BLOG_POSTS}/>
        </div>
      </div>
    </div>
  );
};

export default Single_Blog;
