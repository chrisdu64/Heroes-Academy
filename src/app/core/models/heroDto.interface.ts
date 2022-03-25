import { Ability } from "./ability.interface";
import { Technique } from "./technique.interface";

export interface HeroDto {
    id: number;
    name: string;
    description: string;
    myImg: string;
    abilities: Ability[];
    techniques: Technique[];
}
