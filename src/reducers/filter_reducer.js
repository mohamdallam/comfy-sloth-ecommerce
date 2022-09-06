import {
  LOAD_PRODUCTS,
  //
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
} from "../actions";

const filter_reducer = (state, action) => {
  ////////////////////// * Load Products * /////////////////////////////
  if (action.type === LOAD_PRODUCTS) {
    return {
      ...state,
      all_products: [...action.payload],
      filtered_products: [...action.payload],
    };
  }

  //////////////////////*  Set Grid * ////////////////////////////
  if (action.type === SET_GRIDVIEW) {
    return { ...state, grid_view: true };
  }

  ////////////////////// *  Set list  * ////////////////////////////
  if (action.type === SET_LISTVIEW) {
    return { ...state, grid_view: false };
  }

  ////////////////////// *  Update Sort  * ////////////////////////////
  if (action.type === UPDATE_SORT) {
    return { ...state, sort: action.payload };
  }

  ////////////////////// *   Sort By Product   * ////////////////////////////
  if (action.type === SORT_PRODUCTS) {
    const { sort, filtered_products } = state;
    let tempProducts = [...filtered_products];
    if (sort === "price-lowest") {
      tempProducts = tempProducts.sort((a, b) => {
        if (a.price < b.price) {
          return -1;
        }
        if (a.price > b.price) {
          return 1;
        }
        return 0;
      });
    }
    if (sort === "price-highest") {
      tempProducts = tempProducts.sort((a, b) => b.price - a.price);
    }
    if (sort === "name-a") {
      tempProducts = tempProducts.sort((a, b) => {
        return a.name.localeCompare(b.name);
      });
    }
    if (sort === "name-z") {
      tempProducts = tempProducts.sort((a, b) => {
        return b.name.localeCompare(a.name);
      });
    }
    return { ...state, filtered_products: tempProducts };
  }

  throw new Error(`No Matching "${action.type}" - action type`);
};

export default filter_reducer;
