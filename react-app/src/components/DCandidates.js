import React, { useEffect,useState } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions/dCandidate'
import { Grid,Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, withStyles, ButtonGroup, Button } from '@material-ui/core'
import DCandidateForm from './DCandidateForm'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'


const styles = theme => {

    return (
        {
            root : {
             "& .MuiTableCell-head" : {
                 fontSize:"1.25rem"
             }
            },

            Paper : {
               margin: theme.spacing(2),
               padding: theme.spacing(2)
            }

        }
    )

}

const DCandidates = ({classes,...props}) => {

    const [currentId,setCurrentId] = useState(0)

    useEffect(() => {

    props.fetchAllCandidates()

   },[])

   const onDelete = (id) => {

    if(window.confirm('Are you sure?'))
        props.delete(id,() => {
            return window.alert("deleted.")
        })
   }

    return(
        <Paper className={classes.Paper} elevation={3}>
            <Grid container>
                    <Grid item xs={6}>
                    <DCandidateForm {...({currentId,setCurrentId})}/>
                    </Grid>
                    <Grid item xs={6}>
                        <TableContainer>
                            <Table>
                                <TableHead className={classes.root}>
                                    <TableRow>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Mobile</TableCell>
                                        <TableCell>Blood Group</TableCell>
                                        <TableCell></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        props.dCandidateList.map((record,index) => {
                                            return (
                                                <TableRow key={index} hover>
                                                    <TableCell>{record.fullName}</TableCell>
                                                    <TableCell>{record.mobile}</TableCell>
                                                    <TableCell>{record.bloodGroup}</TableCell>
                                                    <TableCell>
                                                        <ButtonGroup variant="text">
                                                           <Button onClick={() => setCurrentId(record.id)}><EditIcon color="primary"/></Button>
                                                           <Button onClick={() => onDelete(record.id)}><DeleteIcon color="secondary" /></Button>
                                                        </ButtonGroup>
                                                    </TableCell>
                                                </TableRow> 
                                            )
                                        })
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
            </Grid>
       </Paper>
    )

}

const mapStateToProps = (state) => (
    {
        dCandidateList : state.dCandidate.list
    }
)

const mapDispatchToProps = (dispatch) => {

    return{

    fetchAllCandidates: () => dispatch(actions.fetchAll()),
    delete: (id,success) => dispatch(actions.Delete(id,success))
    }
    
};

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(DCandidates))