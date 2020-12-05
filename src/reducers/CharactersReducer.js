const CharactersReducer = (state, action) => {
  switch (action.type) {
      case 'SET_CHARACTERS':
          const {results, offset, count, total, pageNumber} = action.payload
          return {
              ...state,
              results: pageNumber === 0 ? [...results] : [...state.results, ...results],
              currentTotal: offset + count,
              overallTotal: total,
              currentPageNumber: pageNumber
          };
      case 'RESET_CHARACTERS':
        return {
          ...state,
          results: [],
          currentTotal: 0,
          overallTotal:0,
          currentPageNumber:0
        }
      case 'SET_CURRENT_PAGE_NUMBER':
          return {
            ...state,
            currentPageNumber: action.payload
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
