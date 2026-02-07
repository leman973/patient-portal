const multer = require('multer');

const errorHandler = (err, req, res, next) => {
  // Multer errors
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ 
        message: 'File too large. Maximum size is 5MB' 
      });
    }
    return res.status(400).json({ 
      message: err.message 
    });
  }

  // Custom file filter errors
  if (err.message === 'Only image files are allowed!') {
    return res.status(400).json({ 
      message: err.message 
    });
  }

  // Default error
  console.error(err);
  res.status(500).json({ 
    message: 'Something went wrong',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
};

module.exports = errorHandler;