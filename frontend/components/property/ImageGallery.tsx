interface Image {
  url: string;
  public_id: string;
}

interface ImageGalleryProps {
  images: Image[];
}

export default function ImageGallery({
  images,
}: ImageGalleryProps) {
  if (!images || images.length === 0) {
    return (
      <div className="mt-8 bg-white rounded-3xl border shadow-sm p-8">
        <h2 className="text-2xl font-bold mb-4">
          Property Images
        </h2>

        <div className="border-2 border-dashed rounded-2xl p-12 text-center">
          <p className="text-gray-500">
            No images uploaded yet.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-8 bg-white rounded-3xl border shadow-sm p-8">
      <h2 className="text-2xl font-bold mb-6">
        Property Images
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((image, index) => (
          <div
            key={image.public_id || index}
            className="overflow-hidden rounded-2xl border bg-gray-100"
          >
            <img
              src={image.url}
              alt={`Property ${index + 1}`}
              className="w-full h-64 object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
        ))}
      </div>
    </div>
  );
}