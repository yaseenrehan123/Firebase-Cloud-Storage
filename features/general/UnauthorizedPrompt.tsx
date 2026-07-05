import Alignment from "@/components/ui/general/alignment";
import Link from "next/link";

const UnauthorizedPrompt = () => {
    return (
        <Alignment variant="colCenter" className="justify-center gap-8 pt-12 w-screen border-2 border-red-500
        text-center">
            <div className="relative border-2 border-green-500">
                <div className="text-7xl text-gray-600 font-bold font-inter opacity-50">
                    401
                </div>
                <div className="absolute w-40 h-11 bg-neutral-900 rounded-2xl text-purple-500 border-2 border-purple-500/30
                top-1/2 left-1/2 -translate-1/2  text-center font-bold font-outfit text-[1.01rem] shadow-lg shadow-purple-500/10
                uppercase flex items-center justify-center">
                    <div>Not Authorized</div>
                </div>
            </div>

            <Alignment variant="colCenter" gap="lg">
                <div className="text-3xl font-inter text-white font-bold">
                    Authentication Required
                </div>
                <div className="text-white text-[1.2rem] font-outfit">
                    It seems you are not signed in. You need an active session to securely upload images to cloud storage.
                </div>
            </Alignment>

            <Link href={"/auth/signup"} className="w-40 h-14 bg-black border border-purple-500/30 text-white 
            shadow-lg shadow-purple-500/10 flex items-center justify-center rounded-full hover:cursor-pointer hover:opacity-50 hover:scale-99
            active:scale-98 transition-all duration-150">
                <div className="text-bold font-outfit">
                    SignIn / Signup
                </div>

            </Link>

        </Alignment >
    );
};

export default UnauthorizedPrompt;