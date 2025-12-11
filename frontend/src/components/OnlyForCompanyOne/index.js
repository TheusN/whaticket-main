const OnlyForCompanyOne = ({ user, yes, no }) => {
  const companyId = user?.companyId;
  const isCompanyOne = companyId === 1 || companyId === "1";

  return isCompanyOne ? yes() : no();
};

OnlyForCompanyOne.defaultProps = {
  user: {},
  yes: () => null,
  no: () => null,
};

export default OnlyForCompanyOne;
