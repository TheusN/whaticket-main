import Whitelabel from "../../models/Whitelabel";
import AppError from "../../errors/AppError";

const ShowWhitelabelService = async (companyId: number): Promise<Whitelabel> => {
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

  return whitelabel;
};

export default ShowWhitelabelService;
