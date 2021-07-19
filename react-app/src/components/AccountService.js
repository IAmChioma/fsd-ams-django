import axios from 'axios';

export default class AccountService {

    getAccount() {
		return axios.get('http://127.0.0.1:8000/api/accounts/').then(res => res.data.data);
	}

	updateAccounts(id, newStatus) {
		let stats = JSON.stringify({status: newStatus})
		return axios.patch(`http://127.0.0.1:8000/statistics/count/${id}/`,stats, {headers: {'Content-Type': 'application/json'}}).then(res => res.data);

    }

}