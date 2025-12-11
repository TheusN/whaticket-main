import Whitelabel from "../../models/Whitelabel";
import AppError from "../../errors/AppError";

interface Request {
  companyId: number;
  companyName?: string;
  logoLight?: string;
  logoDark?: string;
  favicon?: string;
  loginBanner?: string;
  loginLogo?: string;
  primaryColorLight?: string;
  secondaryColorLight?: string;
  backgroundColorLight?: string;
  textColorLight?: string;
  primaryColorDark?: string;
  secondaryColorDark?: string;
  backgroundColorDark?: string;
  textColorDark?: string;
}

const CreateWhitelabelService = async ({
  companyId,
  companyName,
  logoLight,
  logoDark,
  favicon,
  loginBanner,
  loginLogo,
  primaryColorLight = "#8B5CF6",
  secondaryColorLight = "#F3F4F6",
  backgroundColorLight = "#FFFFFF",
  textColorLight = "#1F2937",
  primaryColorDark = "#8B5CF6",
  secondaryColorDark = "#1F2937",
  backgroundColorDark = "#111827",
  textColorDark = "#F9FAFB"
}: Request): Promise<Whitelabel> => {
  // Validar se empresa é ID 1
  if (companyId !== 1) {
    throw new AppError("Whitelabel only available for company 1", 403);
  }

  // Verificar se já existe whitelabel para esta empresa
  const existingWhitelabel = await Whitelabel.findOne({
    where: { companyId }
  });

  if (existingWhitelabel) {
    throw new AppError("Whitelabel already exists for this company", 400);
  }

  // Criar whitelabel
  const whitelabel = await Whitelabel.create({
    companyId,
    companyName,
    logoLight,
    logoDark,
    favicon,
    loginBanner,
    loginLogo,
    primaryColorLight,
    secondaryColorLight,
    backgroundColorLight,
    textColorLight,
    primaryColorDark,
    secondaryColorDark,
    backgroundColorDark,
    textColorDark,
    active: true
  });

  return whitelabel;
};

export default CreateWhitelabelService;
