const fs = require('fs');
const path = require('path');
const cron = require('node-cron');

// Directory where uploaded files are stored
const UPLOADS_DIR = path.join(__dirname, '../../public/images/temporary');

// Function to delete files older than 24 hours
const deleteOldFiles = () => {
    const now = Date.now();
    const cutoffTime = now - 10 * 1000; // 10 seconds in milliseconds

    fs.readdir(UPLOADS_DIR, (err, files) => {
        if (err) {
            console.error('Error reading uploads directory:', err);
            return;
        }

        files.forEach((file) => {
            const filePath = path.join(UPLOADS_DIR, file);

            fs.stat(filePath, (err, stats) => {
                if (err) {
                    console.error('Error getting file stats:', err);
                    return;
                }

                // Check if the file is older than 24 hours
                if (stats.mtimeMs < cutoffTime) {
                    fs.unlink(filePath, (err) => {
                        if (err) {
                            console.error('Error deleting file:', err);
                        } else {
                            console.log('Deleted old file:', filePath);
                        }
                    });
                }
            });
        });
    });
};

// Schedule the cleanup task to run every hour
cron.schedule('0 * * * *', () => {
    console.log('Running scheduled cleanup task...');
    deleteOldFiles();
});