import React from 'react'

const PageContainer = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="w-screen min-h-screen bg-neutral-900 pt-12">
            <div className="flex items-center flex-col">
                {children}
            </div>
        </div>
    )
}

export default PageContainer