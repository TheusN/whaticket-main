import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import * as WhitelabelController from "../controllers/WhitelabelController";
import isAuth from "../middleware/isAuth";

const whitelabelRoutes = express.Router();

// Configurar pasta de upload
const uploadDir = path.join(__dirname, "..", "..", "public", "whitelabel");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configuração do multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + ext);
  }
});

const fileFilter = (req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const allowedMimes = [
    "image/png",
    "image/jpg",
    "image/jpeg",
    "image/svg+xml",
    "image/x-icon"
  ];

  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type. Only PNG, JPG, SVG, and ICO allowed."));
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB max
  }
});

// Rotas
// Rota pública para obter configurações de whitelabel (usada antes do login)
whitelabelRoutes.get("/whitelabel/public", WhitelabelController.showPublic);
whitelabelRoutes.post("/whitelabel", isAuth, WhitelabelController.store);
whitelabelRoutes.get("/whitelabel", isAuth, WhitelabelController.show);
whitelabelRoutes.get("/whitelabel/:companyId", WhitelabelController.showByCompany);
whitelabelRoutes.put("/whitelabel", isAuth, WhitelabelController.update);

whitelabelRoutes.post(
  "/whitelabel/upload",
  isAuth,
  upload.fields([
    { name: "logoLight", maxCount: 1 },
    { name: "logoDark", maxCount: 1 },
    { name: "favicon", maxCount: 1 },
    { name: "loginBanner", maxCount: 1 },
    { name: "loginLogo", maxCount: 1 }
  ]),
  WhitelabelController.uploadImages
);

whitelabelRoutes.delete("/whitelabel/image/:field", isAuth, WhitelabelController.deleteImage);

// Rota para restaurar configurações padrão
whitelabelRoutes.post("/whitelabel/restore-defaults", isAuth, WhitelabelController.restoreDefaults);

export default whitelabelRoutes;
