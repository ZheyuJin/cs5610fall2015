module.exports = function (mongoose) {
    var FieldSchema = new mongoose.Schema(

    {
        id: String,
        label: String,
        fieldType:  {
            type: String,
            /*only these values allowed*/
            enum: ["TEXT", "TEXTAREA", "RADIO", "CHECKBOX","SELECT","DATE"]
        },
        options: [{
            label: String,
            value: String
        }],
        placeholder: String
    });

    return FieldSchema;
}