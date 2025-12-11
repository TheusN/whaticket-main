import Whitelabel from "../../models/Whitelabel";
import AppError from "../../errors/AppError";
import fs from "fs";
import path from "path";

const DeleteImageService = async (
  companyId: number,
  field: string
): Promise<void> => {
  // Validar se empresa é ID 1
  if (companyId !== 1) {
    throw new AppError("Whitelabel only available for company 1", 403);
  }

  // Validar campo
  const validFields = [
    "logoLight",
    "logoDark",
    "favicon",
    "loginBanner",
    "loginLogo"
  ];

  if (!validFields.includes(field)) {
    throw new AppError("Invalid field", 400);
  }

  const whitelabel = await Whitelabel.findOne({
    where: { companyId }
  });

  if (!whitelabel) {
    throw new AppError("Whitelabel not found", 404);
  }

  const imageUrl = whitelabel[field];

  if (!imageUrl) {
    throw new AppError("Image not found", 404);
  }

  // Deletar arquivo físico
  try {
    const imagePath = path.join(
      __dirname,
      "..",
      "..",
      "..",
      "public",
      imageUrl
    );

    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }
  } catch (error) {
    console.error("Error deleting image file:", error);
  }

  // Remover URL do banco
  await whitelabel.update({ [field]: null });
};

export default DeleteImageService;
