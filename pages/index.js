import fs from "fs/promises";
import path from "path";
import Link from "next/link";

function HomePage(props) {
  const { products } = props;
  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>
          {/* {product.title} */}
          <Link href={`/products/f${product.id}`}>{product.title}</Link>
        </li>
      ))}
    </ul>
  );
}

/* code runs on the server side only in getStaticProps */
export async function getStaticProps() {
  console.log("Re-generating");
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);
  /*
    WHEN WE DONT HAVE ANY DATA  */
  if (!data) {
    return {
      redirect: {
        destination: "/no-data",
      },
    };
  }
  /* WHEN WE DONT HAVE ANY PRODUCT DATA IN PAGE EMPTY PAGE */
  if (data.products.length === 0) {
    return { notFound: true };
  }
  return {
    props: {
      products: data.products,
    },
    revalidate: 10,
    //here we can use [redirect] and [notFound] utiltiy
    //redirect -->used to redirect the use to next page
  };
}

export default HomePage;
