'use strict';

function AcadList(props) {
    const acads = props.acads;
    var arr = [];
    for (var key in acads) {
	arr.push(key);	
    }
    const listItems = arr.map((a) =>
			      <li>{a}</li>
			     );
    return (
	    <ul>{listItems}</ul>
    );
}


class NameForm extends React.Component {
    constructor(props) {
	super(props);
	this.state = {value: '',
		      result: {},
		     };

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
		console.log(jsonData);
		this.setState({result: jsonData});
	    })
	    .catch((error) => {
	    	// handle your errors here
	    	console.log(error);
	    });
	
    }
    
    render() {
	const epa = [1, 2, 3, 4];
	return (<div>
		<form onSubmit={this.handleSubmit}>
		<label>
		<input type="text" value={this.state.value} onChange={this.handleChange} />
		</label>
		<input type="submit" value="buscar" />
		</form>
		<AcadList acads={this.state.result} />
		</div>
	);
    }
}

ReactDOM.render(
    <NameForm />,
    document.getElementById('search')
);
