/*
  Warnings:

  - The primary key for the `Cv` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[userId]` on the table `Cv` will be added. If there are existing duplicate values, this will fail.
  - The required column `id` was added to the `Cv` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "Cv" DROP CONSTRAINT "Cv_pkey",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "Cv_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "Cv_userId_key" ON "Cv"("userId");
