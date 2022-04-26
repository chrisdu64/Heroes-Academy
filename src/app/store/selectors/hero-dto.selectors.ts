import { createSelector } from '@ngrx/store';
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
    selectHeroesDto,
    heroesDto => heroesDto.filter(
        heroDto => heroDto.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            heroDto.abilities.some(
                ability => ability.name.toLowerCase().includes(searchTerm.toLowerCase())
            ) ||
            heroDto.techniques.some(
                technique => technique.name.toLowerCase().includes(searchTerm.toLowerCase())
            )

    )
);

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

export const selectHeroesByTechniqueName = (techniqueName: string) => createSelector(
    selectHeroesDto,
    heroesDto => heroesDto.filter(
        heroDto => heroDto.techniques.some(
            technique => technique.name.toLowerCase().includes(techniqueName.toLowerCase())
        )
    )
)
