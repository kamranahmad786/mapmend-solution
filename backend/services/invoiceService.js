// backend/services/invoiceService.js
const PDFDocument = require("pdfkit");
const path = require("path");
const fs = require("fs");

exports.generateInvoiceBuffer = async ({ payment }) => {
  // payment: Payment model instance
  const doc = new PDFDocument({ size: "A4", margin: 50 });
  const chunks = [];
  doc.on("data", (c) => chunks.push(c));
  const createdAt = new Date(payment.createdAt).toLocaleString();

  // Header
  doc.image(path.join(__dirname, "../public/logo-mapmend.png"), 50, 45, { width: 120 }).moveDown();
  doc.fontSize(20).text("Invoice", { align: "right" });
  doc.moveDown();
  doc.fontSize(10).text(`Invoice ID: ${payment._id}`, { align: "right" });
  doc.text(`Date: ${createdAt}`, { align: "right" });

  doc.moveDown(2);
  doc.fontSize(12).text(`Billed To: ${payment.userEmail || "Customer"}`);
  doc.moveDown();
  doc.text(`Plan: ${payment.planTitle}`);
  doc.text(`Amount: ₹${(payment.amount / 100).toFixed(2)}`);
  doc.moveDown();

  doc.text("Thank you for choosing MapMend Solution.", { align: "left" });

  doc.end();

  return Buffer.concat(chunks);
};
