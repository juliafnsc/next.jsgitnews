import { GetStaticProps } from 'next';
import Head from 'next/head';

import { SubscribeButton } from '../components/SubscribeButton';
import { stripe } from '../services/stripe';

import styles from './home.module.scss';

// Client-side
// Server-side 
// Static Side Generation 

interface HomeProps {
  product: {
    priceId: string;
    amount: number;
  }
}

export default function Home({ product }: HomeProps) {
  return ( 
    <>
        <Head>
          <title>ig.news</title>
        </Head>

        <main className={styles.contentContainer}>
          <section className={styles.hero}>
            <span> 👏 Hey, welcome </span>
            <h1> News about the <span>React</span> world. </h1>
            <p> 
              Get access to all the publications <br/>
              <span> for {product.amount} mouth </span>
            </p>
            <SubscribeButton priceId={product.priceId}/>
          </section>
          
           <img src="/images/avatar.svg" alt="Girl coding"/>
        </main>

       
    </>    
  )
 }

export const getStaticProps: GetStaticProps = async () => {
  const price = await stripe.prices.retrieve('price_1J65ALEgXT3pb9fhoJoegj9Z')

  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat('en-US', {
      style:'currency',
      currency: 'USD',
    }).format(price.unit_amount / 100),
  };

  return {
    props: {
      product,
    },
    revalidate: 60 * 60 * 24, // 24 horas 
  }

}