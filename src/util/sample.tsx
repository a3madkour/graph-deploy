import { IGraph } from './graph';


interface Score {
    predicted_score: number,
    score: number,
    uncertainty: number
}
export interface ISample extends Document {
    _id: string,
    graph: IGraph,
    grammar_id: string,
    scores: Record<string, Score>,
    query_id: string,
    scored: boolean
}
