'use client';

import Image from 'next/image';
import { FaTrash } from 'react-icons/fa';
import { BiImageAdd } from 'react-icons/bi';
import { CldUploadWidget } from 'next-cloudinary';

interface ImageUploadProps {
  images?: string[];
  onUpload: (url: string) => void;
  onRemove: (url: string) => void;
  disabled?: boolean;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  images = [],
  onUpload,
  onRemove,
  disabled,
}) => {
  return (
    <div>
      <div className="mb-4 flex items-center gap-4">
        {images.map((url) => (
          <div
            key={url}
            className="relative w-[200px] h-[200px] rounded-md overflow-hidden"
          >
            <div className="z-10 absolute top-2 right-2">
              <button
                className="btn"
                type="button"
                disabled={disabled}
                onClick={() => onRemove(url)}
              >
                <FaTrash />
              </button>
            </div>
            <Image fill className="object-cover" alt="Image" src={url} />
          </div>
        ))}
      </div>
      <CldUploadWidget
        options={{
          resourceType: 'image',
        }}
        onUpload={(s: any) => onUpload(s.info.secure_url)}
        uploadPreset="tkwks7ba"
      >
        {({ open }) => {
          return (
            <button
              className="btn btn-neutral"
              disabled={disabled}
              onClick={(e) => {
                e.preventDefault();
                open();
              }}
            >
              <BiImageAdd className="text-xl" />
              Upload an Image
            </button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
};

export default ImageUpload;
