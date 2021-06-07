import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";
import { minifyData, table } from "../../../utils/Airtable";

export default withApiAuthRequired(async (req, res) => {
	const { user } = getSession(req, res);
	switch (req.method) {
		case "GET":
			try {
				const records = await table
					.select({ filterByFormula: `userId="${user.sub}"` })
					.firstPage();
				const todos = records.map(record => minifyData(record));
				res.status(200).json(todos);
			} catch (error) {
				console.log(error);
				res.status(500).json({ msg: "Something went wrong!" });
			}
			break;
		case "POST":
			const { description } = req.body;
			try {
				const createdRecords = await table.create([
					{
						fields: {
							description,
							completed: false,
							userId: user.sub,
						},
					},
				]);
				const createdRecord = minifyData(createdRecords[0]);
				res.status(201).json(createdRecord);
			} catch (error) {
				console.log(error);
				res.status(500).json({ msg: "Something went wrong!" });
			}
			break;
		default:
			res.status(405).json({ msg: "Method not allowed!" });
			break;
	}
});
