import Whitelabel from "../../models/Whitelabel";

const ShowWhitelabelService = async (companyId: number): Promise<Whitelabel | null> => {
  // Whitelabel só disponível para company 1
  if (companyId !== 1) {
    return null;
  }

  const whitelabel = await Whitelabel.findOne({
    where: { companyId }
  });

  return whitelabel;
};

export default ShowWhitelabelService;
