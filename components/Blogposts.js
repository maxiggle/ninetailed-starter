import Link from "next/link"
import { useProfile } from "@ninetailed/experience-sdk-nextjs";
const Greeting = () => {
    const [loading, profile, error] = useProfile();

    
    return <p>Hey {profile.traits.firstname}, nice weather in {profile.location.city}!</p>
  
    
}
export default function Blogpost({blog}){
    console.log();
    const {articleTitle,slug,description} = blog.fields
    return(
        <div className="card">
            <div className="content">
                <div className="info">
                    <h3>{articleTitle}</h3>
                    <h4>{description}</h4>
                   
                </div>
                <div className="details">
                    <Link href={'/posts/' + slug}><a>
                        Read article
                    </a>
                    </Link>
                </div>
            </div>
        </div>
    )
}