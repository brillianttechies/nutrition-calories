import React, { useState } from "react";
import { Camera, CameraResultType } from "@capacitor/camera";

const TakePhoto: React.FC = () => {
  const [photo, setPhoto] = useState<string | null>(null);

  const takePhoto = async () => {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        resultType: CameraResultType.DataUrl, // you can also use Uri or Base64
        allowEditing: false
      });

      setPhoto(image.dataUrl || null);
    } catch (error) {
      console.error("Camera error:", error);
    }
  };

  return (
    <div>
      <button
            onClick={takePhoto}
            className="bg-gradient-to-r from-indigo-600 to-green-500 text-white px-6 py-3 rounded-xl font-semibold shadow-md hover:scale-105 transform transition duration-300 ease-in-out">
            📷 Take Photo
      </button>
      {photo && (
        <div>
          <h3>Preview:</h3>
          <img src={photo} alt="Captured" style={{ width: "200px" }} />
        </div>
      )}
    </div>
  );
};

export default TakePhoto;
