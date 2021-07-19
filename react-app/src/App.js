import React, {useState, useEffect} from "react";
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AccountService from "./components/AccountService";
import { AccountStatus } from "./components/stats";

const StyledTableCell = withStyles((theme) => ({
	head: {
	  backgroundColor: theme.palette.common.black,
	  color: theme.palette.common.white,
	},
	body: {
	  fontSize: 14,
	},
  }))(TableCell);
  
  const StyledTableRow = withStyles((theme) => ({
	root: {
	  '&:nth-of-type(odd)': {
		backgroundColor: theme.palette.action.hover,
	  },
	  '& > *': {
		margin: theme.spacing(1),
		width: '25ch',
	  },
	},
  }))(TableRow);
  const BootstrapInput = withStyles((theme) => ({
	root: {
	  'label + &': {
		marginTop: theme.spacing(3),
	  },
	},
	input: {
	  borderRadius: 4,
	  position: 'relative',
	  backgroundColor: theme.palette.background.paper,
	  border: '1px solid #ced4da',
	  fontSize: 16,
	  padding: '10px 26px 10px 12px',
	  transition: theme.transitions.create(['border-color', 'box-shadow']),
	  // Use the system font instead of the default Roboto font.
	  fontFamily: [
		'-apple-system',
		'BlinkMacSystemFont',
		'"Segoe UI"',
		'Roboto',
		'"Helvetica Neue"',
		'Arial',
		'sans-serif',
		'"Apple Color Emoji"',
		'"Segoe UI Emoji"',
		'"Segoe UI Symbol"',
	  ].join(','),
	  '&:focus': {
		borderRadius: 4,
		borderColor: '#80bdff',
		boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
	  },
	},
  }))(InputBase);
  
  const useStyles = makeStyles((theme) => ({
	table: {
	  minWidth: 700,
	},
	input: {
		width: 200,
		display:'block',
		marginTop: '1%',
		marginBottom: '1%'
	  },
	  margin: {
		margin: theme.spacing(1),
	  },
  }))

