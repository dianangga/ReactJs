import React, { Component } from 'react';
import Moment from 'moment';

export default class header extends Component {
	state = {
		waktu: Moment().format('dddd'), 
		time: Moment().format('LLL'),
	};
	render() {
		let plus62 = require('moment/locale/id'); 		
		Moment.updateLocale('id', plus62);
		return (
			<div>
				<h3>Aplikasi Aktivitas harian warga +62</h3>
				<p>
					{this.state.waktu} {this.state.time}
				</p>
			</div>
		);
	}
}
