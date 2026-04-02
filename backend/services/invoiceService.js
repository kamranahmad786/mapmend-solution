// backend/services/invoiceService.js
const PDFDocument = require("pdfkit");
const path = require("path");
const fs = require("fs");

/**
 * Generates a professional, realistic company invoice as a PDF buffer.
 */
exports.generateInvoiceBuffer = async ({ payment }) => {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ size: "A4", margin: 50 });
    const chunks = [];
    doc.on("data", c => chunks.push(c));
    doc.on("end",  () => resolve(Buffer.concat(chunks)));
    doc.on("error", reject);

    const createdAt = new Date(payment.createdAt).toLocaleDateString("en-IN", {
      day: "numeric", month: "long", year: "numeric"
    });

    const invoiceNo = `INV-${String(payment._id).slice(-8).toUpperCase()}`;

    // ─── TOP LOGO & COMPANY INFO ──────────────────────────────────
    const logoPath = path.join(__dirname, "../public/logo-mapmend.png");
    if (fs.existsSync(logoPath)) {
      doc.image(logoPath, 50, 45, { width: 140 });
    } else {
      doc.fontSize(22).fillColor("#06b6d4").text("MapMend Solution", 50, 50);
    }

    doc.fontSize(24).fillColor("#111827").text("INVOICE", 0, 50, { align: "right" });
    doc.fontSize(10).fillColor("#6b7280").text(invoiceNo, 0, 80, { align: "right" });

    doc.moveDown(4);

    // ─── BILLING ADDRESSES ───────────────────────────────────────
    // Row 1 Header
    doc.fontSize(9).fillColor("#9ca3af");
    doc.text("BILLED FROM", 50, 140);
    doc.text("BILLED TO", 300, 140);

    // Row 1 Content
    doc.fontSize(10).fillColor("#1f2937");
    
    // FROM: MapMend Solution
    doc.text("MapMend Solution", 50, 155, { bold: true });
    doc.fillColor("#4b5563")
       .text("Digital Growth & SEO Specialist", 50, 168)
       .text("House number 02, Kadmadhi", 50, 181)
       .text("Chandil, Jharkhand, 832401", 50, 194)
       .text("WhatsApp: +91 7366890727", 50, 207)
       .text("Email: infomapmendsolution@gmail.com", 50, 220);

    // TO: Client
    doc.fillColor("#1f2937").text(payment.userEmail || "Valued Customer", 300, 155);
    doc.fillColor("#4b5563")
       .text(`Client ID: ${String(payment.user || "CUST-DEMO").slice(-6).toUpperCase()}`, 300, 168);
    
    // Metadata block
    doc.fontSize(9).fillColor("#9ca3af").text("DATE OF ISSUE", 300, 194);
    doc.fontSize(10).fillColor("#1f2937").text(createdAt, 300, 207);

    // ─── ITEM TABLE ─────────────────────────────────────────────
    const tableTop = 280;

    // Header Background
    doc.rect(50, tableTop, 500, 30).fill("#f9fafb");
    doc.fillColor("#4b5563").fontSize(9);
    doc.text("DESCRIPTION", 60, tableTop + 10);
    doc.text("PRICE", 300, tableTop + 10);
    doc.text("QTY", 400, tableTop + 10);
    doc.text("TOTAL", 500, tableTop + 10, { width: 50, align: "right" });

    // Header Border (Bottom)
    doc.moveTo(50, tableTop + 30).lineTo(550, tableTop + 30).strokeColor("#e5e7eb").lineWidth(1).stroke();

    // Item Row
    doc.fillColor("#111827").fontSize(10);
    const itemY = tableTop + 45;
    doc.text(`Digital Package: ${payment.planTitle || "Website Audit"}`, 60, itemY);
    doc.text(`Rs ${(payment.amount / 100).toLocaleString("en-IN")}`, 300, itemY);
    doc.text("1", 400, itemY);
    doc.text(`Rs ${(payment.amount / 100).toLocaleString("en-IN")}`, 500, itemY, { width: 50, align: "right" });

    // Item Border (Bottom)
    doc.moveTo(50, itemY + 25).lineTo(550, itemY + 25).strokeColor("#f3f4f6").stroke();

    // ─── TOTALS SECTION ────────────────────────────────────────
    const totalY = itemY + 50;

    doc.fontSize(10).fillColor("#6b7280").text("Subtotal", 350, totalY);
    doc.fillColor("#111827").text(`Rs ${(payment.amount / 100).toLocaleString("en-IN")}`, 500, totalY, { width: 50, align: "right" });

    doc.fontSize(10).fillColor("#6b7280").text("Tax (GST 0%)", 350, totalY + 20);
    doc.fillColor("#111827").text("Rs 0.00", 500, totalY + 20, { width: 50, align: "right" });

    // Grand Total Line
    doc.moveTo(350, totalY + 40).lineTo(550, totalY + 40).strokeColor("#e5e7eb").stroke();

    doc.fontSize(12).fillColor("#111827").text("Amount Paid", 350, totalY + 50, { bold: true });
    doc.fontSize(14).fillColor("#06b6d4").text(`Rs ${(payment.amount / 100).toLocaleString("en-IN")}`, 450, totalY + 48, { width: 100, align: "right", bold: true });

    // ─── PAYMENT PROOF STAMP ───────────────────────────────────
    doc.rect(50, totalY, 150, 60).dash(5, { space: 5 }).strokeColor("#d1d5db").stroke();
    doc.fontSize(8).fillColor("#9ca3af")
       .text("TRANSACTION STATUS", 60, totalY + 12);
    doc.fontSize(12).fillColor("#10b981")
       .text("✓ SUCCESSFUL", 60, totalY + 28, { bold: true });
    doc.fontSize(7).fillColor("#b91c1c")
       .text(payment.razorpayPaymentId || "ADMIN_RECORDED", 60, totalY + 44);

    // ─── TERMS & AUTHORIZATION ──────────────────────────────────
    const bottomY = 550;

    doc.fontSize(9).fillColor("#9ca3af").text("PAYMENT METHOD", 50, bottomY);
    doc.fontSize(10).fillColor("#1f2937").text(payment.razorpayOrderId ? "Online (Razorpay)" : "Manual Recording", 50, bottomY + 14);

    // Signature Area
    doc.moveTo(400, bottomY + 50).lineTo(550, bottomY + 50).strokeColor("#111827").stroke();
    doc.fontSize(11).fillColor("#111827").text("Kamran Ahmad", 400, bottomY + 36, { width: 150, align: "center", bold: true, oblique: true });
    doc.fontSize(9).fillColor("#6b7280").text("Authorized Signature", 400, bottomY + 60, { width: 150, align: "center" });

    // ─── FOOTER ────────────────────────────────────────────────
    doc.fontSize(9).fillColor("#9ca3af")
       .text("Terms: This is a system-generated invoice for digital services. Purchases are non-refundable after service delivery has started. For support, please contact us on WhatsApp.", 50, doc.page.height - 70, { align: "center", width: 500 });
    
    doc.fontSize(8).fillColor("#d1d5db")
       .text("Generated by MapMend Invoice System", 50, doc.page.height - 35, { align: "right" });

    doc.end();
  });
};