function App() {
	const classes = useStyles();
	const [accounts, setAccounts] = React.useState([]);
	const [selectedStatus, setSelectedStatus] = useState(" ");
	const [pendingTotal, setPendingTotal] = useState(0);
	const [pendingAccount, setPendingAccount] = useState(0);
	const [openedTotal, setOpenedTotal] = useState(0);
	const [openedAccount, setOpenedAccount] = useState(0);
	const [closedTotal, setClosedTotal] = useState(0);
	const [closedAccount, setClosedAccount] = useState(0);
	const [suspendedTotal, setSuspendedTotal] = useState(0);
	const [suspendedAccount, setSuspendedAccount] = useState(0);
	const [deletedTotal, setDeletedTotal] = useState(0);
	const [deletedAccount, setDeletedAccount] = useState(0);
	let uniqueId = null;
	let newStatus = '';
	const service = new AccountService();
	React.useEffect(() => {
		
		service.getAccount()
		.then((response) => {
			setAccounts(response);
			getPendingTotal(response);
			getClosedTotal(response);
			getOpenedTotal(response);
			getSuspendedTotal(response);
			getDeletedTotal(response);
			
		})
		.catch((error) => {
			console.log(error);
		});
}, []);

const refreshItem = () => {
	service.getAccount()
	.then((response) => {
		setAccounts(response);
		getPendingTotal(response);
		getClosedTotal(response);
		getOpenedTotal(response);
		getSuspendedTotal(response);
		getDeletedTotal(response);
	})
	.catch((error) => {
		console.log(error);
	});
}
	const handleChange = (event) => {
		setSelectedStatus(event.target.value);
	};


	  const handleStatus = (e) => {
		  const stats = e.target.value;
		  const valSplit = stats.split(' ');
		  uniqueId = valSplit[1];
		  newStatus = valSplit[0];
		
	  };
	
	  const updateStatusValue = () => {
		  if(uniqueId === null){
			alert(' Kindly select a valid status');
			return
		  }
		service.updateAccounts(uniqueId, newStatus).then(res => {console.log(res);
			alert(res.balance +' successfully updated to ' + res.status);
			refreshItem();
			return res})
	  }
	  const getPendingTotal = (res) => {
		const arr = [...res]
		let tol = 0;
		if(arr.length > 0){
		let totalPending = arr.filter(item => {
		 if (item.status.includes('pending')){
			tol += item.balance;
				return item
			}})
		setPendingTotal(tol);
		setPendingAccount(totalPending.length)
		return totalPending;
	}
	  };
	  const getClosedTotal = (res) => {
		const arr = [...res]
		let tol = 0;
		if(arr.length > 0){
		let totalClosed = arr.filter(item => {
		 if (item.status.includes('closed')){
			tol += item.balance;
				return item
			}})
		setClosedTotal(tol);
		setClosedAccount(totalClosed.length)
		return totalClosed;
	}
	  };
	  const getOpenedTotal = (res) => {
		const arr = [...res]
		let tol = 0;
		if(arr.length > 0){
		let totalOpened = arr.filter(item => {
		 if (item.status.includes('opened')){
			tol += item.balance;
				return item
			}})
		setOpenedTotal(tol);
		setOpenedAccount(totalOpened.length)
		return totalOpened;
	}
	  };
	  const getSuspendedTotal = (res) => {
		const arr = [...res]
		let tol = 0;
		if(arr.length > 0){
		let totalSuspended = arr.filter(item => {
		 if (item.status.includes('suspended')){
			tol += item.balance;
				return item
			}})
		setSuspendedTotal(tol);
		setSuspendedAccount(totalSuspended.length)
		return totalSuspended;
	}
	  };
	  const getDeletedTotal = (res) => {
		const arr = [...res]
		let tol = 0;
		if(arr.length > 0){
		let totalDeleted = arr.filter(item => {
		 if (item.status.includes('deleted')){
			tol += item.balance;
				return item
			}})
		setDeletedTotal(tol);
		setDeletedAccount(totalDeleted.length)
		return totalDeleted;
	}
	  };
	return (
		<div className="main-content">
	<form className={classes.root} noValidate autoComplete="off">
	<TextField id="outlined-basic" label={pendingAccount + " Account(s) Pending"} variant="outlined" value={pendingTotal} disabled/>
	<TextField id="outlined-basic" label={openedAccount + " Account(s) Opened"} variant="outlined" value={openedTotal} disabled/>
	<TextField id="outlined-basic" label={closedAccount + " Account(s) Closed"} variant="outlined" value={closedTotal} disabled />
	<TextField id="outlined-basic" label={suspendedAccount + " Account(s) Suspended"} variant="outlined" value={suspendedTotal} disabled />
      <TextField id="outlined-basic" label={deletedAccount + " Account(s) Deleted"} variant="outlined" value={deletedTotal} disabled />
    </form>
<div>
		<FormControl className={classes.margin}>
        <InputLabel htmlFor="demo-customized-select-native">Status</InputLabel>
        <NativeSelect
          id="demo-customized-select-native"
          value={selectedStatus}
          onChange={handleChange}
          input={<BootstrapInput />}
        >
          <option aria-label="None" value=" ">All</option>
          <option value={AccountStatus.PENDING}>Pending</option>
          <option value={AccountStatus.OPENED}>Opened</option>
		  <option value={AccountStatus.CLOSED}>Closed</option>
		  <option value={AccountStatus.SUSPENDED}>Suspended</option>
		  <option value={AccountStatus.DELETED}>Deleted</option>
        </NativeSelect>
      </FormControl>
	  </div>
			    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Balance</StyledTableCell>
			<StyledTableCell>Status</StyledTableCell>
            <StyledTableCell align="right">Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
		{accounts.filter(item => {
				if(selectedStatus===" "){
					return item
				} else if (item.status.includes(selectedStatus)){
					return item
				}
			})
			.map(item =>{
				return (
			
		  
            <StyledTableRow key={item.id}>
              <StyledTableCell component="th" scope="row">
			  {item.balance}
              </StyledTableCell>
			  <StyledTableCell>{item.status}</StyledTableCell>
              <StyledTableCell align="right">
				  <FormControl>
        <NativeSelect
          id="demo-customized-select-native"
		  onChange={handleStatus}
          input={<BootstrapInput />}
        >
		<option aria-label="None" value=" ">Select</option>
          <option value={AccountStatus.PENDING + ' ' + item.id}>Pending</option>
          <option value={AccountStatus.OPENED+ ' ' + item.id}>Opened</option>
		  <option value={AccountStatus.CLOSED+ ' ' + item.id}>Closed</option>
		  <option value={AccountStatus.SUSPENDED+ ' ' + item.id}>Suspended</option>
		  <option value={AccountStatus.DELETED+ ' ' + item.id}>Deleted</option>
        </NativeSelect>
      </FormControl> &nbsp;
			  <Button variant="contained" color="primary" onClick={updateStatusValue}>
        Change
      </Button>
	  </StyledTableCell>
            </StyledTableRow>
				)
					})
				}
        </TableBody>
      </Table>
    </TableContainer>



	

			
		</div>
	);
}

export default App;
