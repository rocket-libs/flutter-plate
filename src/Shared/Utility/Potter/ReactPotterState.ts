import { PotterState } from "potter-nf";

export default class ReactPotterState<TRepository,TState> extends PotterState<TRepository,TState>{
    started: boolean = false;
}