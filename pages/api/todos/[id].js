import { minifyData, table } from "../../../utils/Airtable";
import isAuthorised from "../../../middleware/isAuthorised";
import { withApiAuthRequired } from "@auth0/nextjs-auth0";

const handler = async (req, res) => {
	const {
		query: { id },
		method,
		body,
	} = req;
	switch (method) {
		case "PUT":
			try {
				const updatedRecord = await table.update(id, body);
				const updatedTodo = minifyData(updatedRecord);
				res.status(200).json(updatedTodo);
			} catch (error) {
				console.log(error);
				res.status(500).json({ msg: "Something went wrong!" });
			}
			break;
		case "DELETE":
			try {
				const deletedRecord = await table.destroy(id);
				const deletedTodo = minifyData(deletedRecord);
				res.status(200).json(deletedTodo);
			} catch (error) {
				console.log(error);
				res.status(500).json({ msg: "Something went wrong!" });
			}
			break;
		default:
			res.status(405).json({ msg: "Method not allowed!" });
			break;
	}
};

export default withApiAuthRequired(isAuthorised(handler));
