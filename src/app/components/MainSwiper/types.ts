import {Dispatch, SetStateAction} from "react";

export interface IEvent {
    year: number;
    info: string;
}
export interface ICategory {
    yearStart: number;
    yearEnd: number;
    category: string;
    events: IEvent[];
}
export interface IMainSwiperProps {
    data: ICategory[],
    emitIndex: Dispatch<SetStateAction<number>>,
    activeIndex: number
}
