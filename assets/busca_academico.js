'use strict';


class WordList extends React.Component {
    render() {
	const words = this.props.words;
	const wl = words.map((w) =>
			     <li>{w}</li>
			    );
	return (<ul>{wl}</ul>);
    }
}


class AcademicoRow extends React.Component {
    render() {
	const academico = this.props.academico;
	
	return (
		<tr>
		<td><a href={"/tutores/" + academico.username + "/"}>{academico.nombre}</a></td>
		<td><WordList words={academico.palabras_clave} /></td>
		</tr>
	);
    }
}


class AcadTable extends React.Component {
    
    render () {
	//const acads = props.acads['result'];
	const acad_rows = []

	//for (var a in acads) {
	// const wordlist = a['palabras_clave'].map((w) => {
	// 	<li>{w}</li>
	// });
	// console.log(wordlist);
	
	for (var i=0; i< this.props.acads.length; i++) {
	    acad_rows.push(
	 	    <AcademicoRow academico={this.props.acads[i]} key={i} />
	    );
	}
	
	return(
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
	)
    }
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
	
	//const URL = '/siges/inicio/academicos/search/?qs=' + this.state.value;
	const URL = 'http://localhost:8000/inicio/academicos/search/?qs=' + this.state.value;	
	
	fetch(URL)
	    .then(response => response.json())
	    .then((jsonData) => {
		this.setState({result: jsonData['result']});
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
		<AcadTable acads={this.state.result} />
		</div>
	);
    }
}

ReactDOM.render(
    <NameForm />,
    document.getElementById('search')
);
