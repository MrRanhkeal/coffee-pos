import { useEffect, useState } from 'react';
import { request } from '../../util/helper';

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    request('product', 'get', {})
      .then(res => {
        if (mounted && res && !res.error && res.list) {
          setProducts(res.list);
        }
      })
      .finally(() => setLoading(false));
    return () => { mounted = false; };
  }, []);

  return { products, loading };
}
