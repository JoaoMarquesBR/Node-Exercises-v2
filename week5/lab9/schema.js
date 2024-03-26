const schema = `
type Query {
countries: [Country],
countrybycode(code: String): Country
},
type Country {
_id: String
name: String
code: String
},
type Mutation {
addcountry(name: String, code: String): Country
}
`;

export { schema };

// type Mutation {
// adduser(name: String, age: Int, email: String): User
// }