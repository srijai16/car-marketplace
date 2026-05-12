import React, { useEffect, useState } from 'react'
import { IoIosCloseCircle } from "react-icons/io";
import { supabase } from './../../../configs/supabaseClient'; // ✅ import client
import { CarImages } from '../../../configs/schema';
import { db } from '../../../configs'
import { eq } from 'drizzle-orm'
export default function UploadImages({triggerUploadImages,
  setUploading,
  existingImages = []}) {
    console.log("Listing ID:", triggerUploadImages);

    const [selectedFileList, setSelectedFileList] = useState([]);
    const [oldImages, setOldImages] = useState(existingImages);

    useEffect(() => {
        setOldImages(existingImages);
        }, [existingImages]);
    
    useEffect(()=>{
        if(triggerUploadImages){
            uploadAllImagesTOServer();
        }
    },[triggerUploadImages])
    const onFileSelected = (event) => {
        const files = event.target.files;
        for (let i = 0; i < files?.length; i++) {
            const file = files[i];
            setSelectedFileList((prev) => [...prev, file])
        }
    }

    const onImageRemove = (image) => {
        const result = selectedFileList.filter((item) => item !== image);
        setSelectedFileList(result);
    }

    // ✅ Upload All Images
    const uploadAllImagesTOServer = async () => {
    setUploading(true);

        try {
            if (selectedFileList.length > 0) {

                for (const file of selectedFileList) {
                    const fileName = `${Date.now()}-${file.name}`;

                    const { error } = await supabase.storage
                        .from('car-marketplace')
                        .upload(`cars/${fileName}`, file);

                    if (error) {
                        console.error("Upload error:", error.message);
                        continue;
                    }

                    const { data: publicUrlData } = supabase.storage
                        .from('car-marketplace')
                        .getPublicUrl(`cars/${fileName}`);

                    await db.insert(CarImages).values({
                        imageUrl: publicUrlData.publicUrl,
                        CarListingId: triggerUploadImages
                    });
                }

                setSelectedFileList([]);
            }

        } catch (err) {
            console.error("Upload failed:", err);
        }

        setUploading(false);
    };

    const removeOldImage = async (image) => {
  try {
    console.log("Deleting:", image);

    if (!image.id) {
      console.error("Image ID missing");
      return;
    }

    const filePath = image.imageUrl.split('/car-marketplace/')[1];

    await supabase.storage
      .from('car-marketplace')
      .remove([filePath]);

    await db.delete(CarImages)
      .where(eq(CarImages.id, image.id));

    setOldImages(prev => prev.filter(img => img.id !== image.id));

  } catch (err) {
    console.error("Delete failed:", err);
  }
};

    return (
        <div>
            <h2 className='font-medium text-xl my-3'>Upload Car Images</h2>

            <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3'>

                {/* OLD IMAGES */}
                {oldImages.map((image, index) => (
                    <div key={index} className='relative'>
                    <IoIosCloseCircle
                        className='absolute m-2 text-lg text-white cursor-pointer z-10'
                        onClick={() => removeOldImage(image)}
                    />
                    <img
                        src={image.imageUrl}
                        className='w-full h-[110px] object-cover rounded-xl'
                    />
                    </div>
                ))}

                {/* NEW IMAGES */}
                {selectedFileList.map((image, index) => (
                    <div key={index} className='relative'>
                    <IoIosCloseCircle
                        className='absolute m-2 text-lg text-white cursor-pointer z-10'
                        onClick={() => onImageRemove(image)}
                    />
                    <img
                        src={URL.createObjectURL(image)}
                        className='w-full h-[110px] object-cover rounded-xl'
                    />
                    </div>
                ))}

                {/* Upload Box */}
                <label htmlFor='upload-images'>
                    <div className='border rounded-xl border-dotted border-primary bg-blue-100 p-10 cursor-pointer flex items-center justify-center h-[110px]'>
                    <h2 className='text-2xl'>+</h2>
                    </div>
                </label>

                {/* IMPORTANT INPUT */}
                <input
                    type="file"
                    multiple
                    id="upload-images"
                    onChange={onFileSelected}
                    className="hidden"
                />

                </div>
        </div>
    )
}