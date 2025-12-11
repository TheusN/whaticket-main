const OnlyForCompanyOne = ({ user, yes, no }) => (user.companyId === 1 || user.companyId === "1") ? yes() : no();

OnlyForCompanyOne.defaultProps = {
    user: {},
	yes: () => null,
	no: () => null,
};

export default OnlyForCompanyOne;
