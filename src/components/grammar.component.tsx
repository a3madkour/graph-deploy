import React, { useEffect, useState } from 'react';
import axios from 'axios';
import GraphComponent from './graph.component'
import RulesListComponent from './rules-list.component';
import { IGraph, IRule } from '../util/graph';
import { default as grammar_json } from './dormans-grammar.json';

interface IGrammar {

    _id?: string,
    name: string,
    alphabet_id: string,
    axiom: IGraph,
    rules: Array<IRule>,
}


interface Props {
}

interface State {
    selectedRule: IRule,
    grammar: IGrammar
}

export default function GrammarComponent(props: Props) {

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
    const [state, setState] = useState(
        {
            selectedRule: defaultRule,
            grammar: grammar_json
        });

    const loadGrammar = () => {

        console.log("Invade Poland")
        console.log(state.grammar.axiom)


    }


    const editGraph = (e: any) => {

    }

    const changeCurrentRule = (rule: IRule) => {
        setState({
            selectedRule: rule,
            grammar: state.grammar
        })
    }

    const updateGrammar = () => {
    }

    useEffect(() => {


        loadGrammar();

    }, []);


    return (
        <div>
            <h2 style={{ textAlign: "center" }} >Axiom</h2>
            <div className="grammarContainer">
                <div className="grammarAxiom">
                    <GraphComponent graph={state.grammar.axiom} letter={emptyLetter} manipulate={false} />
                </div>
            </div>
            <h2 style={{ textAlign: "center" }} >Rules List</h2>
            <div>
                <RulesListComponent changeSelectRule={changeCurrentRule} rules={state.grammar.rules} />
            </div>
        </div >
    );


}
