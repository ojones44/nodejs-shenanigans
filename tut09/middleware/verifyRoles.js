exports.verifyRoles = (...allowedRoles) => {
	return (req, res, next) => {
		if (!req?.roles) return res.status(401).json({ message: 'No roles' });

		const rolesArr = [...allowedRoles];

		const result = req.roles
			.map((role) => rolesArr.includes(role))
			.find((value) => value === true);

		if (!result) res.status(401).json({ message: 'No roles matched' });
		next();
	};
};
