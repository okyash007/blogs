import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { makePostRequest } from "../../../utils/apis/makePostRequest";
import { backend_url } from "../../../utils/constant";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FiUser } from "react-icons/fi";
import { Label } from "@/components/ui/label";
import { MdEdit } from "react-icons/md";
import { CirCleLoader } from "../../../components/Loaders";

const CLOUD_NAME = "duslrhgcq";
const UPLOAD_PRESET = "zyxcfmzj";

const ImageUpload = ({ image, setImage }) => {
  const [localImage, setLocalImage] = useState(image);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLoading(true);
      setLocalImage(URL.createObjectURL(file));
      uploadImage(file);
    }
  };

  async function uploadImage(file) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    const result = await response.json();
    console.log(result);
    setLoading(false);
    if (result.url) {
      setImage(result.url);
    } else {
      setLocalImage(image);
    }
  }

  return (
    <div className="relative w-max">
      <Avatar className="h-28 w-28">
        <AvatarImage src={localImage} className="object-cover" />
        <AvatarFallback>
          <FiUser size={55} />
        </AvatarFallback>
      </Avatar>

      {loading && (
        <div className="absolute top-0 left-0 h-28 w-28 flex justify-center items-center bg-[#0000003a]">
          <CirCleLoader size="50" stroke="5" color="white" />
        </div>
      )}

      <div className="absolute bottom-0 right-0">
        <Label htmlFor="picture">
          <div className="bg-white rounded-full p-2 shadow-md">
            <MdEdit size={25} color="black" />
          </div>
        </Label>

        <Input
          className="hidden"
          id="picture"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />
      </div>
    </div>
  );
};

export default ImageUpload;
