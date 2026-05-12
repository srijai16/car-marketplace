import Header from '@/components/Header'
import React, { useState, useEffect } from 'react'
import { useSearchParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import MyListing from './components/MyListing'
import Inbox from './components/Inbox'
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

      <div className='px-4 md:px-20 my-6 md:my-10'>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">

          {/* Tabs */}
          <TabsList
            className="
              w-full
              md:w-[600px]
              grid grid-cols-3
              md:flex
              md:justify-start
            "
          >
            <TabsTrigger value="my-listing" className="w-full">
              My Listing
            </TabsTrigger>

            <TabsTrigger value="inbox" className="w-full">
              Inbox
            </TabsTrigger>

            <TabsTrigger value="profile" className="w-full">
              Profile
            </TabsTrigger>
          </TabsList>

          <TabsContent value="my-listing" className="mt-6">
            <MyListing />
          </TabsContent>

          <TabsContent value="inbox" className="mt-6">
            <Inbox />
          </TabsContent>

          <TabsContent value="profile" className="mt-6">
            <ProfileUpdate />
          </TabsContent>

        </Tabs>

      </div>

      <Footer />
    </div>
  )
}