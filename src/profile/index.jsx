import Header from '@/components/Header'
import { Button } from '@/components/ui/button'
import React from 'react'
import { Link } from 'react-router-dom'
import MyListing from './components/MyListing'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Inbox from './components/inbox'
import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import ProfileUpdate from './components/Profile'
import Footer from '@/components/Footer'
export default function Profile() {
      const [searchParams] = useSearchParams();
    const tabFromUrl = searchParams.get("tab") || "my-listing";

    const [activeTab, setActiveTab] = useState(tabFromUrl);

    useEffect(() => {
      setActiveTab(tabFromUrl);
    }, [tabFromUrl]);
      return (
    <div>
        <Header />
        <div className='px-10 md:px-20 my-10'>
         <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
  <TabsList className="w-[600px] flex justify-start">
    <TabsTrigger value="my-listing">My Listing</TabsTrigger>
    <TabsTrigger value="inbox">Inbox</TabsTrigger>
    <TabsTrigger value="profile">Profile</TabsTrigger>
  </TabsList>

  <TabsContent value="my-listing">
    <MyListing />
  </TabsContent>

  <TabsContent value="inbox">
    <Inbox />
  </TabsContent>

  <TabsContent value="profile">
    <ProfileUpdate/>
  </TabsContent>
</Tabs>
            
        </div>
        <Footer/>
    </div>
  )
}
