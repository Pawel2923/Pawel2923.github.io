import { useParams } from "react-router-dom";

const ProductDetail = () => {
    const params = useParams();

    console.log(params);
    
    return (
        <section>
            <h1>Szczegóły produktu</h1>
            <p>{params.productId}</p>
        </section>
    );
};

export default ProductDetail;
