import { useState } from "react";

function MultipleImageInputField({ setImages, title, existingImages = [] }) {

  const [previews, setPreviews] = useState(existingImages);

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    const previewURLs = files.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));

    setImages((prev) => [...prev, ...files]);
    setPreviews((prev) => [...prev, ...previewURLs]);
  };

  const handleRemove = (index) => {
    const updatedPreviews = previews.filter((_, i) => i !== index);
    const updatedFiles = updatedPreviews.map((item) => item.file);
    setPreviews(updatedPreviews);
    setImages(updatedFiles);
  };

  return (
    <div className="w-full h-full">
      {title && <h1 className="font-poppins mb-2">{title}</h1>}
      <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-md cursor-pointer hover:border-gray-400 mb-4">
        <input
          type="file"
          multiple
          accept="image/*,video/*"
          className="hidden"
          onChange={handleImageChange}
        />
        <span className="text-gray-500 text-xs md:text-sm">Click to upload single/multiple images</span>
      </label>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {previews.map((item, index) => (
          <div key={index} className="relative">
            <img
              src={item.url}
              alt={`preview-${index}`}
              className="w-full h-40 object-cover rounded-md border"
            />
            <button
              onClick={() => handleRemove(index)}
              className="absolute top-1 right-1 bg-white rounded-full text-red-500 hover:text-red-700 p-1 shadow"
              title="Remove"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MultipleImageInputField;
