# SCP App

This is a simple app for reading and posting entries about the creepy pasta known as [SCP](https://en.wikipedia.org/wiki/SCP_Foundation), but in Swedish.

The app uses [CrudCrud](https://crudcrud.com/) as the current backend. This comes with some limitations. The api key is only valid for 24 hours, and only 100 calls can be made per key.

In order to make testing the app smoother, a new key is fetched each time the user visits the app or refreshes the page. This means that no users will be able to see each others entries.

As of now, some test data is submitted att initialization of the app, so that it's possible to get a feel for how it works with multiple entries more easily.

## Development

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) and uses the [Material UI](https://mui.com/) library for view components.

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
