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
	const disp_tutor = academico.disponible_tutor ? '✔' : ' ';
	const disp_miembro = academico.disponible_miembro ? '✔' : ' ';	
	return (
		<tr>
		<td><a href={"/tutores/" + academico.username + "/"}>{academico.nombre}</a></td>
		<td><WordList words={academico.palabras_clave} /></td>
		<td>{disp_tutor}</td>
		<td>{disp_miembro}</td>
		</tr>
	);
    }
}


class AcadTable extends React.Component {
    
    render () {

	const acad_rows = []
	
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
		<th>Disponible como tutor principal (dirección de alumnos)</th>
		<th>Disponible como miembro de comité tutor (asesoría de alumnos)</th>
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
	
	const URL = '/siges/inicio/academicos/search/?qs=' + this.state.value;
	// const URL = 'http://localhost:8000/inicio/academicos/search/?qs=' + this.state.value;	
	
	fetch(URL)
	    .then(response => response.json())
	    .then((jsonData) => {
		this.setState({result: jsonData['result']});
	    })
	    .catch((error) => {
	    	console.log(error);
	    });
    }
    
    render() {
	return (<div>
		<form onSubmit={this.handleSubmit}>
		<label>
		<input type="text" value={this.state.value} onChange={this.handleChange} placeholder="nombres, palabras clave..." />
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
