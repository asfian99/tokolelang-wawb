import React, { useState } from "react";

interface UploadImageProps {
  fileInputRef?: React.MutableRefObject<HTMLInputElement | null>;
  img: {
    selectedImg: any;
    setSelectedImg: React.Dispatch<React.SetStateAction<any>>;
  };
}

const UploadImage = (props: UploadImageProps) => {
  const [fileInputState, setFileInputState] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      // console.log(file);
      props.img.setSelectedImg(file);
      setFileInputState(e.target.value);
    }
  };

  return (
    <div>
      <label
        className="block mb-2 text-sm font-medium text-gray-900"
        htmlFor="item_image"
        // onClick={props.onClickHandler}
      >
        Upload Foto Barang
      </label>
      <input
        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none focus:border-transparent"
        aria-describedby="item_image_help"
        name="itemImage"
        id="item_image"
        type="file"
        onChange={handleFileInputChange}
        value={fileInputState}
      />
    </div>
  );
};

export default UploadImage;
