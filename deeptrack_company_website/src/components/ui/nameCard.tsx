import React from 'react';

interface NameCardProps {
  firstName: string;
  lastName: string;
  date: string;
}

const NameCard: React.FC<NameCardProps> = ({ firstName, lastName, date }) => {
  return (
    <div className="flex items-center space-x-4 mt-6 mb-6"> {/* Added margin-top and margin-bottom */}
      {/* Grey Circle on the left */}
      <div className="w-16 h-16 bg-gray-500 rounded-full flex items-center justify-center text-white text-xl">
        {/* Circle content can be initials or an avatar */}
        {firstName[0]}{lastName[0]} {/* Initials from first and last name */}
      </div>

      {/* First Name, Last Name and Date on the right */}
      <div className="flex flex-col">
        <span className="text-lg font-light text-black">
          {firstName} {lastName}
        </span> {/* First Name and Last Name on the same line */}
        <span className="text-sm text-gray-600 mt-1">{date}</span> {/* Date */}
      </div>
    </div>
  );
};

export default NameCard;
