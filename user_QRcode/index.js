import qr from 'qrcode';
import fs from 'fs/promises';
import prompt from 'prompt';
// const qr = require('qrcode');
// // const fs = require('fs');
// const prompt = require('prompt');

prompt.start();

prompt.get(['data', 'filename'], async (err, result) => {
    if (err) {
        console.error('Error getting input:', err);
        return;
    }

    const data = result.data;
    const filename = result.filename || 'qrcode.png';

    // Generate QR code as a Data URL
    const qrDataURL = await qr.toDataURL(data);

    // Extract the base64 encoded data from the Data URL
    const base64Data = qrDataURL.replace(/^data:image\/png;base64,/, '');

    // Convert base64 data to a buffer
    const imageBuffer = Buffer.from(base64Data, 'base64');

    // Save the buffer as a PNG image
    fs.writeFile(filename, imageBuffer, (writeErr) => {
        if (writeErr) {
            console.error('Error writing QR code image:', writeErr);
        } else {
            console.log(`QR code image saved as ${filename}`);
        }
    });
});
