const schema = `
type Results {
  result: String
}
type Regions {
  regions: String
}

type Alert {
 country: String
 name: String
 text: String
 date: String
 region: String
 subregion: String
}

type Advisery{
  _id : String
  name: String
  country: String
  date: String
  text: String
}

type User {
  name: String
  age: Int
  email: String
  },

type Query {
    project1_setup: Results
    alerts: [Alert]
    users: [User]
    adviseries: [Advisery]
    alertsforregion(region: String): [Alert]
    alertsforsubregion(subregion: String): [Alert]
    regions: [String]
    subregions: [String]
  }

  type Mutation {
    addOneAdvisory(name: String!, country: String!, date: String!, text: String!): Advisery
    adduser(name: String,age: Int! , email: String! ) : User
  }



`;

export { schema };
