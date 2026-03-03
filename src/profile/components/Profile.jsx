import React from 'react'

export default function Profile() {
  return (
    <div>Profile</div>
  )
}
import { useSearchParams } from "react-router-dom";

const [searchParams] = useSearchParams();
const tab = searchParams.get("tab") || "my-listing";

const [activeTab, setActiveTab] = useState(tab);
