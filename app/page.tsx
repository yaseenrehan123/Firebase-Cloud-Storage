import UploadFormSection from "@/features/upload-form-section/UploadFormSection";
import Image from "next/image";

export default function Home() {
  return (
    <div className="w-screen h-screen bg-neutral-900 pt-3">
      <div className="flex items-center flex-col">
        <UploadFormSection />
      </div>
    </div>
  );
}
