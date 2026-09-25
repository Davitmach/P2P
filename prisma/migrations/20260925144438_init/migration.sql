-- CreateEnum
CREATE TYPE "OrderType" AS ENUM ('BUY', 'SELL');

-- CreateTable
CREATE TABLE "Prices" (
    "id" TEXT NOT NULL,
    "sellAvgPrice" DECIMAL(20,2) NOT NULL,
    "sellMaxPrice" DECIMAL(20,2) NOT NULL,
    "sellMinPrice" DECIMAL(20,2) NOT NULL,
    "buyAvgPrice" DECIMAL(20,2) NOT NULL,
    "buyMaxPrice" DECIMAL(20,2) NOT NULL,
    "buyMinPrice" DECIMAL(20,2) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Prices_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Orders" (
    "id" TEXT NOT NULL,
    "orderNumber" TEXT NOT NULL,
    "type" "OrderType" NOT NULL,
    "asset" TEXT NOT NULL,
    "fiat" TEXT NOT NULL,
    "fiatSymbol" TEXT NOT NULL,
    "amount" DECIMAL(20,2) NOT NULL,
    "totalPrice" DECIMAL(20,2) NOT NULL,
    "status" INTEGER NOT NULL,
    "orderCreateAt" TIMESTAMP(3) NOT NULL,
    "confirmPayEndAt" TIMESTAMP(3),
    "notifyPayEndAt" TIMESTAMP(3),
    "buyerNickname" TEXT,
    "sellerNickname" TEXT,
    "takerCommissionRate" DECIMAL(20,2),
    "takerCommission" DECIMAL(20,2),
    "takerAmount" DECIMAL(20,2),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "advNumber" TEXT,

    CONSTRAINT "Orders_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Prices_createdAt_idx" ON "Prices"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "Orders_orderNumber_key" ON "Orders"("orderNumber");

-- CreateIndex
CREATE INDEX "Orders_status_idx" ON "Orders"("status");

-- CreateIndex
CREATE INDEX "Orders_type_idx" ON "Orders"("type");

-- CreateIndex
CREATE INDEX "Orders_orderCreateAt_idx" ON "Orders"("orderCreateAt");

-- CreateIndex
CREATE INDEX "Orders_advNumber_idx" ON "Orders"("advNumber");
