'use strict';


function AcadList(props) {
    const acads = props.acads;
    console.log(acads);
    const acad_rows = []

    for (var a in acads) {
	// const wordlist = a['palabras_clave'].map((w) => {
	// 	<li>{w}</li>
	// });
	// console.log(wordlist);
    
	acad_rows.push(
		<tr>
		<td><a href={"/tutores/" + a['username'] + "/"}>{a['nombre']}</a></td>
		<td></td>
		</tr>
	)
    }
    
    return (
	    <table>
	    <thead>
	    <tr>
	    <th>Nombre</th>
	    <th>Palabras clave</th>
	    </tr>
	    </thead>
	    <tbody>
	    {acad_rows}
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
	
	const URL = '/siges/inicio/academicos/search/?qs=' + this.state.value;
	
	fetch(URL)
	    .then(response => response.json())
	    .then((jsonData) => {
		this.setState({result: jsonData});
	    })
	    .catch((error) => {
	    	// handle your errors here
	    	console.log(error);
	    });
	console.log(this.state.result);
    }
    
    render() {
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
