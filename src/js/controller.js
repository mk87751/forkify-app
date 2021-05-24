import 'core-js/stable';
import 'regenerator-runtime/runtime';
import * as model from './model';
import recipeView from './views/recipeView';
import resultsView from './views/resultsView';
import searchView from './views/searchView';

// https://forkify-api.herokuapp.com/v2

if (module.hot) {
  module.hot.accept();
}
const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;

    //rendering recipeSpinner
    recipeView.renderSpinner();

    //1) loading recipe
    await model.loadRecipe(id);
    // const { recipe } = model.state;

    //2) rendering recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    console.log(err);
    recipeView.renderError();
  }
};

const controlSearchResult = async function () {
  try {
    resultsView.renderSpinner();
    //get the search query
    const query = searchView.getQuery();
    if (!query) return;

    //load the search results
    await model.loadSearchReasult(query);

    //render the search reslts
    console.log(model.state.search.results);
    resultsView.render(model.state.search.results);
  } catch (err) {
    console.log(err);
  }
};

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResult);
};

init();
