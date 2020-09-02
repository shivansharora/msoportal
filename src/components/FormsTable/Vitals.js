import React, { useState, useEffect } from 'react';
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Button from '../CustomButtons/Button';
import Card from '../Card/Card';
import CardHeader from '../Card/CardHeader';
import CardBody from '../Card/CardBody';
import Grid from '@material-ui/core/Grid';
import EditIcon from '@material-ui/icons/Edit';
import axios from '../../utils/axios1';
import Fab from '@material-ui/core/Fab';
// import Vitals from '../Forms/Vitals';
import { Link as RouterLink } from 'react-router-dom';


import {
	createMuiTheme,
} from "@material-ui/core/styles";

import {
	TableContainer,
	Link,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	Tooltip
} from '@material-ui/core';

const theme = createMuiTheme({
	overrides: {
		MuiTooltip: {
			tooltip: {
				fontSize: "1em",
				color: "black",
				backgroundColor: "#84b786",
			}
		}
	}
});


const StyledTableRow = withStyles((theme) => ({
	root: {
		'&:nth-of-type(odd)': {
			backgroundColor: theme.palette.action.hover,
		},

	},
}))(TableRow);

const styles = theme => ({
	cardTitleWhite: {
		color: "#FFFFFF",
		marginTop: "0px",
		minHeight: "auto",
		fontWeight: "300",
		fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
		marginBottom: "3px",
		textDecoration: "none"
	},
	icon: {
		cursor: 'pointer'
	},
	fab: {
		margin: 2,
		backgroundColor: '#66a668',
		width: 50,
		height: 42
	},
});

const useStyles = makeStyles(styles);

const VitalList = (props) => {
	const classes = useStyles();
	const { patient } = props
	// console.log(patient.attributes)
	const [vital , setVital] =useState([])


	useEffect(() => {
		let mounted = true;
		const fetchVitals = () => {
			if (localStorage.getItem("jwt") !== '' || localStorage.getItem("jwt") !== undefined) {
				let token = "Bearer " + localStorage.getItem("jwt");
				axios.get(`get_patient_vitals_by_visit_id/${patient.attributes.id}/${patient.attributes.last_visit_id}`, { headers: { Authorization: token } }).then(response => {
					if (mounted) {
						setVital(response.data.data);
						// console.log(response.data)
					}
				}).catch(error => {
					if (error.response.data !== "") {
						alert(error.response.data.error);
					} else {
						alert(error.response.statusText);
					}
				});
			}
		};

		fetchVitals();

		return () => {
			mounted = false;
		};
	}, []);
	return (
		<div className={classes.root} >
			<Grid >
				<Grid item xs={12} sm={12} md={12} >
					<Button style={{ float: 'right', marginTop: '-16px' }} 
					component={RouterLink}
					to={`/vital/${patient.attributes.id}/${patient.attributes.last_visit_id}`}
					>Add</Button>
					<Card style={{ marginTop: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.30), 0 10px 12px rgba(0,0,0,0.22)' }}>
						<CardHeader style={{ width: '85px', padding: '7px', marginTop: '-17px' }} color="success" >
							<h4 className={classes.cardTitleWhite}>Vitals</h4>
						</CardHeader>
						<CardBody>
							<TableContainer className={classes.container}>
								<Table stickyHeader aria-label="sticky table">
									<TableHead >
										<StyledTableRow >
											<TableCell style={{ backgroundColor: '#6a7075', color: 'white' }}>Weight(kg)</TableCell>
											<TableCell style={{ backgroundColor: '#6a7075', color: 'white' }}>Height(cm)</TableCell>
											<TableCell style={{ backgroundColor: '#6a7075', color: 'white' }}>Blood Pressure(bps)</TableCell>
											<TableCell style={{ backgroundColor: '#6a7075', color: 'white' }}>Pulse(per min)</TableCell>
											<TableCell style={{ backgroundColor: '#6a7075', color: 'white' }}>Respiration(per min)</TableCell>
											<TableCell style={{ backgroundColor: '#6a7075', color: 'white' }}>Temperature(F)</TableCell>
											<TableCell style={{ backgroundColor: '#6a7075', color: 'white' }}>BMI(kg^m2)</TableCell>
											<TableCell style={{ backgroundColor: '#6a7075', color: 'white' }}>BMI Status</TableCell>
											<TableCell align="right" style={{ backgroundColor: '#6a7075', color: 'white' }}>Actions</TableCell>
										</StyledTableRow>
									</TableHead>
									<TableBody>
									{vital.map(vital => (
										<StyledTableRow
											hover
										key={vital.id}
										>
											<TableCell>{vital.attributes.weight_kg} </TableCell>
											<TableCell>{vital.attributes.height_cm} </TableCell>
											<TableCell>{vital.attributes.bps}</TableCell>
											<TableCell>{vital.attributes.pulse} </TableCell>
											<TableCell>{vital.attributes.respiration}</TableCell>
											<TableCell>{vital.attributes.temperature_f}</TableCell>
											<TableCell>{vital.attributes.bmi}</TableCell>
											<TableCell>{vital.attributes.bmi_status}</TableCell>


											<TableCell align="right">
												<Link
													color="inherit"
													variant="h6"
													component={RouterLink}
													to={`/edit_vital/${vital.attributes.id}/${patient.attributes.last_visit_id}`}
												>
													<Tooltip title="Edit" aria-label="Edit">
														<Fab className={classes.fab}>

															<EditIcon
															/>
														</Fab>
													</Tooltip>
												</Link>
											</TableCell>
										</StyledTableRow>
										 ))} 
									</TableBody>
								</Table>
							</TableContainer>
						</CardBody>
					</Card>
				</Grid>
			</Grid>
		</div>
	);
}

export default VitalList;