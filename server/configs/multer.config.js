import multer from "multer";

const storage = multer.memoryStorage();
const multer_parser = multer({ storage });

export { multer_parser }