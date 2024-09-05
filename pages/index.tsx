import Image from "next/image";
import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "@/styles/home.module.css";
import { getCookie } from "cookies-next";
import { checkToken } from "@/services/tokenConfig";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main id={styles.main} className={`flex min-h-screen flex-col`} >
      <Head>
        <title>FindMyGame | Home</title>
      </Head>

      
    </main>
  );
}

export function getServerSideProps({ req, res }: any) {
  try {
    const token = getCookie('authorization', { req, res });

    if (!token) {
      throw new Error('Invalid Token');
    }
    else {
      checkToken(token);
    }

    return {
      props: {}
    }

  }
  catch (err) {
    return {
      redirect: {
        permanent: false,
        destination: '/user/login'
      },
      props: {}
    }
  }
}