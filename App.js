import React from 'react';
import './App.css';

import Modal from 'react-modal'; 

import Header from './header';

const customStyles = {
	content: {
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		marginRight: '-50%',
		transform: 'translate(-50%, -50%)',
	},
}; 

Modal.setAppElement('#root'); 

export default class App extends React.Component {
	constructor() {
		super();
		this.state = {
			todos: [],
			modalIsOpened: false,
			index: [],
			data: [],
		};

		this.openModal = this.openModal.bind(this);  
		this.afterOpenModal = this.afterOpenModal.bind(this);
		this.closeModal = this.closeModal.bind(this); 
	}

	openModal(data, i) {
		this.setState({ modalIsOpened: true, data: data, index: i }); 
	}

	afterOpenModal() {
		
		this.subtitle.style.color = '#00ff00';

		this.refs.editjam.value = this.state.data.jam;
		this.refs.editaktivitas.value = this.state.data.aktivitas;
	}
	closeModal() {
		this.setState({ modalIsOpened: false }); 
	}

	editTodo = a => {
		a.preventDefault(); 

		let newjam = this.refs.editjam.value; 
		let newaktivitas = this.refs.editaktivitas.value;
		let key = this.state.index; 

		this.state.todos.splice(key, 1, { jam: newjam, aktivitas: newaktivitas });

		this.setState({ todos: this.state.todos, data: [] });

		this.closeModal();
	};

	addTodo = e => {
		e.preventDefault();

		let jam = this.refs.jam.value; 
		let aktivitas = this.refs.aktivitas.value; 

		this.state.todos.push({ jam, aktivitas }); 
		this.setState({ todos: this.state.todos });

		this.refs.formulir.reset(); 
		this.refs.jam.focus(); 
	};

	removeTodo = i => {
		this.state.todos.splice(i, 1); 
		this.setState({ todos: this.state.todos });
	};
	render() {
		return (
			<div>
				<br />
				<div className="App">
					
					<Header />
				</div>
				<form ref="formulir" className="form-inline">
					<div className="form-group mx-sm-3 mb-2">
						<input type="time" className="form-control" ref="jam" />
						<input type="text" className="form-control" ref="aktivitas" placeholder="jenis aktivitas" />
					</div>
					<div className="form-group mb-2">
						<button onClick={this.addTodo} className="btn btn-info">
							simpan
						</button>
					</div>
				</form>
				<hr />
				<div>
					<ul className="list-group">
						{this.state.todos.map((data, i) => ( 
							<li className="list-group-item" key={i}>
								<div>
									{data.jam} : {data.aktivitas}
									<button onClick={() => this.openModal(data, i)} className="btn btn-outline-primary mx-sm-3 mb-2">
										Edit
									</button>
									<button onClick={() => this.removeTodo(i)} className="btn btn-outline-danger mx-sm-3 mb-2">
										Hapus
									</button>
								</div>
							</li>
						))}
					</ul>
				</div>
				<Modal
					isOpen={this.state.modalIsOpened} 
					onAfterOpen={this.afterOpenModal}
					onRequestClose={this.closeModal}
					style={customStyles}
				>
					<div>
						<h2 ref={subtitle => (this.subtitle = subtitle)}>Edit</h2>
						<form ref={editform => (this.editform = editform)}>
							<div className="form-group">
								<input type="time" ref="editjam" className="form-control" />
							</div>
							<div className="form-group">
								<input type="text" ref="editaktivitas" className="form-control" />
							</div>
							<div className="form-group mb-2 float-right">
								<button onClick={this.editTodo} className="btn btn-info">
									Simpan
								</button>
							</div>
							<div className="form-group mb-2 float-left">
								<button onClick={this.closeModal} className="btn btn-outline-danger">
									Batal
								</button>
							</div>
						</form>
					</div>
				</Modal>
			</div>
		);
	}
}
