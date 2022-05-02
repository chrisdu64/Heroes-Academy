import { createSelector } from '@ngrx/store';
import { HeroDto } from 'src/app/core/models/heroDto.interface';
import { selectAbilities } from './ability.selectors';
import { selectHeroes } from './hero.selectors';
import { selectTechniques } from './technique.selectors';

export const selectHeroesDto = createSelector(
    selectHeroes,
    selectAbilities,
    selectTechniques,
    (heroes, abilities, techniques) =>
        heroes.map(hero => ({
            ...hero,
            abilities: abilities.filter(
                ability => ability.heroId === hero.id),
            techniques: techniques.filter(
                technique => technique.heroId === hero.id)
        })),
);

export const selectHeroesDtoAbilitiesCount = (heroId: number) => createSelector(
    selectHeroesDto,
    heroesDto => {
        let abilitiesCount = 0;
        heroesDto.forEach(heroDto => {
            if (heroDto.id === heroId) {
                abilitiesCount = heroDto.abilities.length;
                return;
            }
        })
        return abilitiesCount
    },
);

export const selectHeroDtoById = (heroId: number) => createSelector(
    selectHeroesDto,
    heroesDto => heroesDto.find(
        heroDto => heroDto.id === heroId)
);

export const selectHeroesDtoBySearchTerm = (searchTerm: string) => createSelector(
    selectHeroesDtoByHeroDtoName(searchTerm),
    selectHeroesDtoByAbilityName(searchTerm),
    selectHeroesDtoByTechniqueName(searchTerm),
    (searchByName, searchByAbilityName, searchByTechniqueName) => [
        ...searchByName,
        ...searchByAbilityName,
        ...searchByTechniqueName
    ].reduce((acc, cur) => {
        if (!acc.some(heroDto => heroDto.id === cur.id && cur.id !== null)) acc = [...acc, cur];
        return acc;
    }, [] as HeroDto[])
        .sort((a: HeroDto, b: HeroDto) =>
            (a.name > b.name ? 1 : (a.name === b.name ? 0 : -1))
        )
)

export const selectHeroesDtoByHeroDtoName = (heroDtoName: string) => createSelector(
    selectHeroesDto,
    heroesDto => heroesDto.filter(
        heroDto => heroDto.name.toLowerCase().includes(heroDtoName.toLowerCase())
    )
)

export const selectHeroesDtoByAbilityName = (abilityName: string) => createSelector(
    selectHeroesDto,
    heroesDto => heroesDto.filter(
        heroDto => heroDto.abilities.some(
            ability => ability.name.toLowerCase().includes(abilityName.toLowerCase())
        )
    )
)

export const selectHeroesDtoByTechniqueName = (techniqueName: string) => createSelector(
    selectHeroesDto,
    heroesDto => heroesDto.filter(
        heroDto => heroDto.techniques.some(
            technique => technique.name.toLowerCase().includes(techniqueName.toLowerCase())
        )
    )
)

export const test = () => {
    console.log("test");

}