import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'

import styles from '../styles/Home.module.css'

function Login () {
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState('')
    const router = useRouter()

    useEffect(() => {
        if (router.asPath.includes('/#access_token=')) {
            router.push('/homepage')
        }
    }, [router])

    const handleLogin = async (email) => {
        try {
            setLoading(true)
            const { error } = await supabase.auth.signIn({ email })
            if (error) throw errorquery
            alert('Check your email for the login link!')
        } catch (error) {
            alert(error.error_description || error.message)
            
        } finally {
            setLoading(false)
        }
    }
    return <div className={styles.bodycontainer}>
        <div className={styles.login}>
        <div className={styles.centerinput}>
            <div style={{ width: "100%" }}>
                <h2>Register with us</h2>
                <div>
                    <input className={styles.input} placeholder="Enter E-mail" type="email" value={email} onChange={(event) => setEmail(event.target.value)}>
                    </input>
                </div>
                <div>
                    <button className={styles.button}
                        onClick={(e) => {
                            e.preventDefault()
                            handleLogin(email)
                        }}
                        disabled={loading}
                    >
                        <span>{loading ? 'Loading' : 'Login'}</span>
                    </button>
                </div>
            </div>

        </div>
        </div>
        

    </div>

}

export default Login