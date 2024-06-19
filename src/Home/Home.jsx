import Header from "../components/header/Header.jsx";
import Main from "./Main.jsx";
import Footer from "../components/footer/Footer.jsx";



function Home() {
    return (
        <>
            <div className={"mx-4"}>
                <Header/>
                <Main/>
                <Footer/>
            </div>
        </>
    )

}

export default Home;