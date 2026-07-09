-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_userClerkId_fkey";

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_userClerkId_fkey" FOREIGN KEY ("userClerkId") REFERENCES "User"("clerkId") ON DELETE CASCADE ON UPDATE CASCADE;
