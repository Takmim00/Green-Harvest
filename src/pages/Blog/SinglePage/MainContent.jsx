import { MessageCircle, Tag, User } from "lucide-react";
import React from "react";

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

const MainContent = () => {
  const post = BLOG_POSTS[0];
  return (
    <div className="flex-1 space-y-10">
      {/* Main Article Card */}
      <article className=" overflow-hidden transition-all duration-500">
        <div className="relative group overflow-hidden h-[450px] rounded">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-[1.5s]"
          />
        </div>

        <div className="p-5">
          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-400 mb-6">
            <div className="flex items-center gap-2 group cursor-pointer">
              <Tag size={16} className="text-green-500" />
              <span className="group-hover:text-green-600 transition-colors">
                By {post.author}
              </span>
            </div>
            <div className="flex items-center gap-2 group cursor-pointer">
              <User size={16} className="text-green-500" />
              <span className="group-hover:text-green-600 transition-colors">
                By {post.author}
              </span>
            </div>
            <div className="flex items-center gap-2 group cursor-pointer">
              <MessageCircle size={16} className="text-green-500" />
              <span className="group-hover:text-green-600 transition-colors">
                {post.comments} Comments
              </span>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
};

export default MainContent;
