import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Customad = () => {
  return (
    <div className="w-full relative group">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
      <div className="relative">
        <Link 
          className="block rounded-lg overflow-hidden"
          target="_blank" 
          href="https://techhodu.com/our_services/simplifying-food-labeling-iso-220002018-audits-documents/"
        >
          <Image
            className="w-full rounded-lg transform transition duration-500 group-hover:scale-105"
            width={400}
            height={200}
            alt="food regulation"
            src="https://res.cloudinary.com/khabartaazgi/image/upload/v1739522642/food_safety_for_khabartaazgi_g2mjaq.jpg"
          />
        </Link>
      </div>
    </div>
  );
};

export default Customad;