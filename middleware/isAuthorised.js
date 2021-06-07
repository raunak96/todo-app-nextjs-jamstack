import { getSession } from "@auth0/nextjs-auth0";
import { table } from "../utils/Airtable";

const isAuthorised = handler => async (req, res) => {
	const { user } = getSession(req, res);
	const { id } = req.query;
	try {
		const todo = await table.find(id);
		if (todo.fields.userId !== user.sub) {
			return res
				.status(403)
				.json({ msg: "You cannot perform this operation!!" });
		}
		return handler(req, res);
	} catch (error) {
		console.log(error);
		return res.status(500).json({ msg: "Something went wrong!" });
	}
};

export default isAuthorised;
