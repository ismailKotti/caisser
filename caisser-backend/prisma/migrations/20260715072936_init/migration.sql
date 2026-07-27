-- CreateTable
CREATE TABLE "Role" (
    "id_role" TEXT NOT NULL,
    "type_role" TEXT NOT NULL,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id_role")
);

-- CreateTable
CREATE TABLE "User" (
    "id_user" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "pass" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id_user")
);

-- CreateTable
CREATE TABLE "Categorie" (
    "id_cat" TEXT NOT NULL,
    "img" TEXT NOT NULL,
    "type_cat" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Categorie_pkey" PRIMARY KEY ("id_cat")
);

-- CreateTable
CREATE TABLE "Produit" (
    "id_pro" TEXT NOT NULL,
    "name_pro" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "img" TEXT NOT NULL,
    "prix_p" DOUBLE PRECISION NOT NULL,
    "id_cat" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Produit_pkey" PRIMARY KEY ("id_pro")
);

-- CreateTable
CREATE TABLE "Order" (
    "id_order" TEXT NOT NULL,
    "incrementalId" SERIAL NOT NULL,
    "id_user" TEXT NOT NULL,
    "prix total" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id_order")
);

-- CreateTable
CREATE TABLE "OrderItem" (
    "id_item" TEXT NOT NULL,
    "id_pro" TEXT NOT NULL,
    "quantit" INTEGER NOT NULL,
    "orderId" TEXT NOT NULL,

    CONSTRAINT "OrderItem_pkey" PRIMARY KEY ("id_item")
);

-- CreateTable
CREATE TABLE "Payment" (
    "id_pay" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "prix_f" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id_pay")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Order_incrementalId_key" ON "Order"("incrementalId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_role_fkey" FOREIGN KEY ("role") REFERENCES "Role"("id_role") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Produit" ADD CONSTRAINT "Produit_id_cat_fkey" FOREIGN KEY ("id_cat") REFERENCES "Categorie"("id_cat") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "User"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id_order") ON DELETE RESTRICT ON UPDATE CASCADE;
