import React from 'react'
import { Textarea } from "@/components/ui/textarea"
export default function TextArea({item,handleInputChange}) {
  return (
    <div>
        <Textarea onChange={(e)=>handleInputChange(item.name,e.target.value)} required={item.required} />
    </div>
  )
}
