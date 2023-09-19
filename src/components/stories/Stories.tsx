"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const Stories = () => {
  const stories = [
    {
      id: 1,
      image: "/user.jpg",
      username: "user1",
    },
    {
      id: 2,
      image: "/user.jpg",
      username: "user2",
    },
    {
      id: 3,
      image: "/user.jpg",
      username: "user3",
    },
    {
      id: 4,
      image: "/user.jpg",
      username: "user4",
    },
    {
      id: 5,
      image: "/user.jpg",
      username: "user5",
    },
    {
      id: 6,
      image: "/user.jpg",
      username: "user6",
    },
    {
      id: 7,
      image: "/user.jpg",
      username: "user7",
    },
    {
      id: 8,
      image: "/user.jpg",
      username: "user8",
    },
    {
      id: 9,
      image: "/user.jpg",
      username: "user9",
    },
    {
      id: 10,
      image: "/user.jpg",
      username: "user10",
    },
    {
      id: 11,
      image: "/user.jpg",
      username: "user11",
    },
    {
      id: 12,
      image: "/user.jpg",
      username: "user12",
    },
    {
      id: 13,
      image: "/user.jpg",
      username: "user13",
    },
  ];
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef(null);

  // Efek samping untuk mengatur posisi scroll saat currentIndex berubah
  useEffect(() => {
    if (containerRef.current) {
      const scrollX = currentIndex * 72; // 72 adalah lebar satu elemen cerita (sesuaikan dengan kebutuhan Anda)
      containerRef.current.scrollTo({
        left: scrollX,
        behavior: "smooth", // Anda dapat mengubah menjadi "auto" jika ingin tanpa animasi
      });
    }
  }, [currentIndex]);
  const nextStory = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === stories.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevStory = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? stories.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="flex gap-3 items-center">
      <button onClick={prevStory} className="text-gray-500">
        &lt;
      </button>
      <div
        className="p-3  w-full overflow-x-scroll scroll-smooth scroll-hide"
        ref={containerRef}
      >
        <div className="flex space-x-4">
          {stories.map((story, index) => (
            <Link href={"#"}>
              <div
                key={index}
                className={`w-16 h-16 flex-shrink-0 rounded-full overflow-hidden border-2 ${
                  index === currentIndex
                    ? "border-yellow-400"
                    : "border-gray-200"
                }`}
              >
                <img
                  src={story.image}
                  alt={story.username}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-xs text-center">{story.username}</p>
            </Link>
          ))}
        </div>
      </div>
      <button onClick={nextStory} className="text-gray-500">
        &gt;
      </button>
    </div>
  );
};

export default Stories;
