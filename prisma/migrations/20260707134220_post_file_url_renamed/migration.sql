/*
  Warnings:

  - You are about to drop the column `imageUrl` on the `Post` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[fileUrl]` on the table `Post` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `fileUrl` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Post_imageUrl_key";

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "imageUrl",
ADD COLUMN     "fileUrl" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Post_fileUrl_key" ON "Post"("fileUrl");
