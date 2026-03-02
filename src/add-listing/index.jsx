import Header from '@/components/Header'
import React, { useEffect, useState } from 'react'
import carDetails from './../Shared/carDetails.json'
import InputField from './components/InputField'
import DropdownField from './components/DropdownField'
import TextArea from './components/TextArea'
import { Separator } from '@/components/ui/separator'
import features from './../Shared/features.json'
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from '@/components/ui/button'
import { CarImages, CarListing } from './../../configs/schema'
import { db } from './../../configs'
import IconField from './components/IconField'
import UploadImages from './components/UploadImages'
import { useNavigate, useNavigation, useSearchParams } from 'react-router-dom'
import { eq } from 'drizzle-orm'
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import moment from 'moment/moment'
import Service from '@/Shared/Service'



export default function AddListing() {
    const { user } = useContext(AuthContext);
    const [formData,setFormData]=useState([]);
    const[featuresData,setFeaturesData]=useState([]);
    const[triggerUploadImages,setTriggerUploadImages]=useState();
    const [searchParams]=useSearchParams();
    const [uploading, setUploading] = useState(false);
    const[carInfo,setCarInfo]=useState();
    const navigate=useNavigate();
    const mode=searchParams.get('mode');
    const recordId=searchParams.get('id');

    useEffect(()=>{
        if(mode=='edit'){
            GetListingDetail();
        }
    },[]);

    const GetListingDetail=async()=>{
        const result=await db.select().from(CarListing)
        .leftJoin(CarImages, eq(CarListing.id, CarImages.CarListingId))
        .where(eq(CarListing.id,recordId));
        const resp=Service.FormatResult(result);
        console.log(resp);
        setCarInfo(resp[0]);
        setFormData(resp[0]);
        setFeaturesData(resp[0].features);
    }

    const handleInputChange=(name,value)=>{
        setFormData((prevData)=>({
            ...prevData,
            [name]:value
        }))
        console.log(formData);
    }
    const handleFeatureChange=(name,value)=>{
        setFeaturesData((prevData)=>({
            ...prevData,
            [name]:value
        }))
    }
    const onSubmit = async (e) => {
        e.preventDefault();
        setUploading(true);

        if (mode === 'edit') {

            const result = await db
            .update(CarListing)
            .set({
                ...formData,
                features: featuresData,
                createdBy: user?.email,
                postedOn: moment().format('DD/MM/YYYY')
            })
            .where(eq(CarListing.id, recordId))
            .returning({ id: CarListing.id });

            if (result) {
            // 🔥 Trigger image upload for edit mode
            setTriggerUploadImages(recordId);
            }

        } else {

            try {
            const result = await db
                .insert(CarListing)
                .values({
                ...formData,
                features: featuresData,
                createdBy: user?.email,
                postedOn: moment().format('DD/MM/YYYY')
                })
                .returning({ id: CarListing.id });

            if (result) {
                setTriggerUploadImages(result[0]?.id);
            }

            } catch (e) {
            console.log("error", e);
            setUploading(false);
            }
        }
        };
  return (
    <div>
        <Header/>
        <div className='px-10 md:px-20 my-10'>
            <h2 className='font-bold text-4xl'>Add New Listing</h2>
            <form className='p-10 border rounded-xl mt-10'>
                {/* car details*/}
                <div>
                    <h2 className='font-medium text-3xl mb-6'>Car Details</h2>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                        {carDetails.carDetails.map((item,index)=>(
                         <div key={index}>
                            <label className='text-sm flex gap-2 items-center mb-2'>
                                <IconField icon={item?.icon}/>
                                {item?.label} 
                                {item.required && <span className='text-red-500'>*</span>}
                            </label>
                            {item.fieldType=='text'||item.fieldType=='number'
                            ?<InputField item={item} handleInputChange={handleInputChange} carInfo={carInfo}/>
                            :item.fieldType=='dropdown'?<DropdownField item={item} handleInputChange={handleInputChange} carInfo={carInfo}/>
                            :item.fieldType=='textarea'?<TextArea item={item} handleInputChange={handleInputChange} carInfo={carInfo}/>
                            :null}
                        </div>
                    ))}
                    </div>
                </div>
                <Separator className='my-6'/>
                {/* features list*/}
                <div>
                    <h2 className='font-medium text-xl my-6'>Features</h2>
                    <div className='grid grid-cols-2 md:grid-cols-3 gap-2'>
                        {features.features.map((item,index)=>(
                        <div key={index} className='flex gap-2 items-center'>
                            <Checkbox onCheckedChange={(value)=>handleFeatureChange(item.name,value)}
                                checked={featuresData?.[item.name]}/>
                                <h2>{item.label}</h2>
                        </div>
                    ))}
                    </div>

                </div>
                {/* images*/}
                <Separator className='my-6'/>
                    <UploadImages
                    triggerUploadImages={triggerUploadImages}
                    setUploading={(v)=>{
                    setUploading(v);
                    if(!v){
                        navigate('/profile');
                    }
                    }}
                    existingImages={carInfo?.images || []}
                    />
                <div className='mt-10 flex justify-end'>
                    <Button onClick={(e)=>onSubmit(e)} disabled={uploading}>
                        {uploading ? "Uploading..." : "Upload"}
                    </Button>
                </div>
            </form>
        </div>

    </div>
  )
}
