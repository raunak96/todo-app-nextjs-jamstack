import Airtable from "airtable";

const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
	process.env.AIRTABLE_BASE_ID
);
export const table = base(process.env.AIRTABLE_TABLE_NAME);
export const minifyData = record => {
	if (!record.fields.completed) record.fields.completed = false;
	return { id: record.id, ...record.fields };
};
