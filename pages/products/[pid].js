import path from "path";
import fs from "fs/promises";

import { Fragment } from "react";

const ProductDetailsPage = (props) => {
  const { loadedProduct } = props;

  
  if (!loadedProduct) {
    return <p>Loading...</p>;
  }

  return (
    <Fragment>
      <h1>{loadedProduct.title}</h1>
      <h1>{loadedProduct.description}</h1>
    </Fragment>
  );
};

async function getData() {
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  return data;
}

export async function getStaticProps(context) {
  const { params } = context;
  const productId = params.pid; /* pid here bcs file name is pid */
  const data = await getData();
  const product = data.products.find((product) => product.id === productId);


  /* if id is not match to page so 
  it wil return the 404 page */
  if (!product) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      loadedProduct: product,
    },
  };
}

export async function getStaticPaths() {
  const data = await getData();

  const ids = data.products.map((product) => product.id); //load the data from dummy-backend.js
  const pathsWithParams = ids.map((id) => ({ params: { pid: id } })); // sort   id from ids
  console.log(pathsWithParams)
  return { 
    /*  paths: [
      { params: { pid: "p1" } },
      { params: { pid: "p2" } },
      { params: { pid: "p3" } },
    ], */
    paths: pathsWithParams,
    fallback: true,
  };
}
export default ProductDetailsPage;
