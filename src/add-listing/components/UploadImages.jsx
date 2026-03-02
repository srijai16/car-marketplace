import React, { useEffect, useState } from 'react'
import { IoIosCloseCircle } from "react-icons/io";
import { supabase } from './../../../configs/supabaseClient'; // ✅ import client
import { CarImages } from '../../../configs/schema';
import { db } from '../../../configs'
export default function UploadImages({triggerUploadImages,setUploading}) {
    console.log("Listing ID:", triggerUploadImages);

    const [selectedFileList, setSelectedFileList] = useState([]);
    
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
        if (selectedFileList.length === 0) return;

        setUploading(true);

        for (const file of selectedFileList) {
            const fileName = `${Date.now()}-${file.name}`;

            const { data, error } = await supabase.storage
                .from('car-marketplace')
                .upload(`cars/${fileName}`, file);

            if (error) {
                console.error("Upload error:", error.message);
            } else {
                console.log("Uploaded:", data);

                // Get public URL
                const { data: publicUrlData } = supabase.storage
                    .from('car-marketplace')
                    .getPublicUrl(`cars/${fileName}`);

                console.log("Public URL:", publicUrlData.publicUrl);
                await db.insert(CarImages).values({
                imageUrl: publicUrlData.publicUrl,
                CarListingId: triggerUploadImages
                });
                
            }
        }

        setUploading(false);
        
    }

    return (
        <div>
            <h2 className='font-medium text-xl my-3'>Upload Car Images</h2>

            <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3'>
                {selectedFileList.map((image, index) => (
                    <div key={index} className='relative'>
                        <IoIosCloseCircle
                            className='absolute m-2 text-lg text-white cursor-pointer'
                            onClick={() => onImageRemove(image)}
                        />
                        <img
                            src={URL.createObjectURL(image)}
                            className='w-full h-[110px] object-cover rounded-xl'
                        />
                    </div>
                ))}

                <label htmlFor='upload-images'>
                    <div className='border rounded-xl border-dotted border-primary bg-blue-100 p-10 cursor-pointer'>
                        <h2 className='text-lg text-center'>+</h2>
                    </div>
                </label>

                <input
                    type="file"
                    multiple
                    id='upload-images'
                    onChange={onFileSelected}
                    className='hidden'
                />
            </div>

            {/* Upload Button 
            {selectedFileList.length > 0 && (
                <button
                    onClick={uploadAllImages}
                    disabled={uploading}
                    className='mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg'
                >
                    {uploading ? "Uploading..." : "Upload Images"}
                </button>
            )}*/}
        </div>
    )
}