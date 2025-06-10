export function generateInvoiceRequestNumber(createdAt, idSeq) {
    const date = new Date(createdAt);
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const day = String(date.getUTCDate()).padStart(2, '0');
    const formattedDate = `${year}${month}${day}`;
    const formattedIdSeq = String(idSeq);

    return `${formattedDate}${formattedIdSeq}`;
}

