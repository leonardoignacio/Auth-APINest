-- CreateTable
CREATE TABLE "usuarios" (
    "id" SERIAL NOT NULL,
    "nome" TEXT,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fornecedores" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "contato" TEXT,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "fornecedores_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "produtos" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "codigo_barras" TEXT NOT NULL,
    "lote" TEXT NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,
    "fornecedorId" INTEGER NOT NULL,

    CONSTRAINT "produtos_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_email_key" ON "usuarios"("email");

-- CreateIndex
CREATE UNIQUE INDEX "produtos_codigo_barras_key" ON "produtos"("codigo_barras");

-- AddForeignKey
ALTER TABLE "fornecedores" ADD CONSTRAINT "fornecedores_userId_fkey" FOREIGN KEY ("userId") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "produtos" ADD CONSTRAINT "produtos_userId_fkey" FOREIGN KEY ("userId") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "produtos" ADD CONSTRAINT "produtos_fornecedorId_fkey" FOREIGN KEY ("fornecedorId") REFERENCES "fornecedores"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
