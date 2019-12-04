export const fetchCategoriesAndProviders = () => {
  return new Promise(resolve => {
    resolve({
      defaultProviders: ['2B CUISINE', 'DEJA VU'],
      defaultCategories: [
        'MEAL OF THE DAY',
        'VEGETARIAN MEAL',
        'BANTING MEAL',
        'OTHER'
      ]
    });
  });
};
