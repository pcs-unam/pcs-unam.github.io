'use strict';

function AcadList(props) {
    const acads = props.acads;
    var arr = [];
    for (var key in acads) {
	arr.push([acads[key], key]);
    }
    const listItems = arr.map(
	(a) =>
	    <tr>
	    <td><a href={"/tutores/" + a[1] + "/"}>{a[0]['nombre']}</a></td>
	    <td>{a[0]['palabras_clave']}</td>
	    </tr>
    );
    return (
	    <table>
	    <thead>
	    <tr>
	    <th>Nombre</th>
	    <th>Palabras clave</th>
	    </tr>
	    </thead>
	    <tbody>
	    {listItems}
	    </tbody>
	    </table>
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
		<br />
		<AcadList acads={this.state.result} />
		</div>
	);
    }
}

ReactDOM.render(
    <NameForm />,
    document.getElementById('search')
);
