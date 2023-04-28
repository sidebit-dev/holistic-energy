-- CreateTable
CREATE TABLE "restriction_date" (
    "id" TEXT NOT NULL,
    "restrictionDate" TIMESTAMP(3) NOT NULL,
    "restrictionHour" TEXT,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "restriction_date_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "restriction_date_id_key" ON "restriction_date"("id");

-- AddForeignKey
ALTER TABLE "restriction_date" ADD CONSTRAINT "restriction_date_id_fkey" FOREIGN KEY ("id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
