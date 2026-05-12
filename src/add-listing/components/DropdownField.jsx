import React from 'react'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function DropdownField({item,handleInputChange,carInfo}) {
  return (
    <div>
        <Select onValueChange={(value)=>handleInputChange(item.name,value)} required={item.required} defaultValue={carInfo?.[item?.name]}>
        <SelectTrigger className="w-full">
            <SelectValue placeholder={carInfo?.[item?.name]?carInfo?.[item?.name]:item.label} />
        </SelectTrigger>
        <SelectContent>
            <SelectGroup>
           
            {item?.options?.map((option,index)=>(
                <SelectItem value={option}>{option}</SelectItem>
            ))}
            </SelectGroup>
        </SelectContent>
        </Select>
    </div>
  )
}
