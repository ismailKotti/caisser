require('dotenv/config');
const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');
const { Pool } = require('pg');

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const items = await prisma.orderItem.findMany({
    where: { nom_pro: null },
    include: { produit: true }
  });
  
  let count = 0;
  for (const item of items) {
    if (item.produit) {
      await prisma.orderItem.update({
        where: { id_item: item.id_item },
        data: {
          nom_pro: item.produit.name_pro,
          prix_pro: item.produit.prix_p
        }
      });
      count++;
    }
  }
  console.log(`Successfully backfilled ${count} order items with product names and prices.`);
  
  // For the ones where produit is already null, we can't recover the exact name.
  const lostItems = items.filter(i => !i.produit);
  if (lostItems.length > 0) {
    console.log(`Could not backfill ${lostItems.length} items because the product was already deleted.`);
    // Maybe assign a generic name like "Produit Supprimé" instead of "Article inconnu"?
    for (const lost of lostItems) {
      await prisma.orderItem.update({
        where: { id_item: lost.id_item },
        data: {
          nom_pro: 'Produit Supprimé',
          prix_pro: 0
        }
      });
    }
  }
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
