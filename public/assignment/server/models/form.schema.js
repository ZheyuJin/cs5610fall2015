module.exports = function (mongoose, FieldSchema) {
	var FormSchema = new mongoose.Schema(
	{
		id: String,
		title: String,
		userId: String,
		fields: [FieldSchema]
	},
	{
		collection: "cs5610.assignment.form"
	});

	
	return FormSchema;
}