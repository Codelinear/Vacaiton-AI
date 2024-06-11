import jsPDF from "jspdf";

export const generatePDF = (
  itinerary: Array<{ day: string; activities: string[] }>
) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  const startY = 40;
  let currentY = startY;

  // Function to add header
  const addHeader = () => {
    doc.setFontSize(22);
    doc.setFont("helvetica", "normal");
    doc.text("Vacation.AI", margin, 15);
    doc.setFontSize(15);
    doc.setTextColor(144, 144, 144);
    doc.text("by Codelinear", margin + 8, 22.5);
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(37);
    doc.setFont("times", "normal");
    doc.text("Here’s your itinerary", margin, 45);
    currentY += 30;
  };

  // Function to add footer
  const addFooter = () => {
    doc.setFontSize(17);
    doc.setFont("helvetica", "normal");
    doc.text("About us", pageWidth - margin - 21, pageHeight - 30);
    doc.addImage("/qr.jpg", "JPG", pageWidth - 39, pageHeight - 27, 20, 20);
  };

  addHeader();

  // Function to add a day with its activities
  const addDayActivities = (day: string, activities: string[]) => {
    doc.setFontSize(22);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(57, 57, 57);
    doc.text(day, margin, currentY);
    currentY += 15;

    doc.setFontSize(20);

    activities.forEach((activity) => {
      if (currentY + 10 > pageHeight - 40) {
        addFooter();
        doc.addPage();
        doc.setFontSize(20);
        // addHeader();
        currentY = startY;
      }
      doc.setFontSize(20);
      doc.setTextColor(57, 57, 57);
      doc.setFont("helvetica", "normal");
      doc.text(`- ${activity}`, margin + 5, currentY);
      currentY += 10;
    });

    currentY += 20; // Space between days
  };

  // Iterate through itinerary data
  itinerary.forEach((item) => {
    addDayActivities(item.day, item.activities);
  });

  addFooter();

  // Save the PDF
  doc.save("itinerary.pdf");
};
