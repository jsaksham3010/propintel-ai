import { MapPin, IndianRupee, Home, Ruler } from "lucide-react";

interface PropertyInfoProps {
  property: {
    title: string;
    city: string;
    state: string;
    price: number;
    area: number;
    propertyType: string;
  };
}

export default function PropertyInfo({
  property,
}: PropertyInfoProps) {
  return (
    <>
      <h1 className="text-4xl font-bold text-gray-900">
        {property.title}
      </h1>

      <div className="mt-4 flex items-center gap-2 text-gray-500">
        <MapPin size={18} />
        <span>
          {property.city}, {property.state}
        </span>
      </div>

      <div className="grid md:grid-cols-3 gap-5 mt-8">
        <div className="rounded-2xl bg-blue-50 p-5">
          <IndianRupee className="text-blue-600" />
          <p className="mt-3 text-gray-500">Price</p>
          <h3 className="text-xl font-bold">
            ₹{property.price.toLocaleString()}
          </h3>
        </div>

        <div className="rounded-2xl bg-blue-50 p-5">
          <Ruler className="text-blue-600" />
          <p className="mt-3 text-gray-500">Area</p>
          <h3 className="text-xl font-bold">
            {property.area} sq.ft
          </h3>
        </div>

        <div className="rounded-2xl bg-blue-50 p-5">
          <Home className="text-blue-600" />
          <p className="mt-3 text-gray-500">Property Type</p>
          <h3 className="text-xl font-bold">
            {property.propertyType}
          </h3>
        </div>
      </div>
    </>
  );
}