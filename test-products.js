fetch('https://dummyjson.com/products?limit=200&skip=0')
  .then(res => res.json())
  .then(data => {
    console.log('Total produits attendus:', data.total);
    console.log('Produits retournés:', data.products.length);
    console.log('Skip:', data.skip);
    console.log('Limit:', data.limit);
  })
  .catch(e => console.error('Erreur:', e.message));
