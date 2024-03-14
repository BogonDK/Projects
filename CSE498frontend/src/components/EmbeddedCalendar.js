const EmbeddedCalendar = () => {
	// TODO: Make this secure (hide apiKey)
	//const apiKey = "AIzaSyDhmVv9he-H1DTfk5sbJE-Dk9BQd0ltHTs";

	return (
	<iframe 
		src="https://calendar.google.com/calendar/embed?src=bogondk%40gmail.com&ctz=America%2FDetroit" 
		width="1000" height="600"
		></iframe>
	);
};

export default EmbeddedCalendar;