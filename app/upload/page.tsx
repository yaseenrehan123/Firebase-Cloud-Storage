import React from 'react'
import UploadFormSection from "@/features/upload/UploadFormSection";
const UploadPage = () => {
    return (
        <div className="w-screen h-screen bg-neutral-900 pt-3">
            <div className="flex items-center flex-col">
                <UploadFormSection />
            </div>
        </div>
    )
}

export default UploadPage