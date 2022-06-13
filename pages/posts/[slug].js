import {createClient} from 'contentful'
import styles from "../../styles/Home.module.css"
const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
})

export const getStaticPaths = async () => {
    const res = await client.getEntries(
        {
            content_type: 'blog'
        }
    )

    const paths = res.items.map(item => {
        return {
            params: { slug: item.fields.slug }
        }
    })
    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps({ params }) {
    const { items } = await client.getEntries({
        content_type: 'blog',
        'fields.slug': params.slug
    })
    return {
        props: { blog: items[0] }
    }
}
function Postdetails({ blog }) {
    const { articleTitle, post, author } = blog.fields
   
    return (
        <div>
            <div className={styles.first_div}>
            <div className={styles.read_article}>
                <h2>{articleTitle}</h2>
                <p >
                    {post}
                    <style jsx>
                        {`
                display: flex;
                justify-content: center;
                margin:0;
            `}
                    </style>
                </p>
            </div>
            </div>

        </div>
    )
}
export default Postdetails