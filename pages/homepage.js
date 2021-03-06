import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { PersonalizationProvider} from "@ninetailed/experience-sdk-react";
import { createClient } from 'contentful'
import Blogpost from '../components/Blogposts'
import { useProfile } from "@ninetailed/experience-sdk-nextjs";
// import {  } from '@ninetailed/experience-sdk-react/lib/profile';

export async function getStaticProps(){
  const client= createClient({
    space:process.env.CONTENTFUL_SPACE_ID,
    accessToken:process.env.CONTENTFUL_ACCESS_TOKEN,
  })
  const response = await client.getEntries({content_type: 'blog'})

  return {
    props:{
      blog:response.items
    }
  }
}
export const Greeting = () => {
  const [loading, profile, error] = useProfile();

  console.log(profile,error, x);

  return <p>Hey {profile?.traits.firstname}, nice weather in {profile?.location.city}! {JSON.stringify(profile)}</p>
}


export function Home({blog}) {
  console.log(blog)
  
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Greeting />
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to Raeder!!
        </h1>

        <p className={styles.description}>
          An article library where readers are recognized for always reading
        </p>
          <div className={styles.flex}>
            {blog && blog.map((blog, idx) => {
               return (
                <div className="w-45p" key={idx}> 
                  <div className={styles.card}>
                    <Blogpost key={blog.sys.id} blog={blog} ></Blogpost>
                  </div>
                </div>
              )})}
          </div>
        
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}

function App({Component, pageProps}) {
  return <PersonalizationProvider
      // analyticsPlugins={{
      //     googleAnalytics: {
      //         trackingId: process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID ?? '',
      //         actionTemplate: 'Seen Component - Audience:{{ audience.name }}',
      //         labelTemplate:
      //             '{{ baselineOrVariant }}:{{ component.__typename }} - {{ component.internalName }}'
      //     }
      // }}
      apiKey={process.env.NEXT_PUBLIC_NINETAILED_API_KEY ?? ''}>
      <Component {...pageProps} />
  </PersonalizationProvider>
}

export default App