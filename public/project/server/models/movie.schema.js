module.exports = function (mongoose) {
	var MovieSchema = new mongoose.Schema(
	{
		directors	: 	[] ,
		genres		:	[{type: String, default: ""}],
		idIMDB		:	{type: String, default: ""},
		plot		:	{type: String, default: ""},
		rated		:	{type: String, default: ""},
		rating		:	{type: String, default: ""},
		releaseDate	:	{type: String, default: ""},	
		runtime		:	[]	,
		similarMovies	:[],
		simplePlot	:	{type: String, default: ""},
		title		:	{type: String, default: ""},		
		urlPoster	:	{type: String, default: ""},
		year		:	{type: String, default: ""}
	},
	{
		collection: "cs5610.project.movie"
	});


	return MovieSchema;
}