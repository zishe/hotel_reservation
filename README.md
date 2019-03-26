# Hotel Reservation Sample App with React-native and GraphQL

A sample app for Hotel Reservation system built with React-Native and Apollo GraphQL for iOS and Android platforms

# Technologies Used

- [React-Native](https://facebook.github.io/react-native/docs/getting-started)
- [Native-Base component library](https://nativebase.io/)
- [Typescript](https://www.typescriptlang.org/)
- [React-Navigation](https://reactnavigation.org/)
- [Apollo GraphQL](https://www.apollographql.com/docs/react/)
- [Jest](https://jestjs.io/en/) / [react-test-renderer](https://reactjs.org/docs/test-renderer.html)

# How to Run App on iOS or Android Simulators

## Installing System Dependencies

##### Make sure you have your system environment pre-configured for react-native as described [here](https://facebook.github.io/react-native/docs/getting-started.html#installing-dependencies).

Also follow:

###### - [iOS dependencies](https://facebook.github.io/react-native/docs/getting-started.html#xcode)

and

###### - [Android dependencies](https://facebook.github.io/react-native/docs/getting-started.html#java-development-kit)

Once you have the system ready with the needed dependencies for react-native:

- Clone this repository in your working folder
- Open terminal and CD to your working folder and run below command:

```
git clone https://github.com/b-tiwari/hotel_reservation.git

cd hotel_reservation
```

- Install the dependencies:

```
yarn install` (or `npm install`)

```

### To run app on iOS simulator

`yarn buildRunIOS`
( or with npm - `npm run buildRunIOS`)

### To run app on Android simulator

`yarn buildRunAndroid`

### To run Unit tests

`yarn test`
or
`yarn testWithCoverage`
