import { Request, Response } from "express";
import CreateWhitelabelService from "../services/WhitelabelServices/CreateWhitelabelService";
import ShowWhitelabelService from "../services/WhitelabelServices/ShowWhitelabelService";
import UpdateWhitelabelService from "../services/WhitelabelServices/UpdateWhitelabelService";
import DeleteImageService from "../services/WhitelabelServices/DeleteImageService";
import AppError from "../errors/AppError";

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

  return show(req, res);
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
