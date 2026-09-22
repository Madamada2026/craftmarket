import ProductCard from './components/ProductCard/ProductCard'
import vaseImg from './assets/stock-photo-ceramic-vase.jpg'

const products = [
  {
    id: 1,
    name: 'Ваза керамічна',
    price: 450,
    category: 'Кераміка',
    image: vaseImg,
    onSale: true,
  },
  {
    id: 2,
    name: "Дерев'яна миска",
    price: 320,
    category: "Дерев'яні вироби",
  },
  {
    id: 3,
    name: 'Кулон срібний',
    price: 780,
    category: 'Прикраси',
    inStock: false,
  },
]

function App() {
  return (
    <main
      className="catalog-preview"
      style={{ display: 'flex', gap: '16px', padding: '20px' }}
    >
      {products.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </main>
  )
}

export default App




