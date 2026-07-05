import Alignment from "@/components/ui/general/alignment";
import UploadForm from "./UploadForm"
import { auth } from "@clerk/nextjs/server"
import Link from "next/link";
import UnauthorizedPrompt from "../general/UnauthorizedPrompt";
const UploadSection = async () => {
    const { userId } = await auth();
    if (!userId) return (
        <UnauthorizedPrompt />
    )
    return (
        <div className="flex items-center flex-col">
            < UploadForm />
        </div>
    )
}

export default UploadSection