const fs = require('fs');
const path = require('path');

// @route   POST /api/media/upload
// @desc    Upload a file
// @access  Private
exports.uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // Return the file path
    const filePath = `/uploads/${req.file.filename}`;
    res.json({ filePath });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// @route   POST /api/media/uploads
// @desc    Upload multiple files
// @access  Private
exports.uploadMultipleFiles = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'No files uploaded' });
    }

    // Return the file paths
    const filePaths = req.files.map(file => `/uploads/${file.filename}`);
    res.json({ filePaths });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// @route   GET /api/media
// @desc    Get all media files
// @access  Private
exports.getAllMedia = async (req, res) => {
  try {
    const uploadsDir = path.join(__dirname, '../uploads');
    
    // Check if directory exists
    if (!fs.existsSync(uploadsDir)) {
      return res.json([]);
    }
    
    // Read directory
    fs.readdir(uploadsDir, (err, files) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Server error');
      }
      
      // Filter out non-files
      const mediaFiles = files.filter(file => {
        const filePath = path.join(uploadsDir, file);
        return fs.statSync(filePath).isFile();
      });
      
      // Map files to objects with metadata
      const media = mediaFiles.map(file => {
        const filePath = path.join(uploadsDir, file);
        const stats = fs.statSync(filePath);
        
        return {
          filename: file,
          path: `/uploads/${file}`,
          size: stats.size,
          createdAt: stats.birthtime
        };
      });
      
      res.json(media);
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// @route   DELETE /api/media/:filename
// @desc    Delete a media file
// @access  Private
exports.deleteFile = async (req, res) => {
  try {
    const filename = req.params.filename;
    const filePath = path.join(__dirname, '../uploads', filename);
    
    // Check if file exists
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ message: 'File not found' });
    }
    
    // Delete file
    fs.unlink(filePath, err => {
      if (err) {
        console.error(err);
        return res.status(500).send('Server error');
      }
      
      res.json({ message: 'File deleted successfully' });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};