import { expect, test } from "vitest";
import * as main from "./main.js";
import { City } from "./city.js";
import { Person } from "./person.js";

const NEW_YORK = new City(`New York`, `USA`);
const LOS_ANGELES = new City(`Los Angeles`, `USA`);
const LONDON = new City(`London`, `UK`);

const ALICE = new Person(`Alice`, 25, NEW_YORK, [ `English`, `French` ]);
const BOB = new Person(`Bob`, 30, LOS_ANGELES, [ `English` ]);
const CHARLIE = new Person(`Charlie`, 28, NEW_YORK, [ `English`, `German` ]);
const DAVID = new Person(`David`, 35, LONDON, [ `Dutch`, `German` ]);
const EVE = new Person(`Eve`, 22, LOS_ANGELES, [ `French`, `English`, `Spanish` ]);

const PEOPLE = Array.of(ALICE, BOB, CHARLIE, DAVID, EVE);

test(`People at least years old`, () => {
    const result = main.peopleAtLeastYearsOld(PEOPLE, 30);
    // verify
    expect(result).toStrictEqual([ BOB, DAVID ]);
});

test(`City names`, () => {
    const result = main.cityNames(PEOPLE);
    // verify
    expect(result).toBeInstanceOf(Array);
    expect(result).toHaveLength(3);
    expect(result).toContain(LONDON.name, NEW_YORK.name, LOS_ANGELES.name);
});

test(`Person by name`, () => {
    const result = main.personByName(PEOPLE, "Alice");
    // verify
    expect(result).toBe(ALICE);
});

test(`Average age`, () => {
    const result = main.averageAge(PEOPLE);
    // verify
    expect(result).toBe(28);
});

test(`Average age fails if no people given at all`, () => {
    expect(() => main.averageAge([])).toThrow(`No people!`);
});

test(`Group people by city`, () => {
    const result = main.groupPeopleByCity(PEOPLE);
    // verify
    expect(result).toStrictEqual(new Map([
        [ NEW_YORK, Array.of(ALICE, CHARLIE) ],
        [ LOS_ANGELES, Array.of(BOB, EVE) ],
        [ LONDON, Array.of(DAVID) ]
    ]));
});

test(`Index of the oldest person`, () => {
    const result = main.indexOfTheOldestPerson(PEOPLE);
    // verify
    expect(result).toBe(3);
});

test(`Index of the oldest person is minus one if no person is given at all`, () => {
    const result = main.indexOfTheOldestPerson([]);
    // verify
    expect(result).toBe(-1);
});

test(`Comma separated names`, () => {
    const result = main.commaSeparatedNames(PEOPLE);
    // verify
    expect(result).toBe(`Alice, Bob, Charlie, David, Eve`);
});

test(`Short and long named`, () => {
    const result = main.shortAndLongNamed(PEOPLE, 3);
    // verify
    expect(result[0]).toHaveLength(2);
    expect(result[0]).toContain(BOB, EVE);
    expect(result[1]).toHaveLength(3);
    expect(result[1]).toContain(ALICE, CHARLIE, DAVID);
});

test(`Languages in a city`, () => {
    const result = main.languagesInCity(PEOPLE, NEW_YORK);
    // verify
    expect(result).toBeInstanceOf(Array);
    expect(result).toHaveLength(3);
    expect(result).toContain(`English`, `French`, `German`);
});
