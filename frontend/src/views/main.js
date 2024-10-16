document.addEventListener('DOMContentLoaded', () => {
  const productForm = document.getElementById('productForm');
  const productList = document.getElementById('products');

  productForm.addEventListener('submit', createProduct);
  
  fetchProducts();

  async function createProduct(e) {
      e.preventDefault();
      
      const formData = new FormData();
      formData.append('name', document.getElementById('name').value);
      formData.append('description', document.getElementById('description').value);
      formData.append('price', document.getElementById('price').value);
      formData.append('image', document.getElementById('image').files[0]);

      try {
          const response = await fetch('http://localhost:3000/api/products', {
              method: 'POST',
              body: formData
          });

          if (!response.ok) {
              throw new Error('Error al crear el producto');
          }

          const newProduct = await response.json();
          addProductToList(newProduct);
          productForm.reset();
      } catch (error) {
          console.error('Error:', error);
      }
  }

  async function fetchProducts() {
      try {
          const response = await fetch('http://localhost:3000/api/products');
          if (!response.ok) {
              throw new Error('Error al obtener los productos');
          }
          const products = await response.json();
          products.forEach(addProductToList);
      } catch (error) {
          console.error('Error:', error);
      }
  }

  function addProductToList(product) {
      const li = document.createElement('li');
      li.innerHTML = `
          <h3>${product.name}</h3>
          <p>${product.description}</p>
          <p>Precio: $${product.price}</p>
          ${product.imageUrl ? `<img src="http://localhost:3000${product.imageUrl}" alt="${product.name}">` : ''}
      `;
      productList.appendChild(li);
  }
});