const CharactersReducer = (state, action) => {
  switch (action.type) {
      case 'SET_CHARACTERS':
          return {
              ...state,
              results: action.payload
          };
      case 'SET_PAGE_NUMBER':
          return {
            ...state,
            pageNumber: action.payload
          }
      case 'SET_CURRENT_TOTAL':
        return {
          ...state,
          currentTotal: action.payload
        }
      case 'SET_OVERALL_TOTAL':
        return {
          ...state,
          overallTotal: action.payload
        }
      case 'SET_SEARCH_PHRASE':
        return {
          ...state,
          searchPhrase: action.payload
        }
      default:
          return state;
  }
};

export default CharactersReducer;