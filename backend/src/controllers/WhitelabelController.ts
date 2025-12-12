import { Request, Response } from "express";
import path from "path";
import fs from "fs";
import CreateWhitelabelService from "../services/WhitelabelServices/CreateWhitelabelService";
import ShowWhitelabelService from "../services/WhitelabelServices/ShowWhitelabelService";
import UpdateWhitelabelService from "../services/WhitelabelServices/UpdateWhitelabelService";
import DeleteImageService from "../services/WhitelabelServices/DeleteImageService";
import AppError from "../errors/AppError";

// Valores padrão do sistema
const DEFAULT_VALUES = {
  companyName: "Atendechat",
  primaryColorLight: "#8B5CF6",
  secondaryColorLight: "#F3F4F6",
  backgroundColorLight: "#FFFFFF",
  textColorLight: "#1F2937",
  primaryColorDark: "#8B5CF6",
  secondaryColorDark: "#1F2937",
  backgroundColorDark: "#111827",
  textColorDark: "#F9FAFB",
  logoLight: null,
  logoDark: null,
  favicon: null,
  loginBanner: null,
  loginLogo: null
};

interface MulterRequest extends Request {
  files?: { [fieldname: string]: Express.Multer.File[] };
}

export const store = async (req: Request, res: Response): Promise<Response> => {
  const { companyId } = req.user;
  const whitelabelData = req.body;

  try {
    const whitelabel = await CreateWhitelabelService({
      companyId,
      ...whitelabelData
    });
    return res.status(201).json(whitelabel);
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const show = async (req: Request, res: Response): Promise<Response> => {
  const { companyId } = req.user;

  try {
    const whitelabel = await ShowWhitelabelService(companyId);

    if (!whitelabel) {
      return res.status(200).json(null);
    }

    return res.status(200).json(whitelabel);
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    console.error("WhitelabelController show error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const showByCompany = async (req: Request, res: Response): Promise<Response> => {
  const { companyId } = req.params;

  if (parseInt(companyId) !== 1) {
    return res.status(403).json({ error: "Whitelabel only available for company 1" });
  }

  try {
    const whitelabel = await ShowWhitelabelService(parseInt(companyId));

    if (!whitelabel) {
      return res.status(200).json(null);
    }

    return res.status(200).json(whitelabel);
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    console.error("WhitelabelController showByCompany error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Rota pública para obter whitelabel (sem autenticação) - usada na tela de login
export const showPublic = async (req: Request, res: Response): Promise<Response> => {
  try {
    // Sempre retorna o whitelabel da company 1 (principal)
    const whitelabel = await ShowWhitelabelService(1);

    if (!whitelabel) {
      return res.status(200).json(null);
    }

    return res.status(200).json(whitelabel);
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    console.error("WhitelabelController showPublic error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const update = async (req: Request, res: Response): Promise<Response> => {
  const { companyId } = req.user;
  const whitelabelData = req.body;

  try {
    const whitelabel = await UpdateWhitelabelService(companyId, whitelabelData);
    return res.status(200).json(whitelabel);
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const uploadImages = async (req: MulterRequest, res: Response): Promise<Response> => {
  const { companyId } = req.user;
  const files = req.files;

  if (companyId !== 1) {
    return res.status(403).json({ error: "Whitelabel only available for company 1" });
  }

  try {
    const uploadedFiles: { [key: string]: string } = {};

    if (files) {
      Object.keys(files).forEach(fieldname => {
        const file = files[fieldname][0];
        uploadedFiles[fieldname] = `/whitelabel/${file.filename}`;
      });
    }

    const whitelabel = await UpdateWhitelabelService(companyId, uploadedFiles);

    return res.status(200).json({
      message: "Images uploaded successfully",
      urls: uploadedFiles,
      whitelabel
    });
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteImage = async (req: Request, res: Response): Promise<Response> => {
  const { companyId } = req.user;
  const { field } = req.params;

  try {
    await DeleteImageService(companyId, field);
    return res.status(200).json({ message: "Image deleted successfully" });
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Restaurar todas as configurações para o padrão
export const restoreDefaults = async (req: Request, res: Response): Promise<Response> => {
  const { companyId } = req.user;

  if (companyId !== 1) {
    return res.status(403).json({ error: "Whitelabel only available for company 1" });
  }

  try {
    // Primeiro, deletar todas as imagens existentes
    const imageFields = ["logoLight", "logoDark", "favicon", "loginBanner", "loginLogo"];
    for (const field of imageFields) {
      try {
        await DeleteImageService(companyId, field);
      } catch (err) {
        // Ignora erro se imagem não existir
      }
    }

    // Copiar logos padrão para as novas posições
    const uploadDir = path.join(__dirname, "..", "..", "public", "whitelabel");
    const defaultLogoPath = path.join(uploadDir, "default-logo.png");
    const defaultFaviconPath = path.join(uploadDir, "default-favicon.png");

    const uploadedFiles: { [key: string]: string | null } = { ...DEFAULT_VALUES };

    // Se existir logo padrão, copiar para logoLight e logoDark
    if (fs.existsSync(defaultLogoPath)) {
      const timestamp = Date.now();

      // Copiar para logoLight
      const logoLightFilename = `logoLight-default-${timestamp}.png`;
      fs.copyFileSync(defaultLogoPath, path.join(uploadDir, logoLightFilename));
      uploadedFiles.logoLight = `/whitelabel/${logoLightFilename}`;

      // Copiar para logoDark
      const logoDarkFilename = `logoDark-default-${timestamp}.png`;
      fs.copyFileSync(defaultLogoPath, path.join(uploadDir, logoDarkFilename));
      uploadedFiles.logoDark = `/whitelabel/${logoDarkFilename}`;

      // Copiar para loginLogo
      const loginLogoFilename = `loginLogo-default-${timestamp}.png`;
      fs.copyFileSync(defaultLogoPath, path.join(uploadDir, loginLogoFilename));
      uploadedFiles.loginLogo = `/whitelabel/${loginLogoFilename}`;
    }

    // Se existir favicon padrão, copiar
    if (fs.existsSync(defaultFaviconPath)) {
      const timestamp = Date.now();
      const faviconFilename = `favicon-default-${timestamp}.png`;
      fs.copyFileSync(defaultFaviconPath, path.join(uploadDir, faviconFilename));
      uploadedFiles.favicon = `/whitelabel/${faviconFilename}`;
    }

    // Atualizar whitelabel com valores padrão
    const whitelabel = await UpdateWhitelabelService(companyId, uploadedFiles);

    return res.status(200).json({
      message: "Whitelabel restored to defaults",
      whitelabel
    });
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    console.error("WhitelabelController restoreDefaults error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
