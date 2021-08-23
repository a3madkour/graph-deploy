import React, { createRef, Component, useState, useEffect } from 'react';
import GraphComponent from './graph.component'
import { Button, Select, Grid, MenuItem, Dialog, DialogActions, DialogContent, TextField, DialogTitle, DialogContentText, Divider, Fab, useTheme } from '@material-ui/core'
import { IGraph, IRule } from '../util/graph';


interface Props {
    changeSelectRule: (rule: IRule) => void,
    rules: Array<IRule>
}

interface DialogState {
    open: boolean
    textField: string
    error: boolean
}
interface State {
    currentRule: IRule
    dialogState: DialogState
}



export default function RulesListComponent(props: Props) {

    const defaultDialogState = {
        open: false,
        textField: "",
        error: false
    }
    const emptyLetter = {
        label: "",
        abbrev: "",
        terminality: false
    }
    const emptyGraph: IGraph =
    {
        nodes: [],
        edges: []
    }
    const defaultRule: IRule = {
        name: "",
        lhs: emptyGraph,
        rhs: []
    }
    const [state, setState] = useState({ currentRule: defaultRule, dialogState: defaultDialogState });
    const theme = useTheme();

    const handleTextChange = (e: any) => {
        setState({
            currentRule: state.currentRule, dialogState: {
                open: true,
                textField: e.target.value,
                error: false
            }
        })
        props.changeSelectRule(state.currentRule);
    }
    const handleClose = () => {
        setState({ currentRule: state.currentRule, dialogState: defaultDialogState });
    };

    const handleSelectChange = (e: any) => {
        const ruleName = e.target.value
        /* console.log(e.target.value); */
        const rightRule = props.rules.find(rule => rule.name == ruleName);
        if (!rightRule) {
            return
        }

        setState({
            currentRule: rightRule, dialogState: defaultDialogState
        })
        props.changeSelectRule(state.currentRule);
    };


    const createRule = (name: string) => {
        const newRule = {
            name: name,
            lhs: {
                nodes: [],
                edges: []
            },
            rhs: []
        }

        props.rules.push(newRule);
        props.changeSelectRule(newRule);
        setState({ currentRule: newRule, dialogState: defaultDialogState })

    }

    const checkIfRepeated = (ruleName: string) => {
        for (var i = 0; i < props.rules.length; i++) {
            if (props.rules[i].name == ruleName) {
                /* console.log("name taken alter the user") */
                return true
            }
        }
        return false
    }

    const handleSubmit = () => {
        //check if name already exists
        if (state.dialogState.textField != '' && !checkIfRepeated(state.dialogState.textField)) {
            createRule(state.dialogState.textField);
        } else {
            setState({
                currentRule: state.currentRule, dialogState: {
                    open: true,
                    textField: state.dialogState.textField,
                    error: true
                }
            });
        }

    };

    useEffect(() => {
        if (props.rules.length > 0 && state.currentRule.name == '') {

            setState({ currentRule: props.rules[0], dialogState: defaultDialogState })
        }

    }, []);

    const makeMenuItems = () => {
        return props.rules.map(rule => {
            return <MenuItem key={rule.name} value={rule.name}>{rule.name}</MenuItem>
        })
    }
    const handleAddRule = () => {

        setState({
            currentRule: state.currentRule, dialogState: {
                open: true,
                textField: '',
                error: false
            }
        })
    }


    const createLHS = () => {


        const returnValue = [];
        returnValue.push(<GraphComponent graph={state.currentRule.lhs} letter={emptyLetter} manipulate={false} />)
        return returnValue
    }

    const createRHS = () => {
        const rightRule = state.currentRule;
        if (!rightRule) {
            return
        }
        const rhs = rightRule.rhs
        const returnValue = [];
        for (var i = 0; i < rhs.length; i++) {

            returnValue.push(<GraphComponent graph={rhs[i].graph} letter={emptyLetter} manipulate={false} />);
            if (i != (rhs.length - 1)) {
                returnValue.push(<Divider flexItem />)
            }

        }
        return returnValue

    }

    const handleEditRule = () => {
        if (state.currentRule.name != "") {
            props.changeSelectRule(state.currentRule)
        }

    }

    const handleDeleteRule = () => {
        if (state.currentRule.name != "") {
            for (var i = 0; i < props.rules.length; i++) {
                if (state.currentRule === props.rules[i]) {
                    /* console.log("deleting rule: " + props.rules[i].name) */
                    props.rules.splice(i, 1);
                }
            }
            /* console.log(props.rules); */
            setState({ currentRule: defaultRule, dialogState: state.dialogState });
        }

    }
    return (

        <div >
            <div>
                <Select

                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    variant="outlined"
                    value={state.currentRule.name}
                    onChange={handleSelectChange}
                    style={{ width: '100%' }}
                >
                    {makeMenuItems()}
                </Select>
            </div>
            <Divider />
            <div>
                <Dialog open={state.dialogState.open} onClose={handleClose}>
                    <DialogTitle>New Rule</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Please enter rule name:
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            onChange={handleTextChange}
                            value={state.dialogState.textField}
                            label="Rule Name"
                            error={state.dialogState.error}
                            required
                            fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={handleSubmit} color="primary">
                            Create
                        </Button>
                    </DialogActions>
                </Dialog>
                <Grid container justify='center' spacing={2} >
                    <Grid className="gridElement" item>
                        {createLHS()}
                    </Grid>
                    <Divider orientation="vertical" flexItem />
                    <Grid className="gridElement" item >
                        {createRHS()}
                    </Grid>
                </Grid>
                {/*Figure out how to hide this and the list when there are no rules selected */}
            </div>

        </div >
    )

}
