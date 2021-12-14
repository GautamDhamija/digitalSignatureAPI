const fs = require('fs');
const path = require('path');
const assert = require('assert');
const { PDFDocument } = require('pdf-lib');

const run = async ({ pathToPDF, pathToImage }) => {
  const pdfDoc = await PDFDocument.load(fs.readFileSync(pathToPDF));
  const img = await pdfDoc.embedPng(fs.readFileSync(pathToImage));

  // const imagePage = pdfDoc.insertPage(0);
  // imagePage.drawImage(img, {
  //   x: 0,
  //   y: 0,
  //   width: imagePage.getWidth(),
  //   height: imagePage.getHeight(),
  // });
    for (let i = 0; i < pdfDoc.getPageCount(); i++) {
        let imagePage='';
        imagePage = pdfDoc.getPage(i);
        console.log(i+1)
        console.log(imagePage.getWidth())
        let xx=imagePage.getWidth()
        console.log(imagePage.getHeight())
        let yy=imagePage.getHeight()
        imagePage.drawImage(img, {
          x: 70,
          y: 70,
          width: 70,
          height: 70
        });
        }

  const pdfBytes = await pdfDoc.save();
  const newFilePath = `${path.basename(pathToPDF, '.pdf')}-result.pdf`;
  fs.writeFileSync(newFilePath, pdfBytes);
}

const ERRORS = {
  ARGUMENTS: 'Please provide path to the PDF file as a first argument and path to image as the second argument'
};

const pathToPDF = process.argv[2];
assert.notEqual(pathToPDF, null, ERRORS.ARGUMENTS);
const pathToImage = process.argv[3];
assert.notEqual(pathToImage, null, ERRORS.ARGUMENTS);

run({ pathToPDF, pathToImage }).catch(console.error);

// npm start test.pdf Capture.PNG

// (async () => {
//   const pdfDoc = await PDFDocument.load(fs.readFileSync("CONSOLIDADO_FSIERRA_27-06-2020 03-32-27.pdf"));
//   const img = await pdfDoc.embedPng(fs.readFileSync("image.PNG"));
  
//   for (let i = 0; i < pdfDoc.getPageCount(); i++) {
//   let imagePage='';
//   imagePage = pdfDoc.getPage(i);
//   console.log(i+1)
//   console.log(imagePage.getWidth())
//   let xx=imagePage.getWidth()
//   console.log(imagePage.getHeight())
//   let yy=imagePage.getHeight()
//   imagePage.drawImage(img, {
//   x: xx-70,
//   y: yy-70,
//   width: 70,
//   height: 70
  
//   });
//   }
// }