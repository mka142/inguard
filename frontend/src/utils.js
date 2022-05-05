export async function errorHandler(rejectWithValue, func) {
    try {
      return await func();
    } catch (err) {
      let error = err;
      if (!error.response) {
        throw err;
      }
      return rejectWithValue(error.response.data);
    }
  }