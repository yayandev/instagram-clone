"use client";
// Import library yang diperlukan
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

// Buat tipe data untuk objek story
interface Story {
  id: number;
  image: string;
  username: string;
}

// Komponen Stories
const Stories = () => {
  // Data stories dengan tipe Story[]
  const stories: Story[] = [
    {
      id: 1,
      image: "/default-pp.png",
      username: "user1",
    },
    {
      id: 2,
      image: "/default-pp.png",
      username: "user2",
    },
    {
      id: 3,
      image: "/default-pp.png",
      username: "user3",
    },
    {
      id: 4,
      image: "/default-pp.png",
      username: "user4",
    },
    {
      id: 5,
      image: "/default-pp.png",
      username: "user5",
    },
    {
      id: 6,
      image: "/default-pp.png",
      username: "user6",
    },
    {
      id: 7,
      image: "/default-pp.png",
      username: "user7",
    },
    {
      id: 8,
      image: "/default-pp.png",
      username: "user8",
    },
    {
      id: 9,
      image: "/default-pp.png",
      username: "user9",
    },
    {
      id: 10,
      image: "/default-pp.png",
      username: "user10",
    },
    {
      id: 11,
      image: "/default-pp.png",
      username: "user11",
    },
    {
      id: 12,
      image: "/default-pp.png",
      username: "user12",
    },
    {
      id: 13,
      image: "/default-pp.png",
      username: "user13",
    },
    {
      id: 14,
      image: "/default-pp.png",
      username: "user14",
    },
  ];

  // State currentIndex dengan tipe number
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  // Ref containerRef dengan tipe HTMLDivElement | null
  const containerRef = useRef<HTMLDivElement | null>(null);

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

  // Fungsi nextStory dan prevStory
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
            <Link href={"#"} key={index}>
              <div
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
