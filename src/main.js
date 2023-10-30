export const peopleAtLeastYearsOld = (people, age) => people.filter(person => person.age >= age);

export const cityNames = people => Array.from(new Set(people.map(person => person.city.name)));

export const personByName = (people, name) => people.find(person => person.name === name);

export const averageAge = people => {
    if (people.length > 0) {
        let ages = people.map(person => person.age);
        return ages.reduce((sum, age) => sum + age) / ages.length;
    }
    throw Error("No people!");
};

// Note: Object.groupBy() is not yet supported in all major browsers
export const groupPeopleByCity = people => people.reduce(
    (map, person) => map.set(person.city, (map.get(person.city) || []).concat(person)),
    new Map()
);

export const indexOfTheOldestPerson = people => people.reduce(
    (maxAgeAndIndex, person, index) => person.age > maxAgeAndIndex[0] ? [ person.age, index ] : maxAgeAndIndex,
    [ Number.NEGATIVE_INFINITY, -1 ]
)[1];

export const commaSeparatedNames = people => people.map(person => person.name).join(", ");

// Note: There is no native partition method in JavaScript
export const shortAndLongNamed = (people, nameLengthLimit) => people.reduce(
    (result, person) => person.name.length <= nameLengthLimit ? [ result[0].concat(person), result[1] ] : [ result[0], result[1].concat(person) ],
    [ [], [] ]
);

export const languagesInCity = (people, city) => Array.from(new Set(
    people.filter(person => city === person.city)
        .flatMap(person => person.languages)
));
