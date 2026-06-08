import QRCode from 'qrcode';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function generateQRCodes() {
  const wells = await prisma.well.findMany();
  for (const well of wells) {
    const url = `https://koskigo.koski.gov.tr/report/${well.id}`;
    const path = `./qrcodes/well_${well.id}.png`;
    await QRCode.toFile(path, url);
    console.log(`Generated QR for ${well.kuyuAdi}`);
  }
}