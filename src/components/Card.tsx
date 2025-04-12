import { TimerIcon, Users } from "lucide-react";

const Card = ({
  title,
  desc,
  img,
}: {
  title: string;
  desc: string;
  img?: string;
}) => {
  return (
    <div className="flex flex-col bg-white border rounded-lg shadow-md">
      
        <img
          src={
            img
              ? img
              : "https://images.pexels.com/photos/5882866/pexels-photo-5882866.jpeg?auto=compress&cs=tinysrgb&w=1200"
          }
          alt="Exoplanet Detection"
          className="w-full h-60 rounded-t-lg object-cover "
        />

      <div className="px-8 py-4">
        <h3 className="text-xl font-bold mb-2 mt-2">{title}</h3>
        <p className="text-gray-600 mb-4">{desc}</p>
        <div className="flex justify-between my-1 items-center">
          <div className="flex items-center">
            <TimerIcon className="h-4 w-4 mr-1" />
            <span className="m-auto ">12 weeks</span>
          </div>
          <div className="font-light text-gray-700 flex items-center">
            <Users className="h-4 w-4 mr-1" />
            <span className="m-auto ">1233 students</span>
          </div>
        </div>
        <a
          href="/projects/exoplanet-detection"
          className="inline-block w-full text-center mt-4 mb-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Learn More
        </a>
      </div>
    </div>
  );
};

export default Card;
