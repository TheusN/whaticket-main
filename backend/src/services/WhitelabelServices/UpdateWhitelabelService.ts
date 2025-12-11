import Whitelabel from "../../models/Whitelabel";
import AppError from "../../errors/AppError";

interface Request {
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
  active?: boolean;
}

const UpdateWhitelabelService = async (
  companyId: number,
  whitelabelData: Request
): Promise<Whitelabel> => {
  // Validar se empresa é ID 1
  if (companyId !== 1) {
    throw new AppError("Whitelabel only available for company 1", 403);
  }

  const whitelabel = await Whitelabel.findOne({
    where: { companyId }
  });

  if (!whitelabel) {
    throw new AppError("Whitelabel not found", 404);
  }

  // Atualizar apenas os campos fornecidos
  await whitelabel.update(whitelabelData);

  await whitelabel.reload();

  return whitelabel;
};

export default UpdateWhitelabelService;
