'use strict';


class NameForm extends React.Component {
    constructor(props) {
	super(props);
	this.state = {value: ''};

	this.handleChange = this.handleChange.bind(this);
	this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
	this.setState({value: event.target.value});
    }

    handleSubmit(event) {

	event.preventDefault();
	
	const URL = 'http://localhost:8000/inicio/academicos/search/?qs=' + this.state.value;
	
	fetch(URL)
	    .then(response => response.json())
	    .then((jsonData) => {
		// jsonData is parsed json object received from url
		console.log(jsonData);
	    })
	    .catch((error) => {
	    	// handle your errors here
	    	console.log(error);
	    });
	
    }
    
    render() {
	return (
	    <form onSubmit={this.handleSubmit}>
              <label>
		<input type="text" value={this.state.value} onChange={this.handleChange} />
              </label>
              <input type="submit" value="buscar" />
	    </form>
	);
    }
}

ReactDOM.render(
    <NameForm />,
    document.getElementById('search')
);
