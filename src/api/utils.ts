const getFirstErrorMessage = (errorData: any): string => {
  try {
    if (errorData.errors) {
      const errorObj = errorData.errors;
      const firstKey = Object.keys(errorObj)[0];
      const firstErrorArray = errorObj[firstKey];
      return firstErrorArray[0];
    } else if (errorData.message) {
      return errorData.message;
    } else {
      return 'Something went unplanned. Please try again';
    }
  } catch (ex) {
    console.log(ex);
    return 'Something went unplanned. Please try again';
  }
};

export { getFirstErrorMessage };
