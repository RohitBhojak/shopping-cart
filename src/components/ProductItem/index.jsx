export default function ProductItem(product) {
  return (
    <div>
      <img src={product.image} height={100} width={100} />
      <span>{product.title}</span>
      <span>{product.price}</span>
      <div>
        <div>
          <button>-</button>
          <input />
          <button>+</button>
        </div>
        <button>cart</button>
      </div>
    </div>
  );
}
