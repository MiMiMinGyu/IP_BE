/*
  Warnings:

  - You are about to drop the column `date` on the `school_schedules` table. All the data in the column will be lost.
  - Added the required column `end_date` to the `school_schedules` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start_date` to the `school_schedules` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "school_schedules" DROP COLUMN "date",
ADD COLUMN     "color" TEXT NOT NULL DEFAULT '#4e73df',
ADD COLUMN     "end_date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "start_date" TIMESTAMP(3) NOT NULL;
