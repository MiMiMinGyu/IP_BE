-- CreateEnum
CREATE TYPE "BoardCategory" AS ENUM ('GENERAL', 'QUESTION', 'INQUIRY', 'SUGGESTION');

-- DropIndex
DROP INDEX "users_nickname_key";

-- AlterTable
ALTER TABLE "boards" ADD COLUMN     "category" "BoardCategory" NOT NULL DEFAULT 'GENERAL';
